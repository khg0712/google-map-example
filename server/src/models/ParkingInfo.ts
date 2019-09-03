import { Document, Model, Schema, model } from 'mongoose';
import moment from 'moment';
import { Position, IParkingInfo } from '../types';

export interface ParkingInfoDocument extends Document, IParkingInfo {
  date: string;
}

export interface ParkingInfoModel extends Model<ParkingInfoDocument> {
  createParkingInfo(info: IParkingInfo): Promise<ParkingInfoDocument>;
  deleteParkingInfoById(id: string): Promise<ParkingInfoDocument>;
  getAllParkingInfo(): Promise<ParkingInfoDocument[]>;
}

// tslint:disable-next-line: variable-name
const ParkingInfoSchema = new Schema<IParkingInfo>({
  date: {
    type: String,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss')
  },
  place: String,
  address: String,
  position: {
    latitude: Number,
    longitude: Number
  }
});

ParkingInfoSchema.statics.createParkingInfo = (
  info: IParkingInfo
): Promise<ParkingInfoDocument> => new ParkingInfo(info).save();

ParkingInfoSchema.statics.deleteParkingInfoById = (
  id: string
): Promise<ParkingInfoDocument> => ParkingInfo.findByIdAndDelete(id).exec();

ParkingInfoSchema.statics.getAllParkingInfo = (): Promise<ParkingInfoDocument[]> =>
  ParkingInfo.find({}).exec();

// tslint:disable-next-line: variable-name
export const ParkingInfo: ParkingInfoModel = model<
  ParkingInfoDocument,
  ParkingInfoModel
>('parking-info', ParkingInfoSchema);

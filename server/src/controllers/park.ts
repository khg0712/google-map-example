import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ParkingInfo } from '../models/ParkingInfo';

export const createParkingInfo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    console.log(body);
    await ParkingInfo.createParkingInfo(body);
    res.status(201).end();
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const deleteParkingInfo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body;
    await ParkingInfo.deleteParkingInfoById(id);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getParkInfo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await ParkingInfo.getAllParkingInfo();
    const newResult = result.map(({ place, address, position, date, _id }) => ({
      place,
      address,
      position,
      date,
      id: _id
    }));
    res
      .status(200)
      .json(newResult)
      .end();
  } catch (e) {
    console.log(e);
    next(e);
  }
};

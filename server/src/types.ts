export interface Position {
  latitude: number;
  longitude: number;
}

export interface IParkingInfo {
  place: string;
  address: string;
  position: Position;
}

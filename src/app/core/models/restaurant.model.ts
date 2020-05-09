export interface Restaurant {
  id: number;
  address: string;
  positionLatitude: number;
  positionLongitude: number;
  isParkingPresent: boolean;
  isCardPaymentPresent: boolean;
  isWifiPresent: boolean;
  isDeleted: boolean;
  photos: number[];
}

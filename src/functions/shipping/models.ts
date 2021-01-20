export interface ISupplier {
  id: string;
  address: { country: string };
  carriers: ICarrier[];
  holidays?: Date[];
}

export interface ICarrier {
  id: string;
  name: string;
  price: number;
  countries: string[];
}

export interface IDelivery {
  name: string;
  price: number;
  deliveryDate: string;
}

export interface ICountryHolidays {
  [country: string]: Date[];
}
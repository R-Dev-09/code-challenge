import { add, format, eachDayOfInterval, closestTo } from 'date-fns';
import { COUNTRY_HOLIDAYS } from '../functions/shipping/constants';
import { IDelivery, ISupplier } from '../functions/shipping/models';

// Check if both countries are located in the BeNeLux, which means the shipment is considered national
const isNational = (country1: string, country2: string): boolean => {
  const benelux = ['nl', 'be'];
  return country1 === country2 || (benelux.includes(country1) && benelux.includes(country2));
};

// Get the earliest date possible after considering the dates to check
export const closestDate = (date: Date, datesToCheck: Date[]): Date => {
  let closestDate = date;
  const isoDates = datesToCheck.map(d => d.toISOString());
  if (isoDates.includes(date.toISOString())) {
    const lastIndex = datesToCheck.length - 1;
    const lastDate = datesToCheck[lastIndex];
    const dateRange = eachDayOfInterval({start: date, end: lastDate});
    const filtered = dateRange.filter(el => !isoDates.includes(el.toISOString()));
    closestDate = closestTo(date, filtered.map(d => new Date(d)));
  }
  return closestDate;
};

// Get a list of possible deliveries per carrier of supplier, taking holidays of order country into account
export const deliveries = (date: Date, supplier: ISupplier, orderCountry: string): IDelivery[] => {
  const national = isNational(orderCountry, supplier.address.country);
  const possibleDeliveryDate = add(date, {days: national ? 1 : 2});
  const possibleCarriers = supplier.carriers.filter(c => c.countries.includes(orderCountry));
  const deliveries = possibleCarriers.map(carrier => {
    const closestDeliveryDate = closestDate(possibleDeliveryDate, COUNTRY_HOLIDAYS[orderCountry]);
    const deliveryDate = format(closestDeliveryDate, 'yy-MM-dd');
    return {name: carrier.name, price: carrier.price, deliveryDate};
  });
  return deliveries;
};
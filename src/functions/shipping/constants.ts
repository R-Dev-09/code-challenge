import carriers from '../../sources/carriers.json';
import countries from '../../sources/countries.json';
import suppliers from '../../sources/suppliers.json';
import { ICountryHolidays, ISupplier } from './models';

// Holidays of a country as an object
export const COUNTRY_HOLIDAYS: ICountryHolidays = Object.fromEntries(
  countries.map(country => [country.id, country.holidays.map(h => new Date(h))])
);

// Array of suppliers with merged holidays and carriers properties
export const SUPPLIERS: ISupplier[] = suppliers.map(supplier => {
  const supplierCountry = countries.find(c => c.id === supplier.address.country);
  const suppHolidays = supplier.holidays || [];
  const holidays = new Set([...supplierCountry.holidays, ...suppHolidays]);
  const mappedCarriers = supplier.carriers.map(carrierId => carriers.find(c => c.id === carrierId));
  return {...supplier, carriers: mappedCarriers, holidays: [...holidays].sort().map(h => new Date(h))};
});
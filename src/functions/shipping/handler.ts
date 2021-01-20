import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { closestDate, deliveries } from '@libs/helpers';
import schema from './schema';
import { SUPPLIERS } from './constants';

const shippingDates: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const dates = event.body && event.body.dates || [];
  let orderCountry = event.pathParameters && event.pathParameters.country;
  if (!['nl', 'be', 'fr'].includes(orderCountry)) orderCountry = 'nl';
  const shipping = dates.map(d => {
    const orderDate = new Date(d);
    const suppliers = SUPPLIERS.map(supplier => {
      const orderHandlingDate = closestDate(orderDate, supplier.holidays);
      const possibleDeliveries = deliveries(orderHandlingDate, supplier, orderCountry);
      return {name: supplier.id, country: supplier.address.country, possibleDeliveries};
    });
    return {orderDate: d, suppliers};
  });
  return formatJSONResponse({orderCountry, shipping});
}

export const main = middyfy(shippingDates);

import { getRandomInteger, generateTime } from '../utils.js';
import { Price } from '../const.js';

function getPoints( type, cityId, offersId) {
  const time = generateTime();
  return {
    id: crypto.randomUUID(),
    type: type,
    basePrice: getRandomInteger(Price.MIN, Price.MAX),
    dateFrom: time.beginDate,
    dateTo: time.endDate,
    destination: cityId,
    isFavorite: !!getRandomInteger(0, 2),
    offers: offersId
  };
}

export {getPoints};

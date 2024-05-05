import { getRandomInteger, getDate, getRandomValue } from '../utils.js';
import { Price, EVENTS } from '../const.js';

function getPoints(cityId, offersId) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(Price.MIN, Price.MAX),
    dateFrom: getDate({next: false}),
    dateTo: getDate({next: true}),
    destination: cityId,
    isFavorite: getRandomInteger(0, 2),
    offers: offersId,
    type: getRandomValue(EVENTS)
  };
}

export {getPoints};

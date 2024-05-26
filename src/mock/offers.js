import { getRandomInteger, getRandomValue } from '../utils.js';
import { Price, OFFERS, EVENTS, OFFERS_COUNT } from '../const.js';

function getOffers(type) {
   return {
    type: type,
    offers: Array.from({ length: OFFERS_COUNT}, (_, index) => ({
      id: crypto.randomUUID(),
      title: OFFERS[index],
      price: getRandomInteger(Price.MIN, Price.MAX)

    }))
  };
}

export {getOffers};

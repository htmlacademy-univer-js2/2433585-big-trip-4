import { getRandomInteger, getRandomValue } from '../utils.js';
import { Price, OFFERS, EVENTS } from '../const.js';

function getOffers() {
  return {
    id: crypto.randomUUID(),
    title: getRandomValue(OFFERS),
    type: getRandomValue(EVENTS),
    price: getRandomInteger(Price.MIN, Price.MAX)
  };
}

export {getOffers};

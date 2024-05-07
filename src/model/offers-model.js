import { getOffers } from '../mock/offers.js';
import { OFFERS_COUNT } from '../const.js';
import { getRandomInteger } from '../utils.js';

export default class OffersModel{
  #offers = null;
  constructor(){
    this.#offers = Array.from({length: getRandomInteger(0, OFFERS_COUNT) }, () => getOffers());
  }

  get() {
    return this.#offers;
  }

  getById(id) {
    this.#offers.forEach((offer) => {
      if (offer.id === id) {
        return offer;
      }
    });

    return '';
  }

  getID() {
    return this.#offers.map((offer) => offer.id);
  }
}

import { getOffers } from '../mock/offers.js';
import { EVENTS } from '../const.js';

export default class OffersModel{
  #offers = [];
  constructor() {
    EVENTS.forEach((type) => { const offersType = getOffers(type);
      this.#offers.push(offersType);
    });
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }

  getID() {
    return this.#offers.map((offer) => offer.id);
  }
}

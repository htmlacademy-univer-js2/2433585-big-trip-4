import { getOffers } from '../mock/offers.js';
import { EVENTS } from '../const.js';
import Observable from '../framework/observable';

export default class OffersModel extends Observable {
  #offers = [];
  constructor() {
    super();
    EVENTS.forEach((type) => { const offersType = getOffers(type);
      this.#offers.push(offersType);
    });
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }

  getID() {
    return this.#offers.map((offer) => offer.id);
  }
}

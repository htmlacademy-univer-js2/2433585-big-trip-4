import { getPoints } from '../mock/point.js';
import { POINTS_COUNT, EVENTS } from '../const.js';
import { getRandomValue } from '../utils.js';
import { sortByDay } from '../utils.js';

export default class PointModel {
  points = [];
  #offerModel = null;
  #cityModel = null;
  constructor(offerM, cityM) {
    this.#offerModel = offerM;
    this.#cityModel = cityM;

    this.points = Array.from({ length: POINTS_COUNT }, () => {
      const type = getRandomValue(EVENTS);
      const cities = this.#cityModel.get();
      const destinationId = getRandomValue(cities).id;
      const offers = this.#offerModel.getByType(type);
      const offersId = [];
      offers.forEach((offer) => {
        if (getRandomValue(0, 2)) {
          offersId.push(offer.id);
        }
      });
      const point = getPoints(type, destinationId, offersId);
      return point;
    });
  }

  get() {
    return this.points.sort(sortByDay);
  }
}


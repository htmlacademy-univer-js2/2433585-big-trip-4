import { getPoints } from '../mock/point.js';
import { POINTS_COUNT, EVENTS } from '../const.js';
import { getRandomValue } from '../utils/common-utils.js';
import { sortByDay, updateItem } from '../utils/point-utils.js';
import Observable from '../framework/observable';

export default class PointModel extends Observable {
  #points = [];
  #offerModel = null;
  #cityModel = null;

  constructor(offerModel, cityModel) {
    super();
    this.#offerModel = offerModel;
    this.#cityModel = cityModel;

    this.#points = Array.from({ length: POINTS_COUNT }, () => {
      const type = getRandomValue(EVENTS);
      const cities = this.#cityModel.get();
      const destinationId = getRandomValue(cities).id;
      const offers = this.#offerModel.getOffersByType(type);
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

  get points() {
    return this.#points.sort(sortByDay);
  }

  updatePoint(updateType, update) {
    this.#points = updateItem(this.#points, update);
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points.push(update);
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this.#points = this.#points.filter((point) => point.id !== update.id);
    this._notify(updateType);
  }
}


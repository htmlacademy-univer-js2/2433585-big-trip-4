import { getPoints } from '../mock/point.js';
import CitiesModel from './cities-model.js';
import { POINTS_COUNT } from '../const.js';
import OffersModel from './offers-model.js';
import { getRandomValue } from '../utils.js';

export default class PointModel {
  cityModel = new CitiesModel();
  cities = this.cityModel.get();
  city = getRandomValue(this.cities);
  points = Array.from({ length: POINTS_COUNT }, () => {

    const offerModel = new OffersModel();
    const offersId = offerModel.getID();

    const cityId = this.city.id;
    const point = getPoints(cityId, offersId);
    point.destination = this.cityModel.getById(cityId);
    point.offers = offerModel.get();
    point.description = this.city.description;
    return point;
  });

  get() {
    return this.points;
  }
}


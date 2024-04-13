import { getCity } from '../mock/cities.js';
import { CITIES_COUNT } from '../const.js';

export default class CitiesModel {
  #city = null;
  constructor() {
    this.#city = Array.from({ length: CITIES_COUNT }, () => getCity());
  }

  get() {
    return this.#city;
  }

  getById(id) {
    this.#city.forEach((cit) => {
      if (cit.id === id) {
        return cit;
      }
    });

    return '';
  }

  getCityID() {
    return this.#city.map((cit) => cit.id);
  }

  getDescription(id) {
    this.#city.forEach((cit) => {
      if (cit.id === id) {
        return cit.description;
      }
    });
  }
}

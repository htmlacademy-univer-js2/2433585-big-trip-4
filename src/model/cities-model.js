import { getCity } from '../mock/cities.js';
import { CITIES_COUNT } from '../const.js';

export default class CitiesModel {
  #city = null;
  constructor() {
    this.#city = Array.from({ length: CITIES_COUNT }, (_, i) => getCity(i));
  }

  get() {
    return this.#city;
  }

  getById(id) {
    return this.#city.find((cit) => cit.id === id);
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

export default class CitiesModel {
  #cities = [];
  #pointApiService = null;

  constructor(pointApiService) {
    this.#pointApiService = pointApiService;
  }

  async init() {
    this.#cities = await this.#pointApiService.destinations;
    return this.#cities;
  }

  get cities() {
    return this.#cities;
  }

  getById(id) {
    return this.#cities.find((cit) => cit.id === id);
  }

  getCityID() {
    return this.#cities.map((cit) => cit.id);
  }

  getDescription(id) {
    this.#cities.forEach((cit) => {
      if (cit.id === id) {
        return cit.description;
      }
    });
  }
}

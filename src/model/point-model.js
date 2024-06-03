import { UpdateType } from '../const.js';
import { sortByDay, updateItem } from '../utils/point-utils.js';
import Observable from '../framework/observable';
import { adaptToClient } from '../utils/adapt-utils.js';

export default class PointModel extends Observable {
  #points = [];
  #pointApiService = null;

  constructor(pointApiService) {
    super();
    this.#pointApiService = pointApiService;
    this.#points = [];
  }

  async init() {
    try {
      const points = await this.#pointApiService.points;
      this.#points = points.map(adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points.sort(sortByDay);
  }

  async updatePoint(updateType, update) {
    try {
      const response = await this.#pointApiService.updatePoint(update);
      const updatePoint = adaptToClient(response);
      this.#points = updateItem(this.#points, updatePoint);
      this._notify(updateType, updatePoint);
    } catch (err) {
      throw new Error('Can\'t update task');
    }
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


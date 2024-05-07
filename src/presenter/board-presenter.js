import { render, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointPresenter from './point-presenter.js';
import { Sort } from '../const.js';
import { RenderPosition } from '../framework/render.js';
import EventEmptyListTemplate from '../view/event-list-empty.js';
import { updateItem } from '../utils.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventListComponent = new EventListView();
  #sortComponent = null;
  #currentSortType = null;
  #pointModel = null;
  #points = [];
  #pointPresenters = new Map();

  constructor ({boardContainer, pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#points = [...this.#pointModel.get()];
  }

  init() {
    this.#renderBoard();
  }

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #pointChangeHandler = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointContainer: this.#eventListComponent.element,
      onDataChange: this.#pointChangeHandler,
      onModeChange: this.#modeChangeHandler
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderNoPointView() {
    render(new EventEmptyListTemplate(),this.#boardContainer);
  }

  #renderPoints() {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#points = Sort[this.#currentSortType](this.#points);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#renderSort();
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderSort() {
    if (this.#sortComponent !== null) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPointList() {
    render(this.#eventListComponent, this.#boardContainer);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderBoard() {
    this.#renderPoints();

    if (this.#points.length === 0) {
      this.#renderNoPointView();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}

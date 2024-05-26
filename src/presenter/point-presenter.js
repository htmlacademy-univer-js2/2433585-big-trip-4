import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import { render, replace, remove } from '../framework/render.js';
import { Mode } from '../const.js';

export default class PointPresenter {
  #pointContainer = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #citiesModel = null;
  #offersModel = null;
  #mode = Mode.DEFAULT;

  constructor({pointContainer, citiesModel, offersModel, onDataChange, onModeChange }) {
    this.#pointContainer = pointContainer;
    this.#citiesModel = citiesModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point){
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView ({
      point: this.#point,
      pointDestination: this.#citiesModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onClick: this.#editClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });
    this.#pointEditComponent = new PointEditView ({
      point: this.#point,
      pointDestinations: this.#citiesModel.get(),
      pointOffers: this.#offersModel.get(),
      onFormSubmit: this.#formSubmitHandler,
      onRollUpClick: this.#handleOnRollUpClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #editClickHandler = () => {
    this.#replacePointToForm();
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #formSubmitHandler = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };

  #handleOnRollUpClick = () => {
    this.#replaceFormToPoint();
  };
}

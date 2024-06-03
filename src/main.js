import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { RenderPosition, render } from './framework/render.js';
import PointModel from './model/point-model.js';
import OffersModel from './model/offers-model.js';
import CitiesModel from './model/cities-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const mainElement = bodyElement.querySelector('.page-main');
const tripEvents = mainElement.querySelector('.trip-events');
const offersModel = new OffersModel();
const citiesModel = new CitiesModel();
const filterModel = new FilterModel();
const pointModel = new PointModel(offersModel, citiesModel);
const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  pointModel, offersModel,
  citiesModel, filterModel,
  onNewPointDestroy: handleNewPointFormClose });

const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  filterModel,
  pointModel
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, tripMainElement, RenderPosition.BEFOREEND);

filterPresenter.init();
boardPresenter.init();

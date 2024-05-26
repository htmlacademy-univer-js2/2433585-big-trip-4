import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { RenderPosition, render } from './framework/render.js';
import PointModel from './model/point-model.js';
import { generateFilters } from './mock/filters.js';
import OffersModel from './model/offers-model.js';
import CitiesModel from './model/cities-model.js';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const mainElement = bodyElement.querySelector('.page-main');
const tripEvents = mainElement.querySelector('.trip-events');
const offersModel = new OffersModel();
const citiesModel = new CitiesModel();
const pointModel = new PointModel(offersModel, citiesModel);
const boardPresenter = new BoardPresenter({boardContainer: tripEvents, pointModel, offersModel, citiesModel});
const filters = generateFilters(pointModel.get());

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView({ filters: filters }), filterElement);

boardPresenter.init();

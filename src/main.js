import TripInfoView from "./view/trip-info-view.js";
import FilterView from "./view/filter-view.js";
import BoardPresenter from "./presenter/board-presenter.js";
import { RenderPosition, render } from "./render.js";

const bodyElement = document.querySelector('body')
const headerElement = bodyElement.querySelector('.page-header')
const tripMainElement = headerElement.querySelector('.trip-main');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const mainElement = bodyElement.querySelector('.page-main')
const tripEvents = mainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({boardContainer: tripEvents});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

boardPresenter.init();

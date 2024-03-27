import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { POINTS_COUNT } from '../const.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor ({boardContainer, pointModel}) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
    this.points = [...this.pointModel.get()];
  }

  init() {
    render(this.eventListComponent, this.boardContainer);
    render(new SortView(), this.boardContainer);
    for(let i = 0; i < POINTS_COUNT; i++) {
      render(new PointView({ data: this.points[i] }), this.eventListComponent.getElement());
    }
    render(new PointEditView({ point: this.points[0] }), this.eventListComponent.getElement());
  }
}

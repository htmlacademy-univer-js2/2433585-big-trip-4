import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
const POINT_COUNT = 3;


export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor ({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.sortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new PointEditView(), this.eventListComponent.getElement());
    for(let i = 0; i < POINT_COUNT; i++) {
      render(new PointView(), this.eventListComponent.getElement());
    }
  }
}

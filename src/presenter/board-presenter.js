import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { POINTS_COUNT } from '../const.js';

export default class BoardPresenter {
  #eventListComponent = new EventListView();
  #pointModel = null;
  #boardContainer = null;
  #points = null;

  constructor ({boardContainer, pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.get()];
    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);


    for(let i = 0; i < POINTS_COUNT; i++) {
      this.#renderPoint({ point: this.#points[i] });
    }
  }

  #renderPoint({ point }) {
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replace(pointViewComponent, pointEditViewComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const pointViewComponent = new PointView({
      point,
      onClick: () => {
        replace(pointEditViewComponent, pointViewComponent);
        document.addEventListener('keydown', onEscKeyDown);
      }
    });

    const pointEditViewComponent = new PointEditView({
      point,
      onFormSubmit: () => {
        replace(pointViewComponent, pointEditViewComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    });


    render(pointViewComponent, this.#eventListComponent.element);
  }
}

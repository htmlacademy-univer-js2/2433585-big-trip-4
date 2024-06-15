import { NoPointsTextType } from '../const';
import AbstractView from '../framework/view/abstract-view';


function createNoPointViewTemplate(isLoading, filterType) {
  const noPointTextValue = isLoading ? '' : NoPointsTextType[filterType];

  return `<p class="trip-events__msg">${noPointTextValue}</p>`;
}

export default class EventEmptyListView extends AbstractView {
  #isLoading = false;
  #currentFilterType = null;

  constructor(isLoading, filterType) {
    super();
    this.#isLoading = isLoading;
    this.#currentFilterType = filterType;
  }

  get template() {
    return createNoPointViewTemplate(this.#isLoading, this.#currentFilterType);
  }
}

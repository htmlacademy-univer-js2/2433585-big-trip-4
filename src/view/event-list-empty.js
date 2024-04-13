import AbstractView from '../framework/view/abstract-view.js';

function createEventEmptyListTemplate() {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
}

export default class EventEmptyListTemplate extends AbstractView {
  get template() {
    return createEventEmptyListTemplate();
  }
}

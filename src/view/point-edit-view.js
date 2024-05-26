import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EVENTS, CITIES, OFFERS, IMAGES, Price } from '../const.js';
import { getRandomInteger, getFullDate } from '../utils.js';

function createImg(destinationImages) {
  return destinationImages.map((img) => `<img class="event__photo" src="${img}.jpg" alt="Event photo">`).join('');
}

function createPointEditTemplate(point, citiesPoint, offersPoint) {
  const { type, offers, dateFrom, dateTo, basePrice } = point;
  const currentOffers = offersPoint.find((offer) => offer.type === type);
  const currentCity = citiesPoint.find((city) => city.id === point.destination);
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${EVENTS.map((typeEvent) => `<div class="event__type-item">
                  <input id="event-type-${typeEvent.toLowerCase()}-1" class="event__${typeEvent.toLowerCase()}-input  visually-hidden" type="radio" name="event-type" value="${typeEvent.toLowerCase()}">
                  <label class="event__type-label  event__type-label--${typeEvent.toLowerCase()}" for="event-type-${typeEvent.toLowerCase()}-1">${typeEvent}</label>
                </div>`).join('')};
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentCity.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${CITIES.map((town) => `<option value="${town}"></option>)`).join('')};
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFullDate(point.dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFullDate(point.dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${currentOffers.offers.map((offer) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${offer.title}" ${offers.includes(offer.id) ? 'checked' : ''}>
            <label class="event__offer-label" for="${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`).join('')}
          </div>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${currentCity.description}</p>

          <div class="event__photos-container">
              <div class="event__photos-tape">
              ${createImg(currentCity.pictures)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class PointEditView extends AbstractStatefulView {
  #cities = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleRollUpClick = null;


  constructor({ point, pointDestinations, pointOffers, onFormSubmit, onRollUpClick }) {
    super();
    this._state = PointEditView.parsePointToState(point);
    this.#offers = pointOffers;
    this.#cities = pointDestinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollUpClick = onRollUpClick;

    this._setState(PointEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#cities, this.#offers);
  }

  reset(point) {
    this.updateElement(PointEditView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element.querySelector('.event__input--time')
      .addEventListener('change', this.#timeChangeHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);

    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollUpButtonClick);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #rollUpButtonClick = () => {
    this.#handleRollUpClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#cities.find((city) => city.name === evt.target.value)
    const selectedDestinationID = (selectedDestination)
    ? selectedDestination.id
    : null;

    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestinationID
      }
    });

    // evt.preventDefault();
    // const selectedDestinatio = this.#cities.find((destination) => destination.name === evt.target.value);
    // this.updateElement({
    //   destination: selectedDestination ? selectedDestination.id : null,
    // });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      ...this._state,
      basePrice: evt.target.value,
    });
  };

  #timeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.name === 'event-start-time') {
      this.updateElement({
        dateFrom: dayjs(evt.target.value).toDate(),
      });
    } else {
      this.updateElement({
        dateTo: dayjs(evt.target.value).toDate(),
      });
    }
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      ...this._state,
      offers: checkedOffers.map((element) => element.id),
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}

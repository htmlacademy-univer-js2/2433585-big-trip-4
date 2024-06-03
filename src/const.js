import dayjs from 'dayjs';
import { getRandomInteger } from './utils/common-utils';
import { futurePoint, presentPoint, pastPoint, sortByDay, sortByPrice, sortByTime } from './utils/point-utils';

const DEFAULT_TYPE = 'taxi';
const IMG = 'https://loremflickr.com/248/152?random=';
const IMAGES = [];

const CITIES = [
  'Moscow',
  'Paris',
  'Texas',
  'Prague',
  'Budapest',
  'Vienna',
  'Morocco',
  'Kamchatka'
];

const DISABLED_SORTS = [
  'event',
  'offers'
];

const EMPTY_POINT = {
  type: DEFAULT_TYPE,
  basePrice: 0,
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destination: null,
  isFavorite: false,
  offers: []
};

const EVENTS = [
  'Bus',
  'Drive',
  'Flight',
  'Ship',
  'Taxi',
  'Train',
  'Check-in',
  'Restaurant',
  'Sightseeing'
];

const OFFERS = [
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city',
  'Upgrade to a business class'
];

const IMAGES_COUNT = {
  MIN: 1,
  MAX: 4
};

for (let i = 0; i < IMAGES_COUNT.MAX; i++) {
  IMAGES.push(`${IMG}${getRandomInteger(IMAGES_COUNT.MIN, IMAGES_COUNT.MAX)}`);
}

const Price = {
  MIN: 10,
  MAX: 2000
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const filters = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => futurePoint(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => presentPoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => pastPoint(point)),
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const ButtonText = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  SAVE: 'Save'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const NoPointsTextType = {
  NOPOINTS: 'Click New Event to create your first point',
  LOADING: 'Loading...',
};

const Sort = {
  [SortType.DAY]: (points) => [...points].sort(sortByDay),
  [SortType.TIME]: (points) => [...points].sort(sortByTime),
  [SortType.PRICE]: (points) => [...points].sort(sortByPrice),
  [SortType.EVENT]: () => {
    throw new Error(`Sort by ${SortType.EVENT} is not inplemented`);
  },
  [SortType.OFFERS]: () => {
    throw new Error(`Sort by ${SortType.OFFERS} is not inplemented`);
  }
};

export {CITIES, EVENTS, OFFERS, IMAGES, Price, IMG, IMAGES_COUNT,
  FilterType, filters, Mode, SortType, Sort, EMPTY_POINT,
  UserAction, NoPointsTextType, UpdateType, ButtonText, DISABLED_SORTS, Method };

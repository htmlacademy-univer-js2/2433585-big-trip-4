import dayjs from 'dayjs';
import { getRandomInteger } from './utils/common-utils';
import { futurePoint, presentPoint, pastPoint, sortByDay, sortByPrice, sortByTime } from './utils/point-utils';

const POINTS_COUNT = getRandomInteger(1, 8);
const CITIES_COUNT = 8;
const DEFAULT_TYPE = 'Taxi';

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
const OFFERS_COUNT = 8;

const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const IMG = 'https://loremflickr.com/248/152?random=';
const IMAGES = [];
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
};

const ButtonText = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  SAVE: 'Save'
};

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
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

export {CITIES, EVENTS, OFFERS, DESCRIPTION, IMAGES, Price, POINTS_COUNT,
  CITIES_COUNT, OFFERS_COUNT, IMG, IMAGES_COUNT, FilterType, filters, Mode, SortType, Sort, EMPTY_POINT,
  UserAction, NoTasksTextType, UpdateType, ButtonText, DISABLED_SORTS };

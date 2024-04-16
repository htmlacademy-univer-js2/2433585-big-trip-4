
import { getRandomInteger, pastPoint, futurePoint, presentPoint } from './utils.js';

const POINTS_COUNT = getRandomInteger(0, 8);

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

const CITIES_COUNT = 8;

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
  [FilterType.EVERYTHING]: (points) => [points],
  [FilterType.FUTURE]: (points) => points.filter((point) => futurePoint(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => presentPoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => pastPoint(point)),
};


export {CITIES, EVENTS, OFFERS, DESCRIPTION, IMAGES, Price, POINTS_COUNT, CITIES_COUNT, OFFERS_COUNT, IMG, IMAGES_COUNT, FilterType, filters };

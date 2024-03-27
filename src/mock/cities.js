import { getRandomValue, getRandomInteger } from '../utils.js';
import { CITIES, DESCRIPTION, IMAGES_COUNT, IMG } from '../const.js';

function getCity() {
  return {
    id: crypto.randomUUID(),
    name: getRandomValue(CITIES),
    description: getRandomValue(DESCRIPTION.split('.')).repeat(getRandomInteger(1, 5)),
    pictures: `${IMG}${getRandomInteger(IMAGES_COUNT.MIN, IMAGES_COUNT.MAX)}`
  };
}

export { getCity };

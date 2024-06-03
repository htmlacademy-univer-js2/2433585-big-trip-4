import { getRandomInteger, getRandomValue } from '../utils/common-utils.js';
import { CITIES, DESCRIPTION, IMAGES_COUNT, IMG } from '../const.js';

function getCity() {
  return {
    id: crypto.randomUUID(),
    name: getRandomValue(CITIES),
    description: getRandomValue(DESCRIPTION.split('.')).repeat(getRandomInteger(1, 5)),
    pictures: Array.from({ length: getRandomInteger(IMAGES_COUNT.MIN, IMAGES_COUNT.MAX) }, () => `${IMG}${getRandomInteger(0, 100)}`)

  };

}
export { getCity };

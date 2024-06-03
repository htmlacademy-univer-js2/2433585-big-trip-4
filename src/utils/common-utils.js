const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function getRandomValue(array){
  return array[getRandomInteger(0, array.length - 1)];
}

export {
  getRandomInteger, getRandomValue, isEscapeKey
};

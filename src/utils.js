import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration);

const Duration = {
  days: 7,
  hours: 12,
  minutes: 59,
};

const date = dayjs().add(getRandomInteger(0, Duration.days), 'day').toDate();

function getDate(next) {
  const randomDay = getRandomInteger(0, Duration.days);
  const randomHour = getRandomInteger(1, Duration.hours);
  const randomMin = getRandomInteger(0, Duration.minutes);

  if (next) {
    return dayjs(date)
    .add(randomDay, 'day')
    .add(randomHour, 'hour')
    .add(randomMin, 'minute')
    .toDate();
  }

  return date;
}

function getTime(date) {
  return dayjs(date).format('hh:mm');
}

function getMonthAndDate(date) {
  return dayjs(date).format('MMM DD');
}

function getFullDate(date) {
  return dayjs(date).format('DD/MM/YY hh:mm');
}

function getDateDifference(from, to) {
  const difference = dayjs(to).diff(dayjs(from));
  let pointDur = 0;

  switch (true) {
    case (difference >= 24 * 60 * 60 * 1000):
      pointDur = dayjs.duration(difference).format('DD[D] HH[H] mm[M]');
      break;
    case (difference >= 60 * 60 * 1000):
      pointDur = dayjs.duration(difference).format('HH[H] mm[M]');
      break;
    case (difference < 60 * 60 * 1000):
      pointDur = dayjs.duration(difference).format('mm[M]');
      break;
  }
  return pointDur;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * max) + min;
}


function getRandomValue(array){
  return array[getRandomInteger(0, array.length - 1)];
}

export {getRandomInteger, getRandomValue, getDate, getTime, getMonthAndDate, getDateDifference, getFullDate}

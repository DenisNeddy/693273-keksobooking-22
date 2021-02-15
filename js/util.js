const getRandomNumber = function (min, max) {
  if (max < min) {
    return 'Error';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const getRandomFloatNumber = function (min, max, count) {
  if (max < min) {
    return 'Error';
  }

  return parseFloat(Math.random() * (max - min + 1) + min).toFixed(count);

};

export {getRandomNumber, getRandomFloatNumber};

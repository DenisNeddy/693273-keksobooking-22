
const getRandomNumber = function (min, max) {
  if (max < min) {
    return 'Error';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

getRandomNumber(1,10);

const getRandomFloatNumber = function (min, max, count) {
  if (max < min) {
    return 'Error';
  }

  return parseFloat(Math.random() * (max - min + 1) + min).toFixed(count);

};

getRandomFloatNumber(1, 8, 3);

const getLocation = function () {
  const location = {
    x: getRandomFloatNumber(35.65, 35.7, 5),
    y: getRandomFloatNumber(139.7, 139.8, 5),
  }

  return location;
}

const generateAuthor = function () {
  return {
    avatar: `img/avatars/user0${getRandomNumber(1,8)}.png`,
  };

};

const generateTitle = function () {
  const title = [
    'Заголовок номер 1',
    'Заголовок номер 2',
    'Заголовок номер 3',
    'Заголовок номер 4',
    'Заголовок номер 5',
    'Заголовок номер 6',
    'Заголовок номер 7',
    'Заголовок номер 8',
  ]
  return title[getRandomNumber(0, 7)];
}

const generatePrice = function () {
  return getRandomNumber(1,10000);
}

const generateType = function () {
  const type = ['palace', 'flat', 'house', 'bungalow'];
  return type[getRandomNumber(0, 3)];
}

const generateRooms = function () {
  return getRandomNumber(1,5);
}

const generateGuests = function () {
  return getRandomNumber(1,4);
}

const generateCheckin = function () {
  const checkin = ['12:00', '13:00', '14:00'];
  return checkin[getRandomNumber(0, 2)];
}

const generateCheckout = function () {
  const checkout = ['12:00', '13:00', '14:00'];
  return checkout[getRandomNumber(0, 2)];
}

const getGenerateFeatures = function () {
  const features = [];
  const values = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const length = getRandomNumber(0, 5);

  while (features.length <= length) {
    const value = values[getRandomNumber(0,5)];
    if (!features.includes(value)) {
      features.push(value);
    }
  }
  return features;
}



const generateDescription = function () {
  const description = [
    'Описание комнаты 1',
    'Описание комнаты 2',
    'Описание комнаты 3',
    'Описание комнаты 4',
    'Описание комнаты 5',
    'Описание комнаты 6',
    'Описание комнаты 7',
    'Описание комнаты 8',
  ]
  return description[getRandomNumber(0, 7)];
}

const generatePhotos = function () {
  const photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg.',
  ]
  return photos[getRandomNumber(0, 2)];
}

const location1 = getLocation();

const generateOffer = function () {
  return {
    title: generateTitle(),
    address: `${location1.x}, ${location1.y}`,
    price: generatePrice(),
    type: generateType(),
    rooms: generateRooms(),
    guests: generateGuests(),
    checkin: generateCheckin(),
    checkout: generateCheckout(),
    features: getGenerateFeatures(),
    description: generateDescription(),
    photos: generatePhotos(),
  }
};

const generateObjects = function () {
  const objects = [];
  for (let i = 0; i < 10; i++) {
    objects.push({
      author: generateAuthor(),
      offer: generateOffer(),
      location1,
    });
  }
  return objects;
}

generateObjects();

import {getRandomNumber, getRandomFloatNumber} from './util.js';

const TITLE = [
  'Заголовок номер 1',
  'Заголовок номер 2',
  'Заголовок номер 3',
  'Заголовок номер 4',
  'Заголовок номер 5',
  'Заголовок номер 6',
  'Заголовок номер 7',
  'Заголовок номер 8',
]

const LENGTH = 10;

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECK_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const DESCRIPTION = [
  'Описание комнаты 1',
  'Описание комнаты 2',
  'Описание комнаты 3',
  'Описание комнаты 4',
  'Описание комнаты 5',
  'Описание комнаты 6',
  'Описание комнаты 7',
  'Описание комнаты 8',
]

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg.',
]

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

const generateRandomArrayItem = function (array, min, max) {
  return array[getRandomNumber(min, max)];
}

const generatePrice = function () {
  return getRandomNumber(1,10000);
}

const generateRooms = function () {
  return getRandomNumber(1,5);
}

const generateGuests = function () {
  return getRandomNumber(1,4);
}

const generatePhotos =  function () {
  const length = getRandomNumber(2,7);
  const photos = [];
  for (let i = 0; i < length; i++) {
    photos.push(generateRandomArrayItem(PHOTOS, 0, 2));
  }
  return photos;
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



const generateOffer = function () {
  return {
    title: generateRandomArrayItem(TITLE, 0, 7),
    price: generatePrice(),
    type: generateRandomArrayItem(TYPE, 0, 3),
    rooms: generateRooms(),
    guests: generateGuests(),
    checkin: generateRandomArrayItem(CHECK_TIME, 0, 2),
    checkout: generateRandomArrayItem(CHECK_TIME, 0, 2),
    features: getGenerateFeatures(),
    description: generateRandomArrayItem(DESCRIPTION, 0, 7),
    photos: generatePhotos(),
  }
};


const generateObjects = function () {
  const objects = [];

  for (let i = 0; i < LENGTH; i++) {
    const locationPoint = getLocation();
    objects.push({
      author: generateAuthor(),
      offer: generateOffer(),
      locationPoint,
    });
    objects[i].offer.address = `${locationPoint.x}, ${locationPoint.y}`;
  }
  return objects;
}

export default generateObjects;

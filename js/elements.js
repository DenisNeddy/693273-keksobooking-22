import {generateObjects} from './data.js';

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const objects = generateObjects();

const newArray = [];
const types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

objects.forEach((item) => {
  const newPopup = popupTemplate.cloneNode(true);
  newPopup.querySelector('.popup__title').textContent = item.offer.title;
  newPopup.querySelector('.popup__text--address').textContent = item.offer.address;
  newPopup.querySelector('.popup__text--price').textContent = `${item.offer.price}/ночь`;
  newPopup.querySelector('.popup__type').textContent = types[item.offer.type];
  newPopup.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  newPopup.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin}, выезд до  ${item.offer.checkout}`;
  const features = newPopup.querySelector('.features').children;
  for (let i = 0; i < features.length; i++) {
    if (!item.offer.features.some(feature => features[i].includes(feature))) {
      features[i].remove();
    }
  }

});

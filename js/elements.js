import generateObjects from './data.js';


const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const objects = generateObjects();


const types = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};
const renderCard  = (ad) => {
  const newPopup = popupTemplate.cloneNode(true);
  const title = newPopup.querySelector('.popup__title');
  const address = newPopup.querySelector('.popup__text--address');
  const price  = newPopup.querySelector('.popup__text--price');
  const type = newPopup.querySelector('.popup__type');
  const capacity = newPopup.querySelector('.popup__text--capacity');
  const time = newPopup.querySelector('.popup__text--time');
  ad.offer.title ? (title.textContent = ad.offer.title): (title.remove());

  ad.offer.address ? (address.textContent = ad.offer.address) : (address.remove());

  ad.offer.price ? (price.textContent = `${ad.offer.price}/ночь`): (price.remove());

  ad.offer.type ? (type.textContent = types[ad.offer.type]) : (type.remove());

  ad.offer.rooms ? (capacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`) : (capacity.remove());

  ad.offer.checkin ? (time.textContent = `Заезд после ${ad.offer.checkin}, выезд до  ${ad.offer.checkout}`) : (time.remove());
  const features = newPopup.querySelector('.popup__features').children;
  for (let i = 0; i < features.length; i++) {
    if (!ad.offer.features.some(feature => features[i].classList[1].includes(feature))) {
      features[i].remove();
    }
  }
  const description = newPopup.querySelector('.popup__description');
  description.textContent = ad.offer.description;

  const popupPhotos = newPopup.querySelector('.popup__photos');
  let photosArray = ad.offer.photos;
  for (let i = 0; i < photosArray.length; i++) {
    let photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.src = photosArray[i];
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    popupPhotos.appendChild(photoElement);
  }
  const avatarUser = newPopup.querySelector('.popup__avatar');
  ad.author.avatar ? (avatarUser.src = ad.author.avatar) : (avatarUser.remove());

  return newPopup;
}
//отрисовка карточек

const openCard = (ad) => {
  renderCard(ad);
}

const canvas = document.querySelector('#map-canvas');

canvas.appendChild(renderCard(objects[0]));

export default openCard;




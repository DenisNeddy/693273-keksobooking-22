/* global _:readonly */
import api from './api.js';
import renderCard from './elements.js';
let map;

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const formFilterMap = document.querySelector('.map__filters');
const mapFeatures = document.querySelectorAll('input[name=features]');

const disablePage = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');


  const adFieldsets = adForm.querySelectorAll('fieldset');
  for (let i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].disabled = true;
  }

  formFilterMap.classList.add('ad-form--disabled');

  const formFilters = formFilterMap.querySelectorAll('.map__filter');
  for (let i = 0; i < formFilters.length; i++) {
    formFilters[i].disabled = true;
  }
  const mapFeatures = formFilterMap.querySelector('.map__features');
  mapFeatures.disabled = true;

};

const addressField = document.querySelector('#address');
addressField.style.pointerEvents = 'none';

const enablePage = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');

  const adFieldsets = adForm.querySelectorAll('fieldset');
  for (let i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].disabled = false;
  }

  formFilterMap.classList.remove('ad-form--disabled');

  const formFilters = formFilterMap.querySelectorAll('.map__filter');
  for (let i = 0; i < formFilters.length; i++) {
    formFilters[i].disabled = false;
  }

  const mapFeatures = formFilterMap.querySelector('.map__features');
  mapFeatures.disabled = false;
}
disablePage();
const markers = [];
const initMap = () => {
  // eslint-disable-next-line no-undef
  map = L.map('map-canvas')
    .on('load', enablePage)
    .setView({
      lat: 35.6895000,
      lng: 139.6917100,
    }, 10);

  // eslint-disable-next-line no-undef
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  // eslint-disable-next-line no-undef
  const markerIcon = L.icon({
    iconUrl: 'leaflet/images/marker-icon.png',
  });
  // eslint-disable-next-line no-undef
  const marker = L.marker(
    {
      lat: 35.6895000,
      lng: 139.6917100,
    }, {
      icon: markerIcon,
      draggable: true,
    },
  );
  addressField.value = '35.68950, 139.69171';
  marker.addTo(map);

  const filterData = (item) => {
    let matched = true;
    const priceMap = {
      middle: [10000, 50000],
      low: [0, 10000],
      high: [50000, Infinity],
    }
    const features = document.querySelectorAll('input[name=features]');
    matched = matched && (housingType.value === 'any' || item.offer.type === housingType.value);
    matched = matched && (housingPrice.value === 'any' || (item.offer.price >= priceMap[housingPrice.value][0] && item.offer.price <= priceMap[housingPrice.value][1]));
    matched = matched && (housingRooms.value === 'any' || item.offer.rooms === +housingRooms.value);
    matched = matched && (housingGuests.value === 'any' || item.offer.guests === +housingGuests.value);
    for (let i = 0; i < features.length; i++) {
      matched = matched &&  (!features[i].checked || item.offer.features.includes(features[i].value));
    }
    return matched;
  };
  const renderData = (data) => {
    markers.forEach((marker) => map.removeLayer(marker));
    data.filter(filterData).slice(0, 10).forEach((item) => {
      // eslint-disable-next-line no-undef
      const markerIcon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      // eslint-disable-next-line no-undef
      const marker = L.marker(
        {
          lat: item.location.lat,
          lng: item.location.lng,
        }, {
          icon: markerIcon,
        },
      );
      marker.addTo(map).bindPopup(
        renderCard(item),
        {
          keepInView: true,
        },
      );
      markers.push(marker);
    });
  };

  api.getData().then((data) => {
    renderData(data);
    formFilterMap.addEventListener('change', _.debounce(() => renderData(data), 500));

    const clearForm = () => {
      housingType.value = 'any';
      housingPrice.value = 'any';
      housingRooms.value = 'any';
      housingGuests.value = 'any';

      for (let i = 0; i < mapFeatures.length; i++) {
        mapFeatures[i].checked = false;
      }
      _.debounce(() => renderData(data), 500)();
      // eslint-disable-next-line no-undef
      marker.setLatLng(L.latLng(35.68950, 139.69171));
      addressField.value = '35.68950, 139.69171';
    }

    const resetButton = document.querySelector('.ad-form__reset');
    resetButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      clearForm();
    });
  }).catch(() => {
    const errorDataTemplate = document.querySelector('#error__data').content;
    const errorDataBadge = errorDataTemplate.cloneNode(true);
    document.body.appendChild(errorDataBadge);
  });

  marker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    addressField.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
  });
};



initMap();







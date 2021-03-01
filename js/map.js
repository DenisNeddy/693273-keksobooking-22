import generateObjects from './data.js';
import renderCard from './elements.js';
let map;

const disablePage = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');

  const adFieldsets = adForm.querySelectorAll('fieldset');
  for (let i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].disabled = true;
  }
  const formFilterMap = document.querySelector('.map__filters');
  formFilterMap.classList.add('ad-form--disabled');

  const formFilters = formFilterMap.querySelectorAll('.map-filter');
  for (let i = 0; i < formFilters.length; i++) {
    formFilters[i].disabled = true;
  }
};

const addressField = document.querySelector('#address');
addressField.disabled = true;

const objects = generateObjects();

const enablePage = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');

  const adFieldsets = adForm.querySelectorAll('fieldset');
  for (let i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].disabled = false;
  }
  const formFilterMap = document.querySelector('.map__filters');
  formFilterMap.classList.remove('ad-form--disabled');

  const formFilters = formFilterMap.querySelectorAll('.map-filter');
  for (let i = 0; i < formFilters.length; i++) {
    formFilters[i].disabled = false;
  }
}
disablePage();

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
  objects.forEach((item) => {
    // eslint-disable-next-line no-undef
    const markerIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
    // eslint-disable-next-line no-undef
    const marker = L.marker(
      {
        lat: item.locationPoint.x,
        lng: item.locationPoint.y,
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
  });
  marker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    addressField.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
  });
};
initMap();

//нужно доработать код





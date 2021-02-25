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

  marker.addTo(map);
  marker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    addressField.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;

  });
};
initMap();





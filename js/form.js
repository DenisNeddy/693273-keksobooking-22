const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const titleInput = document.querySelector('#title');
titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  }
  else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH ) + ' симв.');
  } else if (titleInput.value === '') {
    titleInput.setCustomValidity('')
  }
  else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

const typeMapping = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const inputPrice = document.querySelector('#price');

const typeShelter = document.querySelector('#type');
typeShelter.value = 'bungalow';
inputPrice.min = typeMapping[typeShelter.value];
inputPrice.placeholder = typeMapping[typeShelter.value];
typeShelter.addEventListener('change', () => {
  inputPrice.min = typeMapping[typeShelter.value];
  inputPrice.placeholder = typeMapping[typeShelter.value];
});

const inputTimein = document.querySelector('#timein');

const inputTimeout = document.querySelector('#timeout');


inputTimein.addEventListener('change', () => {
  inputTimeout.value = inputTimein.value;
});

inputTimeout.addEventListener('change', () => {
  inputTimein.value = inputTimeout.value;
});

const inputNumberRooms = document.querySelector('#room_number');
const inputCapacity = document.querySelector('#capacity');
inputNumberRooms.value = '100';
const capacities = inputCapacity.children;
const syncCapacity = () => {
  if(inputNumberRooms.value === '100') {
    for(let i = 0; i < capacities.length; i++) {
      capacities[i].disabled = capacities[i].value !== '0';
    }
  }  else {
    for (let i = 0; i < capacities.length; i++) {
      capacities[i].disabled = capacities[i].value > inputNumberRooms.value || capacities[i].value == '0';
    }
  }
}

syncCapacity();

inputNumberRooms.addEventListener('change', syncCapacity);




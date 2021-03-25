import api from './api.js';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const form = document.querySelector('.ad-form');
const titleInput = document.querySelector('#title');
const avatarInput = document.querySelector('#avatar');
const avatarImage = document.querySelector('.ad-form-header__preview').firstElementChild;
const viewInput = document.querySelector('#images');
const viewImage = document.querySelector('.ad-form__photo');



const changeAvatar = () => {
  const reader = new FileReader();
  reader.onloadend = (e) => {
    avatarImage.src = e.target.result;
  }
  reader.readAsDataURL(avatarInput.files[0]);
}

avatarInput.addEventListener('change', changeAvatar);

const addImage = () => {
  const reader = new FileReader();
  const newImage = document.createElement('img');
  newImage.style.width = '100%';
  reader.onloadend = (e) => {
    newImage.src = e.target.result;
    viewImage.appendChild(newImage);
  }
  reader.readAsDataURL(viewInput.files[0]);
}

viewInput.addEventListener('change', addImage)

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
inputNumberRooms.value = '1';
const capacities = inputCapacity.children;
const syncCapacity = () => {
  let selected = false;

  if(inputNumberRooms.value === '100') {
    for(let i = 0; i < capacities.length; i++) {
      capacities[i].disabled = capacities[i].value !== '0';
    }
    inputCapacity.value = 0;
  }  else {
    for (let i = 0; i < capacities.length; i++) {
      capacities[i].disabled = capacities[i].value > inputNumberRooms.value || capacities[i].value == '0';
      if (inputCapacity.value !== capacities[i].value && !capacities[i].disabled && !selected) {
        selected = true;
        inputCapacity.value = capacities[i].value;
      }
    }
  }
}

syncCapacity();

inputNumberRooms.addEventListener('change', syncCapacity);

const clearForm = () => {
  titleInput.value = '';
  inputNumberRooms.value = '1';
  inputCapacity.value = '1';
  typeShelter.value = 'flat';
  inputPrice.value = '';
  inputPrice.min = typeMapping[typeShelter.value];
  inputPrice.placeholder = typeMapping[typeShelter.value];
  document.querySelector('#description').value = '';
  const features = document.querySelectorAll('input[name=features]');
  for (let i = 0; i < features.length; i++) {
    features[i].checked = false;
  }
  inputTimein.value ='12:00';
  inputTimeout.value ='12:00';

  avatarInput.value = '';
  avatarImage.src = 'img/muffin-grey.svg';
  viewInput.value = '';
  if (viewImage.children.length) {
    viewImage.firstElementChild.remove();
  }
}

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const postData = new FormData(form);
  api.postData(postData).then(() => {
    resetButton.click();

    const successTemplate = document.querySelector('#success').content.querySelector('.success');
    const successMessage = successTemplate.cloneNode(true);
    document.body.appendChild(successMessage);

    document.body.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        successMessage.remove();
        resetButton.click();
      }
    })
  }).catch(() => {
    const errorTemplate = document.querySelector('#error').content.querySelector('.error');
    const errorMessage = errorTemplate.cloneNode(true);
    document.body.appendChild(errorMessage);
    const resetButton = errorMessage.querySelector('.error__button');
    resetButton.addEventListener('click', () => {
      errorMessage.remove();
      clearForm();
    })
    document.body.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        errorMessage.remove();
        clearForm();
      }
    })
  })
});


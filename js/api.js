const API_URL = 'https://22.javascript.pages.academy/keksobooking/data';

const getData = () => new Promise((res, rej) => {
  fetch(API_URL).then((response) => response.json())
    .then((data) => {
      res(data)
    }).catch((error) => {
      rej(error)
    });
});

export default {getData};

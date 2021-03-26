const API_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const API_POST_URL = 'https://22.javascript.pages.academy/keksobooking';
const getData = () => new Promise((res, rej) => {
  fetch(API_URL).then((response) => response.json())
    .then((data) => {
      res(data)
    }).catch((error) => {
      rej(error)
    });
});

const postData = (data) => new Promise((res, rej) => {
  fetch(API_POST_URL, {
    method: 'POST',
    body: data,
  }).then((response) => response.json())
    .then((data) => {
      res(data)
    }).catch((error) => {
      rej(error)
    });
});

export default {getData, postData};

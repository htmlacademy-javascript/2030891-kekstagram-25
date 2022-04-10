import {showAlert} from './myFunctions.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/404')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      showAlert('Что-то пошло не так, попробуйте позже...');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram/404',
    {
      method: 'POST',
      body
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData,sendData};

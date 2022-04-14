import {showAlert} from './my-functions.js';

const DATA_GET_LINK = 'https://25.javascript.pages.academy/kekstagram/data';
const DATA_POST_LINK = 'https://25.javascript.pages.academy/kekstagram/';

const getData = (onSuccess) => {
  fetch(DATA_GET_LINK)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((cards) => {
      onSuccess(cards);
    })
    .catch(() => {
      showAlert('Что-то пошло не так, попробуйте позже...');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    DATA_POST_LINK,
    {
      method: 'POST',
      body
    },)
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

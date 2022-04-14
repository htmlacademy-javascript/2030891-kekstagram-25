const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkLengthString = (checkString, maxStringLength) => checkString.length <= maxStringLength;

const isEscapeKey = (evt) => evt.key === 'Escape';

const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.querySelector('#alert-container').content.querySelector('.alert-container').cloneNode(true);
  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {checkLengthString,getRandomNumber,isEscapeKey,showAlert,debounce};

function getRandomNumber(min, max){
  if(min < 0 || max < 0){
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkLengthString(checkString, maxStringLength){
  return checkString.length <= maxStringLength;
}

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

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

export {getRandomArrayElement,checkLengthString,getRandomNumber,isEscapeKey,showAlert};

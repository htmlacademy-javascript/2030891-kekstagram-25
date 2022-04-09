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

export {getRandomArrayElement, checkLengthString, getRandomNumber, isEscapeKey};

import {createPhotoCard} from './createPhotoCard.js';
import {createBigPhotoModalFrame} from './openBigPhoto.js';
import {initPhotoFormOpenAndClose,initPhotoFormValidation,initFormButtonSubmit,closeForm} from './validation.js';
import {setActionOnButtonControl,initSlider} from './sliders.js';
import {getData} from './api.js';

getData((cards) => {
  createPhotoCard(cards);
  createBigPhotoModalFrame(cards);
});

initPhotoFormValidation();
initPhotoFormOpenAndClose();
initFormButtonSubmit(closeForm);
setActionOnButtonControl();
initSlider();

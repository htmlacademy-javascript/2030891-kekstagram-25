import {createPhotoCard} from './createPhotoCard.js';
import {createBigPhotoModalFrame} from './openBigPhoto.js';
import {initPhotoFormOpenAndClose,initPhotoFormValidation,initFormButtonSubmit,onCloseForm} from './validation.js';
import {setActionOnButtonControl,initSlider} from './sliders.js';
import {getData} from './api.js';
import {filterImages} from './imgFilters.js';

getData((cards) => {
  createPhotoCard(cards);
  createBigPhotoModalFrame(cards);
  filterImages(cards);
});

initPhotoFormValidation();
initPhotoFormOpenAndClose();
initFormButtonSubmit(onCloseForm);
setActionOnButtonControl();
initSlider();

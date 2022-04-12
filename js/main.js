import {createPhotoCard} from './create-photo-card.js';
import {createBigPhotoModalFrame} from './open-big-photo.js';
import {initPhotoFormOpenAndClose,initPhotoFormValidation,initFormButtonSubmit,onCloseForm} from './validation.js';
import {setActionOnButtonControl,initSlider} from './sliders.js';
import {getData} from './api.js';
import {filterImages} from './img-filters.js';

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

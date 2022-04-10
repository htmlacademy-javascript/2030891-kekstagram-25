import {similarPhotoCards} from './photoCardRandomData.js';
import {createPhotoCard} from './createPhotoCard.js';
import {createBigPhotoModalFrame} from './openBigPhoto.js';
import {initPhotoFormOpenAndClose, initPhotoFormValidation} from './validation.js';
import {setActionOnButtonControl,initSlider} from './sliders.js';

const cards = similarPhotoCards();
createPhotoCard(cards);
createBigPhotoModalFrame(cards);
initPhotoFormValidation();
initPhotoFormOpenAndClose();
setActionOnButtonControl();
initSlider();

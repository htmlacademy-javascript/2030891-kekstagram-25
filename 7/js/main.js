import {similarPhotoCards} from './photoCardRandomData.js';
import {createPhotoCard} from './createPhotoCard.js';
import {createBigPhotoModalFrame} from './openBigPhoto.js';
import {initPhotoFormOpenAndClose, initPhotoFormValidation} from './validation.js';

const cards = similarPhotoCards();
createPhotoCard(cards);
createBigPhotoModalFrame(cards);
initPhotoFormValidation();
initPhotoFormOpenAndClose();

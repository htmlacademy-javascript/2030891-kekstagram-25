import {similarPhotoCards} from './photoCardRandomData.js';
import {createPhotoCard} from './createPhotoCard.js';
import {createBigPhotoModalFrame} from './openBigPhoto.js';

const cards = similarPhotoCards();
createPhotoCard(cards);
createBigPhotoModalFrame(cards);

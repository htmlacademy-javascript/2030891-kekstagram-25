import {similarPhotoCards} from './photoCardRandomData.js';
import {createPhotoCard} from './createPhotoCard.js';

const cards = similarPhotoCards();
createPhotoCard(cards);

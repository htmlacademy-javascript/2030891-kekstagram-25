import {createPhotoCard} from './createPhotoCard.js';
import {createBigPhotoModalFrame} from './openBigPhoto.js';
import {getRandomNumber,debounce} from './myFunctions.js';

const filterSection = document.querySelector('.img-filters');

function getSort(a, b) {
  return b.comments.length - a.comments.length;
}

function clearPhotoCard() {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
}

function getRandomCards() {
  return getRandomNumber(-25, 25);
}

function postSorting(cards, filter) {
  if (filter === 'filter-default') {
    clearPhotoCard();
    createPhotoCard(cards);
    createBigPhotoModalFrame(cards);
  }
  else if (filter === 'filter-random') {
    const randomizedCards = cards.slice().sort(getRandomCards).slice(0, 10);
    clearPhotoCard();
    createPhotoCard(randomizedCards);
    createBigPhotoModalFrame(randomizedCards);
  }
  else if (filter === 'filter-discussed') {
    const discussedCards = cards.slice().sort(getSort);
    clearPhotoCard();
    createPhotoCard(discussedCards);
    createBigPhotoModalFrame(discussedCards);
  }}

const onSortButtonClick = debounce(postSorting);

function filterImages(cards) {
  const filterForm = filterSection.querySelector('.img-filters__form');
  filterSection.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', (evt) => {
    filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    onSortButtonClick(cards, evt.target.id);
  });
}

export {filterImages};

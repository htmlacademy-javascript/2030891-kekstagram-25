import {isEscapeKey} from './my-functions.js';

const cardPhotoModal = document.querySelector('.big-picture');
const cardPhotoModalImage = cardPhotoModal.querySelector('.big-picture__img img');
const closePhotoModal = document.querySelector('.big-picture__cancel');
const commentTemplate = cardPhotoModal.querySelector('.social__comment');
const likesCount = cardPhotoModal.querySelector('.likes-count');
const commentsCount = cardPhotoModal.querySelector('.comments-count');
const commentsLoader = document.querySelector('.social__comments-loader');
const commentsList = cardPhotoModal.querySelector('.social__comments');
let postComments = [];
let lastFilledComments = 0;

const fillCommentsBlock = () => {
  const partedComments = postComments.slice(lastFilledComments,lastFilledComments+5);
  const filledComments = document.querySelector('.comments-filled');
  partedComments.forEach((commentData) => {
    const comment = commentTemplate.cloneNode(true);
    const commentImg = comment.querySelector('img');
    commentImg.src = commentData.avatar;
    commentImg.alt = commentData.name;
    comment.querySelector('.social__text').textContent = commentData.message;
    commentsList.append(comment);
  });
  lastFilledComments += partedComments.length;
  if (lastFilledComments >= postComments.length) {
    commentsLoader.classList.add('hidden');
  }
  filledComments.textContent = lastFilledComments;
};

const onPhotoCardEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    cardPhotoModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
};

const onPhotoCardClickCancel = () => {
  cardPhotoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const resetBigPicture = () => {
  commentsLoader.classList.remove('hidden');
  lastFilledComments = 0;
  closePhotoModal.removeEventListener('click', onPhotoCardClickCancel);
  document.removeEventListener('keydown', onPhotoCardEscKeydown);
};

const onLoadMoreButtonClick = () => {
  fillCommentsBlock();
};

const fillPhotoCardModal = (card) => {
  resetBigPicture();
  cardPhotoModalImage.src = card.url;
  likesCount.textContent = card.likes;
  postComments = card.comments;
  commentsCount.textContent = card.comments.length.toString();
  commentsList.innerHTML = '';
  fillCommentsBlock();
  cardPhotoModal.classList.remove('hidden');
  closePhotoModal.addEventListener('click', onPhotoCardClickCancel);
  document.addEventListener('keydown', onPhotoCardEscKeydown);
  commentsLoader.addEventListener('click', onLoadMoreButtonClick);
};

const createBigPhotoModalFrame = (cards) => {
  const photoCard = document.querySelectorAll('.picture');
  for(let i = 0; i < photoCard.length; i++){
    photoCard[i].addEventListener('click', (evt) => {
      const cardId = evt.target.closest('.picture').dataset.cardId;
      fillPhotoCardModal(cards[cardId]);
      document.body.classList.add('modal-open');
    });
  }
};

export {createBigPhotoModalFrame};

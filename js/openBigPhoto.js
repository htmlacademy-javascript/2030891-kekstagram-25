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

function fillCommentsBlock () {
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
}

function resetBigPicture() {
  commentsLoader.classList.remove('hidden');
  lastFilledComments = 0;
}

function fillPhotoCardModal (card) {
  resetBigPicture();
  cardPhotoModalImage.src = card.url;
  likesCount.textContent = card.likes;
  postComments = card.comments;
  commentsCount.textContent = card.comments.length.toString();
  commentsList.innerHTML = '';
  fillCommentsBlock();
  cardPhotoModal.classList.remove('hidden');
  closePhotoModal.addEventListener('click', () =>{
    cardPhotoModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', (evt) =>{
    if(evt.key === 'Escape') {
      cardPhotoModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
  commentsLoader.addEventListener('click', fillCommentsBlock);
}

function createBigPhotoModalFrame(cards) {
  const photoCard = document.querySelectorAll('.picture');
  for(let i = 0; i < photoCard.length; i++){
    photoCard[i].addEventListener('click', (evt) => {
      const cardId = evt.target.closest('.picture').dataset.cardId;
      fillPhotoCardModal(cards[cardId]);
      document.body.classList.add('modal-open');
    });
  }
}

export {createBigPhotoModalFrame};

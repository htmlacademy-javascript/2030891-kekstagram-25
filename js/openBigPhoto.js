const cardPhotoModal = document.querySelector('.big-picture');
const cardPhotoModalImage = cardPhotoModal.querySelector('.big-picture__img img');
const closePhotoModal = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#social-comment').content;
const likesCount = cardPhotoModal.querySelector('.likes-count');
const commentsCount = cardPhotoModal.querySelector('.comments-count');

function fillCommentsBlock (comments) {
  const commentsList = cardPhotoModal.querySelector('.social__comments');
  commentsList.innerHTML = '';
  comments.forEach((commentData) => {
    const comment = commentTemplate.cloneNode(true);
    const commentImg = comment.querySelector('img');
    commentImg.src = commentData.avatar;
    commentImg.alt = commentData.name;
    comment.querySelector('.social__text').textContent = commentData.message;
    commentsList.append(comment);
  });
}

function fillPhotoCardModal (card) {
  cardPhotoModalImage.src = card.url;
  likesCount.textContent = card.likes;
  commentsCount.textContent = card.comments.length.toString();
  fillCommentsBlock(card.comments);
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
}

function createBigPhotoModalFrame(cards) {
  const photoCard = document.querySelectorAll('.picture');
  for(let i = 0; i < photoCard.length; i++){
    photoCard[i].addEventListener('click', (evt) => {
      const cardId = evt.target.closest('.picture').dataset.cardId;
      fillPhotoCardModal(cards[cardId]);
      cardPhotoModal.querySelector('.social__comment-count').classList.add('hidden');
      cardPhotoModal.querySelector('.comments-loader').classList.add('hidden');
      document.body.classList.add('modal-open');
    });
  }
}

export {createBigPhotoModalFrame};

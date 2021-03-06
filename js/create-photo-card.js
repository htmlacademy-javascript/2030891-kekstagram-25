const usersListPhotoCards = document.querySelector('.pictures');
const photoCardTemplate = document.querySelector('#picture').content;
const miniatures = document.createDocumentFragment();

const createPhotoCard = (cards) => {
  cards.forEach(({ url, likes, comments }, index) => {
    const card = photoCardTemplate.cloneNode(true);
    card.querySelector('.picture__img').src = url;
    card.querySelector('.picture__likes').textContent = likes;
    card.querySelector('.picture__comments').textContent = comments.length;
    card.querySelector('.picture').dataset.cardId = index;
    miniatures.append(card);
  });
  usersListPhotoCards.append(miniatures);
};

export {createPhotoCard};

import {getRandomArrayElement, getRandomNumber} from './myFunctions.js';

let uniqueIdentifierPhotoCard = 1;
let uniqueIdentifierComment = 1;

const NAMES = [
  'Иван',
  'Артем',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Нниколай',
  'Алена',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Чудеса - там, где в них верят, и чем больше верят, тем чаще они случаются.',
  'Просыпаясь утром, спроси себя: «Что я должен сделать?» Вечером, прежде чем заснуть: «Что я сделал?».',
  'В жизни нет разочарований – только уроки.',
  'Постановка целей является первым шагом на пути превращения мечты в реальность.',
  'Свою жизнь надо устраивать до тех пор, пока она не начнёт устраивать вас.',
  'Одна законченная результативная задача стоит полусотни полузаконченных задач.',
  'Жизнь — как вождение велосипеда. Чтобы сохранить равновесие, ты должен двигаться.',
  'Карьера — чудесная вещь, но она никого не может согреть в холодную ночь. ',
];

const SIMILAR_PHOTO_COUNT = 25;



const createComments = () => {
  const localId = uniqueIdentifierComment;
  uniqueIdentifierComment++;
  return {
    id: localId,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhotoCard = () => {
  const localId = uniqueIdentifierPhotoCard;
  uniqueIdentifierPhotoCard++;
  const similarComments = Array.from({length: getRandomNumber(1, 3)}, createComments);
  return {
    id: localId,
    url: `photos/${localId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: similarComments,
  };
};

const similarPhotoCards = () => Array.from({length: SIMILAR_PHOTO_COUNT}, createPhotoCard);

export {similarPhotoCards};

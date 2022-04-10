import {isEscapeKey} from './myFunctions.js';
import {clearEffects,imagePreview} from './sliders.js';
import {sendData} from './api.js';

const uploadPhoto = document.querySelector('#upload-file');
const overlayForm = document.querySelector('.img-upload__overlay');
const uploadPhotoForm = document.querySelector('#upload-select-image');
const submitButton = uploadPhotoForm.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Загрузка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
});

function openForm() {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__preview img').src = URL.createObjectURL(this.files[0]);
}

function closeForm() {
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPhotoForm.reset();
  pristine.reset();
  document.getElementById('effect-none').checked = true;
  clearEffects();
  imagePreview.style.transform = '';
}

function initPhotoFormOpenAndClose()
{
  uploadPhoto.addEventListener('change', openForm);
  document.querySelector('.img-upload__cancel').addEventListener('click', closeForm);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeForm();
    }
  });
  document.querySelector('.img-upload__text input').addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  document.querySelector('.img-upload__text textarea').addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
}

function validateComment (value) {
  return value.length <= 140;
}

function validateHashTags (value) {
  if(value.length === 0)
  {
    return true;
  }
  let hashTags = value.split(' ');
  hashTags = hashTags.map((element) => element.toLowerCase());
  const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  if (hashTags.length > 5) {
    return false;
  }
  for (let i = 0; i < hashTags.length; i++) {
    if(!regularExpression.test(hashTags[i]))
    {
      return false;
    }
  }
  const hashTagsWithoutDuplicates = [...new Set(hashTags)];
  return hashTags.length === hashTagsWithoutDuplicates.length;
}

function getHashTagsErrorMessage (value) {
  let hashTags = value.split(' ');
  hashTags = hashTags.map((element) => element.toLowerCase());
  const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  if (hashTags.length > 5) {
    return 'Нельзя использовать больше 5 хэштегов!';
  }
  for (let i = 0; i < hashTags.length; i++) {
    if(!regularExpression.test(hashTags[i]))
    {
      if(hashTags[i].length > 19)
      {
        return 'Хэштег не может быть больше 19 символов!';
      }
      else
      {
        return `Это: (${hashTags[i]}) не хэштег!`;
      }
    }
  }
  const hashTagsWithoutDuplicates = [...new Set(hashTags)];
  if(hashTags.length === hashTagsWithoutDuplicates.length)
  {
    return true;
  }
  else
  {
    return 'Нельзя использовать несколько одинаковых хэштегов!';
  }
}

function initPhotoFormValidation() {
  pristine.addValidator(
    uploadPhotoForm.querySelector('.text__description'),
    validateComment,
    'Длинна комментария не может быть больше 140 символов!'
  );

  pristine.addValidator(
    uploadPhotoForm.querySelector('.text__hashtags'),
    validateHashTags,
    getHashTagsErrorMessage
  );
}

function showInfoMessage(type) {
  const message = document.querySelector(`#${type}`).content.querySelector(`.${type}`).cloneNode(true);
  const messageWrapper = message.querySelector(`.${type}__inner`);
  const button = messageWrapper.querySelector(`.${type}__button`);
  button.addEventListener('click', () => {
    message.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      message.remove();
    }
  });
  document.addEventListener('click', (evt) => {
    const withinBoundaries = evt.composedPath().includes(messageWrapper);
    if (!withinBoundaries) {
      message.remove();
    }
  });
  document.body.appendChild(message);
}
const initFormButtonSubmit = (onSuccess) => {
  uploadPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showInfoMessage('success');
        },
        () => {
          unblockSubmitButton();
          showInfoMessage('error');
          closeForm();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {initPhotoFormOpenAndClose,initPhotoFormValidation,initFormButtonSubmit,closeForm};

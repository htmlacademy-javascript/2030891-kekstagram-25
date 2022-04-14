import {isEscapeKey,checkLengthString} from './my-functions.js';
import {clearEffects} from './sliders.js';
import {sendData} from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAGS_LIMIT = 5;
const MAX_COMMENT_LENGTH = 140;

const imagePreview = document.querySelector('.img-upload__preview');
const uploadPhoto = document.querySelector('#upload-file');
const overlayForm = document.querySelector('.img-upload__overlay');
const uploadPhotoForm = document.querySelector('#upload-select-image');
const submitButton = uploadPhotoForm.querySelector('.img-upload__submit');
const effectNoneRadio = document.getElementById('effect-none');
const closeFormButton = document.querySelector('.img-upload__cancel');
const formHashTagsInput = uploadPhotoForm.querySelector('.text__hashtags');
const formDescriptionInput = uploadPhotoForm.querySelector('.text__description');
const messageSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const messageWrapperSuccess = messageSuccess.querySelector('.success__inner');
const buttonSuccess = messageWrapperSuccess.querySelector('.success__button');
const messageError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const messageWrapperError = messageError.querySelector('.error__inner');
const buttonError = messageWrapperError.querySelector('.error__button');

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
          onCloseForm();
        },
        new FormData(evt.target),
      );
    }
  });
};

function uploadPreview(image) {
  const preview = document.querySelector('.img-upload__preview img');
  const file = image.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
}

function onOpenForm() {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadPreview(this);
  closeFormButton.addEventListener('click', onCloseForm);
  formHashTagsInput.addEventListener('keydown', onInputElementEscKeydown);
  formDescriptionInput.addEventListener('keydown', onInputElementEscKeydown);
  document.addEventListener('keydown', onInfoMessageFormEscKeydown);
}

function onCloseForm() {
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPhotoForm.reset();
  pristine.reset();
  effectNoneRadio.checked = true;
  clearEffects();
  imagePreview.style.transform = '';
  closeFormButton.removeEventListener('click', onCloseForm);
  formHashTagsInput.removeEventListener('keydown', onInputElementEscKeydown);
  formDescriptionInput.removeEventListener('keydown', onInputElementEscKeydown);
  document.removeEventListener('keydown', onInfoMessageFormEscKeydown);
}

function onInputElementEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function onInfoMessageFormEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    onCloseForm();
  }
}

function initPhotoFormOpenAndClose()
{
  uploadPhoto.addEventListener('change', onOpenForm);
}

function validateComment (value) {
  return checkLengthString(value, MAX_COMMENT_LENGTH);
}

function validateHashTags (value) {
  if(value.length === 0)
  {
    return true;
  }
  value = value.replace(/\s+/g, ' ').trim();
  let hashTags = value.split(' ');
  hashTags = hashTags.map((element) => element.toLowerCase());
  const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  if (hashTags.length > HASHTAGS_LIMIT) {
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
  value = value.replace(/\s+/g, ' ').trim();
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
    formDescriptionInput,
    validateComment,
    'Длинна комментария не может быть больше 140 символов!'
  );

  pristine.addValidator(
    formHashTagsInput,
    validateHashTags,
    getHashTagsErrorMessage
  );
}

const onInfoMessageSuccessClickButton = () => {
  closeSuccessInfoMessage();
};
const onInfoMessageSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeSuccessInfoMessage();
  }
};
const onInfoMessageSuccessClickOutside = (evt) => {
  const withinBoundaries = evt.composedPath().includes(messageWrapperSuccess);
  if (!withinBoundaries) {
    closeSuccessInfoMessage();
  }
};

const onInfoMessageErrorClickButton = () => {
  closeErrorInfoMessage();
};
const onInfoMessageErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeErrorInfoMessage();
  }
};
const onInfoMessageErrorClickOutside = (evt) => {
  const withinBoundaries = evt.composedPath().includes(messageWrapperError);
  if (!withinBoundaries) {
    closeErrorInfoMessage();
  }
};

function showInfoMessage(type) {
  if(type === 'success')
  {
    showSuccessInfoMessage();
  }
  else if(type === 'error')
  {
    showErrorInfoMessage();
  }
}

function showSuccessInfoMessage()
{
  buttonSuccess.addEventListener('click', onInfoMessageSuccessClickButton);
  document.addEventListener('keydown', onInfoMessageSuccessEscKeydown);
  document.addEventListener('click', onInfoMessageSuccessClickOutside);
  document.body.appendChild(messageSuccess);
}

function showErrorInfoMessage()
{
  buttonError.addEventListener('click', onInfoMessageErrorClickButton);
  document.addEventListener('keydown', onInfoMessageErrorEscKeydown);
  document.addEventListener('click', onInfoMessageErrorClickOutside);
  document.body.appendChild(messageError);
}

function closeSuccessInfoMessage()
{
  buttonSuccess.removeEventListener('click', onInfoMessageSuccessClickButton);
  document.removeEventListener('keydown', onInfoMessageSuccessEscKeydown);
  document.removeEventListener('click', onInfoMessageSuccessClickOutside);
  messageSuccess.remove();
}

function closeErrorInfoMessage()
{
  buttonSuccess.removeEventListener('click', onInfoMessageErrorClickButton);
  document.removeEventListener('keydown', onInfoMessageErrorEscKeydown);
  document.removeEventListener('click', onInfoMessageErrorClickOutside);
  messageError.remove();
}

export {initPhotoFormOpenAndClose,initPhotoFormValidation,initFormButtonSubmit,onCloseForm};

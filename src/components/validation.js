// Объект с переменными валидации

export const validationConfig = {

  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}; 

// Показать ошибку ввода

function showInputError(form, input, errorMessage) {

  const error = form.querySelector(`.${input.id}__input-error`);

  input.classList.add(validationConfig.inputErrorClass);

  error.textContent = errorMessage;

  error.classList.add(validationConfig.errorClass);
};

// Спрятать ошибку ввода

function hideInputError(form, input) {

  const error = form.querySelector(`.${input.id}__input-error`);

  input.classList.remove(validationConfig.inputErrorClass);

  error.classList.remove(validationConfig.errorClass);

  error.textContent = '';
};

// Проверить инпут на валидность

export function isValid(form, input) {

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.error);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

// Проверить невалидность одного из инпутов

function hasInvalidInput(inputList) {
  return inputList.some(function(input) {
    return !input.validity.valid;
  })
};

// Изменить кликабельность кнопки

function toggleButtonState(inputList, button) {

  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add('button__inactive');
  } else {
    button.disabled = false;
    button.classList.remove('button__inactive');
  }
};

// Слушатели событий инпутов

function setEventListeners(form) {

  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, button);

  inputList.forEach(function(input) {
    input.addEventListener('input', function() {
      isValid(form, input);
      toggleButtonState(inputList, button);
    });
  });
};
  
export  function enableValidation() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach(function(form) {
    setEventListeners(form);
  });
};

// Очистка ошибок валидации с прошлого открытия

export function clearValidation(form, validationConfig) {

  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(function(input) {
    hideInputError(form, input);
  });
  
  toggleButtonState(inputList, button);
};
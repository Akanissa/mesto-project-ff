// Показать ошибку ввода

function showInputError(form, input, errorMessage, validationConfig) {

  const error = form.querySelector(`.${input.id}__input-error`);

  input.classList.add(validationConfig.inputErrorClass);

  error.textContent = errorMessage;

  error.classList.add(validationConfig.errorClass);
};

// Спрятать ошибку ввода

function hideInputError(form, input, validationConfig) {

  const error = form.querySelector(`.${input.id}__input-error`);

  input.classList.remove(validationConfig.inputErrorClass);

  error.classList.remove(validationConfig.errorClass);

  error.textContent = '';

  input.setCustomValidity('');
};

// Проверить инпут на валидность

function isValid(form, input, validationConfig) {

  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.error);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
};

// Проверить невалидность одного из инпутов

function hasInvalidInput(inputList) {
  return inputList.some(function(input) {
    return !input.validity.valid;
  })
};

// Изменить кликабельность кнопки

function toggleButtonState(inputList, button, validationConfig) {

  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Слушатели событий инпутов

function setEventListeners(form, validationConfig) {

  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, button, validationConfig);

  inputList.forEach(function(input) {
    input.addEventListener('input', function() {
      isValid(form, input, validationConfig);
      toggleButtonState(inputList, button, validationConfig);
    });
  });
};
  
export  function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach(function(form) {
    setEventListeners(form, validationConfig);
  });
};

// Очистка ошибок валидации с прошлого открытия

export function clearValidation(form, validationConfig) {

  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(function(input) {
    hideInputError(form, input, validationConfig);
  });
  
  toggleButtonState(inputList, button, validationConfig);
};
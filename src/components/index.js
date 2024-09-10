import { initialCards } from './cards.js';
import '../pages/index.css';
import { openModal, closeModal } from './modal.js';
import { likeButton, createCard } from './card.js';
import { validationConfig, enableValidation, clearValidation } from './validation.js';

// Переменные

const popups = document.querySelectorAll('.popup');
const popupForm = document.querySelector('.popup__form');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const buttonAddProfile = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popupsContent = document.querySelectorAll('.popup__content');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formEditProfile = document.forms['edit-profile'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const formAddProfile = document.forms['new-place'];
const popupImage = document.querySelector('.popup_type_image');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__description');
const image = document.querySelector('.popup__image');
const name = document.querySelector('.popup__caption');
const avatarImage = document.querySelector('.profile__image');
// const cardTitle = document.querySelectorAll('.card__title');
// const cardImage = document.querySelectorAll('.card__image');

const avatarPopup = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms['edit-avatar'];
// const avatarUrlInput = document.querySelector('.popup__input_type_url');


// Темплейт карточки

export const container = document.querySelector('#card-template').content;

// DOM узлы

const cardList = document.querySelector('.places__list');

// Слушатели открытия модального окна

buttonEditProfile.addEventListener('click', function() {
  clearValidation(formEditProfile, validationConfig);
  openModal(profilePopup);
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
});

buttonAddProfile.addEventListener('click', function() {
  clearValidation(newCardPopup, validationConfig);
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openModal(newCardPopup);
});

avatarImage.addEventListener('click', function() {
  clearValidation(avatarPopup, validationConfig);  
  cardLinkInput.value = "";
  openModal(avatarPopup);
});

// Открытие модального окна с картинкой

function openPopupImage(item) {

  name.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  openModal(popupImage);
}

// Слушатели закрытия модального окна

buttonsClosePopup.forEach(function(item) {
  const popup = item.closest('.popup');
  item.addEventListener('click', function() {
    closeModal(popup);
  });
});

profilePopup.addEventListener('click', function() {
  closeModal(profilePopup);
});

newCardPopup.addEventListener('click', function() {
  closeModal(newCardPopup);
});

// Закрытие модального окна при нажатии на оверлей

popups.forEach(function(overlay) {
  overlay.addEventListener('click', function(evt) {
    if (evt.target === overlay) {
      closeModal(overlay);
    }
  });
});

popupsContent.forEach(function(item) {
  const popup = item.closest('.popup__content');
  item.addEventListener('click', function(evt) {
    evt.stopPropagation();
  });
});

// Редактирование имени и информации о себе

function handleFormEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const nameValue = nameInput.value;
  const jobValue = jobInput.value; // Получите значение полей jobInput и nameInput из свойства value
    
  nameTitle.textContent = nameValue; // Вставьте новые значения с помощью textContent
  jobTitle.textContent = jobValue;

  updateUserInfo(nameValue, jobValue) // Обновление данных  после нажатия кнопки 'Сохранить' и вывод их в консоль
    .then((userInfo) => {
      userInfo.name = nameTitle.textContent;
      userInfo.about = jobTitle.textContent;
      console.log('Данные пользователя обновлены:', userInfo);
    })
    .catch((err) => {
      console.log(err);
    });

  closeModal(profilePopup);
}

formEditProfile.addEventListener('submit', handleFormEditProfile);

// Добавление карточки

function handleFormAddCard(evt) {
  evt.preventDefault();

  const nameValue = cardNameInput.value;
  const linkValue = cardLinkInput.value; 

  const card = {
    name: nameValue,
    link: linkValue
  }

  addNewCard(nameValue, linkValue)
  .then((card) => {
    const newCard = createCard(card, deleteCard, likeButton, openPopupImage, card.owner._id);
    cardList.prepend(newCard);
    formAddProfile.reset();
    closeModal(newCardPopup);
  })
  .catch((err) => {
    console.log(err);
  });
}

formAddProfile.addEventListener('submit', handleFormAddCard);

// Редактирование аватара

function editAvatar(evt) {
  evt.preventDefault();

  const avatarValue = cardLinkInput.value;

  updateUserAvatar(avatarValue)
    .then((userInfo) => {
      avatarImage.setAttribute('style', `background-image: url('${userInfo.avatar}')`);
      closeModal(avatarPopup);
    })  
    .catch((err) => {
      console.log(err);
    });

  enableValidation();
}

formAvatar.addEventListener('submit', editAvatar);

// Вызов функции валидации

enableValidation();

//_________________________________________________________________________



// Данные для API

const config = {
  cohort: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: 'dbc8d628-1ef0-4991-a7d3-2138c077d5c9',
    'Content-Type': 'application/json'
  }
}

// Загрузка информации о пользователе с сервера

const getUserInfo = function() {
  return fetch(`${config.cohort}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
}

// Обновление данных пользователя на сервере

const updateUserInfo = function(name, about) {
  return fetch(`${config.cohort}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
}

// Загрузка карточек с сервера

const getCardsInfo = function() {
  return fetch(`${config.cohort}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
}

// Добавление новой карточки на сервер

const addNewCard = function(name, link) {
  return fetch(`${config.cohort}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
}

// Вывод массива с информацией о пользователе и карточках

const promises = [getUserInfo(), getCardsInfo()];

Promise.all(promises)
  .then(([userInfo, cardsInfo]) => {

    const userId = userInfo._id;

    nameTitle.textContent = userInfo.name;
    jobTitle.textContent = userInfo.about;

    cardsInfo.forEach((card) => {
      const newCard = createCard(card, deleteCard, likeButton, openPopupImage, userId);
      cardList.append(newCard);
    });

    console.log({ userInfo, cardsInfo });
  })
  .catch((err) => {
    console.log(err);
  })

// удаление карточки по id

export const deleteCard = function(_id, card) {
  return fetch(`${config.cohort}/cards/${_id}`, {
    method: 'DELETE', 
    headers: config.headers
  })
  .then(() => {
    card.remove();
  })
  .catch((err) => {
    console.log(err);
  })
};

// Добавление лайка карточки

export const addCardLike = function(_id) {
  return fetch(`${config.cohort}/cards/likes/${_id}`, {
    method: 'PUT', 
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
}

// Удаление лайка карточки

export const deleteCardLike = function(_id) {
  return fetch(`${config.cohort}/cards/likes/${_id}`, {
    method: 'DELETE', 
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
}

// Обновление аватара пользователя

const updateUserAvatar = function(avatar) {
  return fetch(`${config.cohort}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
}
// import { initialCards } from './cards.js';
import '../pages/index.css';
import { openModal, closeModal } from './modal.js';
import { likeButton, createCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, updateUserInfo, getCardsInfo, addNewCard, deleteCard, getUserAvatar } from './api.js';

// Объект с переменными валидации

export const validationConfig = {

  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
};

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
const avatarPopup = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms['edit-avatar'];
const avatarUrlInput = document.querySelector('.avatar__input_type_url');


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
  avatarUrlInput.value = "";
  openModal(avatarPopup);
});

// Функция открытия модального окна с картинкой

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

  changeButtonText(profilePopup, 'Сохранение...'); // Изменение текста кнопки нажатии на кнопку и загрузке

  updateUserInfo(nameValue, jobValue) // Обновление данных  после нажатия кнопки 'Сохранить' и вывод их в консоль
    .then((userInfo) => {
      userInfo.name = nameTitle.textContent;
      userInfo.about = jobTitle.textContent;
      console.log('Данные пользователя обновлены:', userInfo);
      changeButtonText(profilePopup, 'Сохранить'); // Изменение текста кнопки после загрузки
    })
    .catch((err) => {
      console.log(`Ошибка обновления данных: ${err}`);
    })
    .finally(() => {
      changeButtonText(profilePopup, 'Сохранить');
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

  changeButtonText(newCardPopup, 'Сохранение...');

  addNewCard(nameValue, linkValue)
  .then((card) => {
    const newCard = createCard(card, deleteCard, likeButton, openPopupImage, card.owner._id);
    cardList.prepend(newCard);
    formAddProfile.reset();
    closeModal(newCardPopup);
    changeButtonText(newCardPopup, 'Создать');
  })
  .catch((err) => {
    console.log(`Ошибка добавления данных: ${err}`);
  })
  .finally(() => {
    changeButtonText(newCardPopup, 'Создать');
  });
};

formAddProfile.addEventListener('submit', handleFormAddCard);

// Редактирование аватара

function updateAvatar(evt) {
  evt.preventDefault();

  const avatarValue = avatarUrlInput.value;

  changeButtonText(avatarPopup, 'Сохранение...');

  getUserAvatar(avatarValue)
    .then((userInfo) => {
      avatarImage.style.backgroundImage = `url(${userInfo.avatar})`;
      console.log('Аватар пользователя обновлен:', userInfo);
      changeButtonText(avatarPopup, 'Сохранить');
    })  
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeButtonText(avatarPopup, 'Сохранить');
    });

  closeModal(avatarPopup);

  enableValidation(validationConfig);
}

formAvatar.addEventListener('submit', updateAvatar);

// Вызов функции валидации

enableValidation(validationConfig);

// Функция: при нажатии в попапе кнопки 'Сохранить' текст меняется на 'Сохранение...'

function changeButtonText(popup, text) {
  const submitButton = popup.querySelector('.popup__button');
  submitButton.textContent = text;
}

// Массив с информацией о пользователе, карточках и аватаре. Сохранение на сервере

const promises = [getUserInfo(), getCardsInfo()];

Promise.all(promises)
.then(([userInfo, cardsInfo]) => {

  const userId = userInfo._id;
  
  nameTitle.textContent = userInfo.name;
  jobTitle.textContent = userInfo.about;
  avatarImage.style.backgroundImage = `url(${userInfo.avatar})`;

  cardsInfo.forEach((card) => {
    const newCard = createCard(card, deleteCard, likeButton, openPopupImage, userId);
    cardList.append(newCard);
  });

  console.log({ userInfo, cardsInfo });
})
.catch((err) => {
  console.log(`Ошибка получения данных: ${err}`);
})
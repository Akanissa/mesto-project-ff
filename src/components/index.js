import { initialCards } from './cards.js';
import '../pages/index.css';
import { openModal, closeModal } from './modal.js';
import { likeButton, deleteCard, createCard } from './card.js';

// Переменные

const popups = document.querySelectorAll('.popup');
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

// Темплейт карточки

export const container = document.querySelector('#card-template').content;

// DOM узлы

const cardList = document.querySelector('.places__list');

// Вывести карточки на страницу

initialCards.forEach(function(item) {
  const card = createCard(item, deleteCard, likeButton, openPopupImage);
  cardList.append(card);
});

// Слушатели открытия модального окна

buttonEditProfile.addEventListener('click', function() {
  openModal(profilePopup);
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
});

buttonAddProfile.addEventListener('click', function() {
  openModal(newCardPopup);
});

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

  const newCard = createCard(card, deleteCard, likeButton, openPopupImage);

  cardList.prepend(newCard);

  formAddProfile.reset();
  closeModal(newCardPopup);
}

formAddProfile.addEventListener('submit', handleFormAddCard);

// Открытие модального окна с картинкой

function openPopupImage(item) {

  name.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  openModal(popupImage);
}
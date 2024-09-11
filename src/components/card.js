import { container } from './index.js';
import { deleteCardLike, addCardLike } from './api.js';

// Функция создания карточки

export function createCard(item, deleteCard, likeButton, openPopupImage, userId) {

  const card = container.querySelector('.card').cloneNode(true);
    
  const cardImage = card.querySelector('.card__image');
  card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardLikeCounter = card.querySelector('.card__like-counter');
  
  cardImage.src = item.link;
  card.alt = item.name;
  cardTitle.textContent = item.name;
    
  const deleteButton = card.querySelector('.card__delete-button');
  
  card.dataset.id = item._id;

  if (item.owner._id === userId) {                                // Если id пользователя и владельца карточки совпадают, то ее можно удалить 
    deleteButton.addEventListener('click', function() {
      deleteCard(item._id, card);
    });
  } else {                                                       // Если id пользователя и владельца карточки не совпадают, удаление недоступно
    deleteButton.style.display = 'none';
  }
    
  const cardLikeButton = card.querySelector('.card__like-button');

  if (item.likes) {
    cardLikeCounter.textContent = item.likes.length;              // Отображение нынешнего количества лайков
  } 
  
  if (item.likes.some(like => like._id === userId)) {              // Проверка на наличие нажатого лайка
    cardLikeButton.classList.add('card__like-button_is-active');
  } else {
    cardLikeCounter.textContent = item.likes.length;
  }

  cardLikeButton.addEventListener('click', function() {
    likeButton(cardLikeCounter, cardLikeButton, item);
  })

  cardImage.addEventListener('click', function() {
    openPopupImage(item);
  });
    
  return card;
}

// Добавление и удаление лайка у карточки

export const likeButton = function(cardLikeCounter, cardLikeButton, item) {

  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    deleteCardLike(item._id)
    .then((res) => {
      if (res) {
        cardLikeButton.classList.toggle('card__like-button_is-active');
       return cardLikeCounter.textContent = res.likes.length;
      }
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    addCardLike(item._id)
    .then((res) => {
      if (res) {
        cardLikeButton.classList.toggle('card__like-button_is-active');
        cardLikeCounter.textContent = res.likes.length;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
};
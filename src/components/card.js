import { container } from "./index.js";

// Функция создания карточки

export function createCard(item, deleteCard, likeButton, openPopupImage) {

  const card = container.querySelector('.card').cloneNode(true);
    
  const cardImage = card.querySelector('.card__image');
  card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  
  cardImage.src = item.link;
  card.alt = item.name;
  cardTitle.textContent = item.name;
    
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteCard(card);
  });
    
  const cardLikeButton = card.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', likeButton);
    
  cardImage.addEventListener('click', function() {
    openPopupImage(item);
  });
    
  return card;
}

// Функция удаления карточки

export function deleteCard(card) {
  card.remove();
}

// Лайк карточки

export function likeButton(evt) { 
  evt.target.classList.toggle('card__like-button_is-active');
}
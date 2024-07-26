// @todo: DOM узлы

const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(item, deleteCard) {

  const container = document.querySelector('#card-template').content;
  const card = container.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__image').alt = item.name;
  
  const cardTitle = card.querySelector('.card__title').textContent = item.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    deleteCard(card);
  });

  return card;
}

// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
  const card = createCard(item, deleteCard);
  cardList.append(card);
});
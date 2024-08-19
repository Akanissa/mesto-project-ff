// Открытие модального окна

export function openModal(item) {
  item.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
};

// Закрытие модального окна по кнопке Х

export function closeModal(item) {
  item.classList.remove('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
}

// Закрытие модального окна клавишей Esc

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
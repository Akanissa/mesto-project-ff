// Данные для API

const config = {
  cohort: 'https://nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: 'dbc8d628-1ef0-4991-a7d3-2138c077d5c9',
    'Content-Type': 'application/json'
  }
};

// Загрузка информации о пользователе с сервера

export const getUserInfo = function() {
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
};

// Обновление данных пользователя на сервере

export const updateUserInfo = function(name, about) {
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
};

// Загрузка карточек с сервера

export const getCardsInfo = function() {
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
};

// Добавление новой карточки на сервер

export const addNewCard = function(name, link) {
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
};

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
};
  
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
};

// Обновление аватара пользователя

export const getUserAvatar = function(avatar) {
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
};
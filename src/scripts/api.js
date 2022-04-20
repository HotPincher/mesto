import { serverConfig } from './data.js'

const validateResponce = res => { return res.ok ? res.json() : Promise.reject(`Промиса не будет ${res.status}`) }

const acquireUserData = () => {
  return fetch(`${serverConfig.baseUrl}/users/me`, {
    headers: serverConfig.headers,
  })
    .then(validateResponce)
}

const loadCards = () => {
  return fetch(`${serverConfig.baseUrl}/cards`, {
    headers: serverConfig.headers,
  })
    .then(validateResponce)
}

const changeProfileData = (pendingInputValue1, pendingInputValue2) => {
  return fetch(`${serverConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: serverConfig.headers,
    body: JSON.stringify({
      name: pendingInputValue1,
      about: pendingInputValue2
    })
  })
    .then(validateResponce)
}

const editAvatar = newAvatar => {
  return fetch(`${serverConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: serverConfig.headers,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
    .then(validateResponce)
}

const createCardElement = (cardLink, cardTitle) => {
  return fetch(`${serverConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: serverConfig.headers,
    body: JSON.stringify({
      name: cardTitle,
      link: cardLink,
    })
  })
    .then(validateResponce)
}

const removeCardElement = (elementId) => {
  return fetch(`${serverConfig.baseUrl}/cards/${elementId}`, {
    method: 'DELETE',
    headers: serverConfig.headers,
  })
    .then(validateResponce)
}

const createLikeElement = (elementId, isLike) => {
  return fetch(`${serverConfig.baseUrl}/cards/likes/${elementId}`, {
    method: !isLike ? 'PUT' : 'DELETE',
    headers: serverConfig.headers,
  })
    .then(validateResponce)
}

const acquireAllData = () => {
  return Promise.all([acquireUserData(), loadCards()])
}

export {
  validateResponce,
  acquireUserData,
  changeProfileData,
  editAvatar,
  loadCards,
  createCardElement,
  removeCardElement,
  createLikeElement,
  acquireAllData,
} 

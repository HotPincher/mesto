export default class Api {
  static serverConfig = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-8",
    headers: {
      "Authorization": "46fd1b2f-0142-4390-8d44-7cfab5387a15",
      "Content-Type": "application/json"
    }
  }

  constructor () {

  }

  validateResponce (res) { 
    return res.ok ? res.json() : Promise.reject(`Промиса не будет ${res.status}`) 
  }
  
  acquireUserData () {
    return fetch(`${Api.serverConfig.baseUrl}/users/me`, {
      headers: Api.serverConfig.headers,
    })
      .then(this.validateResponce)
  }
  
  loadCards () {
    return fetch(`${Api.serverConfig.baseUrl}/cards`, {
      headers: Api.serverConfig.headers,
    })
      .then(this.validateResponce)
  }
  
  changeProfileData = (pendingInputValue1, pendingInputValue2) => {
  return fetch(`${Api.serverConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: Api.serverConfig.headers,
    body: JSON.stringify({
      name: pendingInputValue1,
      about: pendingInputValue2
    })
  })
    .then(this.validateResponce)
  }
  
  editAvatar (newAvatar) {
  return fetch(`${Api.serverConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: Api.serverConfig.headers,
    body: JSON.stringify({
    avatar: newAvatar
    })
  })
    .then(this.validateResponce)
  }
  
  createCardElement (cardLink, cardTitle) {
  return fetch(`${Api.serverConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: Api.serverConfig.headers,
    body: JSON.stringify({
      name: cardTitle,
      link: cardLink,
    })
  })
    .then(this.validateResponce)
  }
  
  removeCardElement (elementId) {
  return fetch(`${Api.serverConfig.baseUrl}/cards/${elementId}`, {
    method: 'DELETE',
    headers: Api.serverConfig.headers,
  })
    .then(this.validateResponce)
  } 

  createLikeElement (elementId, isLike) {
    return fetch(`${Api.serverConfig.baseUrl}/cards/likes/${elementId}`, {
      method: !isLike ? 'PUT' : 'DELETE',
      headers: Api.serverConfig.headers,
    })
      .then(this.validateResponce)
  }

  acquireAllData () {
  return Promise.all([this.acquireUserData(), this.loadCards()])
  }
}

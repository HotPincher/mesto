export default class Api {

  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  validateResponce(res) {
    return res.ok ? res.json() : Promise.reject(`Промиса не будет ${res.status}`)
  }

  acquireUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this.validateResponce)
  }

  loadCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this.validateResponce)
  }

  changeProfileData = (userName, userJob) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userJob
      })
    })
      .then(this.validateResponce)
  }

  editAvatar(newAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
      .then(this.validateResponce)
  }

  createCardElement(cardTitle, cardLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardTitle,
        link: cardLink,
      })
    })
      .then(this.validateResponce)
  }

  removeCardElement(elementId) {
    return fetch(`${this._baseUrl}/cards/${elementId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this.validateResponce)
  }

  createLikeElement(elementId) {
    return fetch(`${this._baseUrl}/cards/likes/${elementId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this.validateResponce)
  }

  removeLikeElement(elementId) {
    return fetch(`${this._baseUrl}/cards/likes/${elementId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this.validateResponce)
  }

  acquireAllData() {
    return Promise.all([this.acquireUserData(), this.loadCards()])
  }
}

import { activatePopup } from './popup.js'
import { bigPicturePopup, bigPicturePopupImage, bigPicturePopupSpan } from './data.js'
import { api, userId } from '../index.js'
export default class Card {
  constructor({ data }, selector) {
    this._selector = selector
    this._likes = data.likes
    this._image = data.link
    this._heading = data.name
    this._ownerId = data.owner._id;
    this._cardId = data._id;
  }

  _getItem() {
    const cardCreator = document
      .querySelector(this._selector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true)

    return cardCreator
  }

  createNode() {
    this._card = this._getItem()
    this._cardImage = this._card.querySelector('.elements__image')
    this._cardHeading = this._card.querySelector('.elements__heading')
    this._likeCounter = this._card.querySelector('.elements__like-counter')
    this._likeButton = this._card.querySelector('.elements__like-button')
    this._deleteButton = this._card.querySelector('.elements__delete-button')
    this._cardImage.src = this._image;
    this._cardImage.alt = this._heading;
    this._cardHeading.textContent = this._heading;
    this._likeCounter.textContent = this._likes.length
    this._renderLiked()
    this._renderDelete()
    this._setEventListeners()

    return this._card
  }

  _activatePopup() {
    bigPicturePopupImage.src = this._image
    bigPicturePopupImage.alt = this._heading
    bigPicturePopupSpan.textContent = this._heading
    activatePopup(bigPicturePopup)
  }

  _handleImageClick() {
    this._activatePopup()
  }

  _isLikedByMe() {
    return this._likes.some((like) => like._id === userId)
  }

  _renderLiked() {
    if (this._isLikedByMe()) {
      this._likeButton.classList.add('elements__like-button_active')
    }
  }

  _putLike() {

    api.createLikeElement(this._cardId)

      .then((data) => {
        this._likeCounter.textContent = data.likes.length
      })
      .then(() => {
        this._likeButton.classList.toggle('elements__like-button_active')
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  }

  _removeLike() {

    api.removeLikeElement(this._cardId)

      .then((data) => {
        this._likeCounter.textContent = data.likes.length
      })
      .then(() => {
        this._likeButton.classList.toggle('elements__like-button_active')
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  }

  _handleLikeClick(evt) {
    if (evt.target.classList.contains("elements__like-button_active")) {
      this._removeLike()
    } else {
      this._putLike()
    }
  }

  _canDelete() {
    return userId !== this._ownerId
  }

  _renderDelete() {
    if (this._canDelete()) {
      this._deleteButton.remove()
    }
  }

  _handleDeleteClick() {

    api.removeCardElement(this._cardId)

      .then(() => {
        this._renderDelete()
      })
      .then(() => {
        this._card.remove()
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  }

  _setEventListeners() {

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });

    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeClick(evt)
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });
  }

}

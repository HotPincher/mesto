
import { api, userId } from '../index.js'
import PopupWithImage from './PopupWithImage.js'
import Popup from './Popup.js'
export default class Card {
  constructor({ data }, selector) {
    this._data = data
    this._selector = selector
    this._userId = userId
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

  _handleImageClick() {
    const bitPicturePopup = new PopupWithImage(Popup.popupselectors.popupBigPicture)
    bitPicturePopup.setEventListeners()
    bitPicturePopup.activatePopup(this._data)
  }

  _isLikedByMe() {
    return this._likes.some(like => like._id === this._userId)
  }

  _renderLiked() {
    if (this._isLikedByMe()) {
      this._likeButton.classList.add('elements__like-button_active')
    }
  }

  _putLike() {

    api.createLikeElement(this._cardId)

      .then((data) => {
        this._likes = data.likes
        this._likeCounter.innerText = data.likes.length
      })
      .then(() => {
        this._likeButton.classList.add('elements__like-button_active')
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  }

  _removeLike() {

    api.removeLikeElement(this._cardId)

      .then((data) => {
        this._likes = data.likes
        this._likeCounter.innerText = data.likes.length
      })
      .then(() => {
        this._likeButton.classList.remove('elements__like-button_active')
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  }

  _handleLikeClick() {
    if (this._isLikedByMe()) {
      this._removeLike()
    } else {
      this._putLike()
    }
  }

  _canDelete() {
    return this._userId !== this._ownerId
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

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick()
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });
  }

}

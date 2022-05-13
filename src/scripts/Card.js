import { activatePopup } from './popup.js'
import { bigPicturePopup, bigPicturePopupImage, bigPicturePopupSpan} from './data.js'
export default class Card {
  constructor ({data}, selector) {
    this._selector = selector
    this._image = data.src
    this._heading = data.text
    this._likes = data.likes  
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

    this._setEventListeners()

    return this._card
    
  }

  _activatePopup () {
    bigPicturePopupImage.src = this._image
    bigPicturePopupImage.alt = this._heading
    bigPicturePopupSpan.textContent = this._heading
    activatePopup(bigPicturePopup)
  }

  _isLiked () {
    return this._likeButton.classList.contains('elements__like-button_active')
    // return this._likes.some(like => like._id === this.userId)
  }

  _handleImageClick() {
    this._activatePopup()
  }

  _updateLikes() {  
    if (!this._isLiked()) {
      this._likeButton.classList.add('elements__like-button_active')
    } else {
      this._likeButton.classList.remove('elements__like-button_active')
    }
  }
  
  _handleLikeClick(isLike) {
    
    // createLikeElement(this._cardId, isLike)
    
    // .then((dataCards) => {
        this._updateLikes()
      // })
      // .catch((err) => {
      //   console.log('Ошибка: ', err);
      // })
  }

  _canDelete () {
    return this.userId !== this._ownerId
  }

  _updateDelete () {
    if (this._canDelete()) {
      this._deleteButton.remove()
    }
  }

  _handleDeleteClick() {

    removeCardElement(this._cardId, elementId)
      .then(() => {
        this._updateDelete(cardElement, this._cardId, elementId)
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

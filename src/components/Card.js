export default class Card {

  constructor({ data }, config, selector, api, userInfo) {
    this._data = data
    this._config = config
    this._selector = selector
    this._userId = userInfo._userId
    this._likes = data.likes
    this._image = data.link
    this._heading = data.name
    this._ownerId = data.owner._id
    this._cardId = data._id
    this._api = api
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
    this._cardImage = this._card.querySelector(this._config.cardImageSelector)
    this._cardHeading = this._card.querySelector(this._config.cardHeadingSelector)
    this._likeCounter = this._card.querySelector(this._config.likeCounterSelector)
    this._likeButton = this._card.querySelector(this._config.likeButtonSelector)
    this._deleteButton = this._card.querySelector(this._config.deleteButtonSelector)
    this._cardImage.src = this._image;
    this._cardImage.alt = this._heading;
    this._cardHeading.textContent = this._heading
    this._likeCounter.textContent = this._likes.length
    this._renderLiked()
    this._renderDelete()
    this._setEventListeners()

    return this._card
  }

  _handleImageClick(popup) {
    popup.setEventListeners()
    popup.activatePopup(this._data)
  }

  _isLikedByMe() {
    return this._likes.some(like => like._id === this._userId)
  }

  _renderLiked() {
    if (this._isLikedByMe()) {
      this._likeButton.classList.add(this._config.likeButtonActiveState)
    }
  }

  _putLike() {

    this._api.createLikeElement(this._cardId)

      .then((data) => {
        this._likes = data.likes
        this._likeCounter.innerText = data.likes.length
      })
      .then(() => {
        this._likeButton.classList.add(this._config.likeButtonActiveState)
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  }

  _removeLike() {

    this._api.removeLikeElement(this._cardId)

      .then((data) => {
        this._likes = data.likes
        this._likeCounter.innerText = data.likes.length
      })
      .then(() => {
        this._likeButton.classList.remove(this._config.likeButtonActiveState)
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

    this._api.removeCardElement(this._cardId)

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

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick()
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });
  }
}

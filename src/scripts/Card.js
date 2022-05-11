export default class Card {
  constructor(data, selector, { handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._data = data;
    this._userId = data.userId; 
    this._cardContainer = document.querySelector(selector);
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getElementCard() {
    const cardCreator = this._cardContainer
      .content
      .querySelector(this.querySelector('.elements__item'))
      .cloneNode(true);

    return cardCreator;
  }

  _isLiked (cardLikes) {
    return cardLikes.some(like => like._id === this._userId)
  }
  
  _canDelete () {
    return this._userId !== this.ownerId
  }
  
  
  _updateLikes (cardLikes) {
    const cardLikeToggler = this.cardCreator.querySelector('.elements__like-button')
    const cardLikeCounter = this.cardCreator.querySelector('.elements__like-counter')
    cardLikeCounter.textContent = cardLikes.length
  
    if (this._isLiked(this._data.likes)) {
      cardLikeToggler.classList.add('elements__like-button_active')
    } else {
      cardLikeToggler.classList.remove('elements__like-button_active')
    }
  }
  
  
  _updateDelete () {
  const cardRemover = this.cardCreator.querySelector('#elements__delete-button-template')
  if (canDelete(this._userId, this.ownerId)) {
    cardRemover.remove()
  }
}

  renderElementCard() {
    this._element = this._getElementCard();

    this._image = this._element.querySelector(this.querySelector('.elements__image'));
    this._heading = this._element.querySelector(this.querySelector('.elements__heading'));
    this._likeCounter = this._element.querySelector(this.querySelector('.elements__like-counter'));
    this._likeButton = this._element.querySelector(this.querySelector('.elements__like-button'));
    this._deleteButton = this._element.querySelector(this.querySelector('.elements__delete-button'))


    this._image.src = `${this._data.link}`;
    this._image.alt = `${this._data.name}`;
    this._image.dataset.id = this._data._id;
    this._heading.textContent = `${this._data.name}`;
    this._likeCounter.textContent = `${this._data.likes.length}`;
    this.ownerId = this._data.ownerId;

    _setEventListeners() {
      this._image.addEventListener('click', () => {
      this.bigPicturePopupImage.src = `${this._data.link}`;
      this.bigPicturePopupImage.alt = `${this._data.name}`;
      this.bigPicturePopupSpan.textContent = cardTitle;
      this.bigPicturePopupImage.onerror = () => { this.bigPicturePopupImage.src = errorImage };
      activatePopup(bigPicturePopup);
  
        this._handleCardClick(this._data);
      })
  
      this._deleteButton.addEventListener('click', function () {

      });
  
      this._likeButton.addEventListener('click', function () {

      })
    }



    return this._element;
  }
};
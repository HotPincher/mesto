export default class Popup {
  static popupSelectors = {
    popupAvatar: '#avatarEditPopup',
    popupAccount: '#profileEditPopup',
    popupNewCard: '#newCardPopup',
    popupBigPicture: '#big-picture-popup'
  }

  constructor (selector) {
    this._popup = document.querySelector(selector);
    this._btnClose = this._popup.querySelector('.popup__close-button');
  }

  activatePopup () {
    this._popup.classList.remove('popup_closed')
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._removePopupByEsc)
  }


  removePopup () {
    this._popup.classList.add('popup_closed')
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._removePopupByEsc)
  }

  _removePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.removePopup();
    }
  }

  setEventListeners() {
    this._btnClose.addEventListener ('click', () => {
      this.removePopup();
    } )
    this._popup.addEventListener('mousedown', () => {
        this.removePopup();
    })
  }
}






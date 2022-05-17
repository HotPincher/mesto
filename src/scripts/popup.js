import { enableValidation } from './FormValidator.js'
import { validationSettings } from './data.js'
export default class Popup {
  
  constructor(selector) {
    this._popup = document.querySelector(selector)
    this._popupCloseButton = document.querySelector('.popup__close-button')
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
      this.removePopup()
    }
  }

  setEventListeners () {
    this._popupCloseButton.addEventListener('click', () => {
      this.removePopup()
    })
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      this.removePopup()
      }
    })
  }
}

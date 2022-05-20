export default class Popup {
  
  constructor(selector) {
    this._popup = document.querySelector(selector)
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
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__structure-wrapper') || evt.target.classList.contains('popup__close-button')) 
      {this.removePopup()
      }
    })
  }
}

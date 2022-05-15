
import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)

    this._image = this._popup.querySelector('.big-picture__image')
    this._description = this._popup.querySelector('.big-picture__tag')
  }

  activatePopup(data) {
    super.activatePopup()
    this._image.src = data.link;
    this._image.alt = data.name;
    this._description.textContent = data.name;
  }

  removePopup() {
    super.removePopup()
  }

  _removePopupByEsc() {
    super._removePopupByEsc()
  }
}
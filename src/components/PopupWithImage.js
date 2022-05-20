import Popup from "./Popup.js"
export default class PopupWithImage extends Popup {
  
  constructor(selector, config) {
    super(selector)
    this._config = config
    this._image = this._popup.querySelector(this._config.bigPicturePopupImageSelector)
    this._description = this._popup.querySelector(this._config.bigPicturePopupSpanSelector)
  }

  activatePopup(link, name) {
    super.activatePopup()
    this._image.src = link;
    this._image.alt = name;
    this._description.textContent = name;
  }
}
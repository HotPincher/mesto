import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
  constructor(selector, formType) {
    super(selector)
    this._formType = formType;
    this._form = this._popup.querySelector('.credentials');
    this._formInput = {};
    this._inputList = [...this._form];
  }

  _getInputValues() {
    this._inputList.forEach(element => {
      this._formInput[element.name] = element.value;
    });
  }

  putInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
      console.log(data[input.name])
    });
  }

  activatePopup() {
    super.activatePopup()
  }

  removePopup() {
    super.removePopup()
  }

  _removePopupByEsc() {
    super._removePopupByEsc()
  }

  _renderLoading(text) {
    if (this.isLoading) {
      this._popup.querySelector('.credentials__submit-button').innerText = text
    } else {
      this._popup.querySelector('.credentials__submit-button').innerText = text
    }
  }

  setEventListeners() {

    super.setEventListeners()

    this._form.addEventListener('submit', (evt) => {

      this._renderLoading("Сохранение...")

      this._formType(this._getInputValues())

        .then(() => {
          this.removePopup()
        })
        .catch((err) => {
          console.log('Ошибка: ', err);
        })
        .finally(() => {
          this._renderLoading("Сохранить")
        })
    })
  }
}
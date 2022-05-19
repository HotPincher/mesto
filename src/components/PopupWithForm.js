import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
  
  constructor(selector, handleSubmit) {
    super(selector)
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.credentials');
    this._formInput = {};
    this._inputList = [...this._form];
    this._submitButton = this._popup.querySelector('.credentials__submit-button')
  }

  _getInputValues() {
    this._inputList.forEach(element => {
     this._formInput[element.name] = element.value;
    });
    return this._formInput
  }

  removePopup() {
    super.removePopup()
    this._form.reset()
  }

  _renderLoading(text) {
    this._submitButton.innerText = text
  }

  setEventListeners(text) {

    super.setEventListeners()

    this._form.addEventListener('submit', (evt) => {

      this._renderLoading("Сохранение...")

      this._handleSubmit(this._getInputValues())

        .then(() => {
          this.removePopup()
        })
        .catch((err) => {
          console.log('Ошибка: ', err);
        })
        .finally(() => {
          this._renderLoading(text)
        })
    })
  }
}
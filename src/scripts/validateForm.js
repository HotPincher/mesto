export default class FormValidator {
  constructor (validationSettings, formElement) {
    this._config = validationSettings;
    this._formElement = formElement;
    this._formFieldList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  } 

  disableSubmit() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  disableAllErrors() {
    this._formFieldList.forEach((formField) => {
      const inputElement = formField.querySelector(this._config.inputSelector);
      this._hideInputError(inputElement);
    })
  }

  _showInputError = (credentialsInput, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${credentialsInput.id}-error`);
    credentialsInput.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.remove(this._config.inputErrorHiddenClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.add(this._config.inputErrorHiddenClass);
  };

  _validateForm = (credentialsInput) => {
    if (!credentialsInput.validity.valid) {
      this._showInputError(credentialsInput, credentialsInput.validationMessage);
    } else {
      this._hideInputError(credentialsInput);
    }
  };


  _checkValidity (inputList) {
    return inputList.some((credentialsInput) => {
      return !credentialsInput.validity.valid;
    })
  }


  _toggleSubmit() {
    if (this._checkValidity(this._inputList)) {
      this.disableSubmit();
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }



  _setEventListeners = () => {
    this.disableSubmit();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._validateForm(inputElement);
        this._toggleSubmit();
      });
    });
  };


  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

}


/*
const resetPopup = (formElement) => {
  formElement.reset()
  formElement.querySelectorAll(validationSettings.inputSelector).forEach(item => {
    if (item.classList.contains(validationSettings.inputErrorClass)) {
      item.classList.remove(validationSettings.inputErrorClass)
    }
  })
  formElement.querySelectorAll(validationSettings.inputErrorSelector).forEach(item => {
    item.classList.add(validationSettings.inputErrorHiddenClass)
    item.textContent = " "
  })
}
*/

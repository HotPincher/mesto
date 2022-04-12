import { validationSettings } from "./data.js"

const showInputError = (formSet, credentialsInput, errorMessage) => {
  const errorElement = formSet.querySelector(`.${credentialsInput.id}-error`)
  credentialsInput.classList.add(validationSettings.inputErrorClass)
  errorElement.classList.remove(validationSettings.inputErrorHiddenClass)
  errorElement.textContent = errorMessage
}

const hideInputError = (formSet, credentialsInput) => {
  const errorElement = formSet.querySelector(`.${credentialsInput.id}-error`)
  credentialsInput.classList.remove(validationSettings.inputErrorClass)
  errorElement.classList.add(validationSettings.inputErrorHiddenClass)
  errorElement.textContent = " "
}

const validateForm = (formSet, credentialsInput) => {
  if (!credentialsInput.validity.valid) {
    showInputError(formSet, credentialsInput, credentialsInput.validationMessage)
  } else {
    hideInputError(formSet, credentialsInput)
  }
}

const checkValidity = (inputList) => {
  return inputList.some(credentialsInput => {
    return !credentialsInput.validity.valid
  })
}

const toggleSubmit = (inputList, buttonElement) => {
  if (checkValidity(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass)
    buttonElement.setAttribute('disabled', 'true')
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass)
    buttonElement.removeAttribute('disabled', 'true')
  }
}

const setEventListener = (formSet) => {
  const inputItems = Array.from(formSet.querySelectorAll(validationSettings.inputSelector))
  const buttonElement = formSet.querySelector(validationSettings.submitButtonSelector)
  toggleSubmit(inputItems, buttonElement)
  inputItems.forEach(credentialsInput => {
    credentialsInput.addEventListener('input', () => {
      validateForm(formSet, credentialsInput)
      toggleSubmit(inputItems, buttonElement)
    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach(formSet => {
    formSet.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formSet, validationSettings);
  });

}
enableValidation(validationSettings)

export { enableValidation } 
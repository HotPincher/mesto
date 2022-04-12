import { validationSettings } from "./data.js"

const showInputError = (formSet, credentialsInput, errorMessage, config) => {
  const errorElement = formSet.querySelector(`.${credentialsInput.id}-error`)
  credentialsInput.classList.add(config.inputErrorClass)
  errorElement.classList.remove(config.inputErrorHiddenClass)
  errorElement.textContent = errorMessage
}

const hideInputError = (formSet, credentialsInput, config) => {
  const errorElement = formSet.querySelector(`.${credentialsInput.id}-error`)
  credentialsInput.classList.remove(config.inputErrorClass)
  errorElement.classList.add(config.inputErrorHiddenClass)
  errorElement.textContent = " "
}

const validateForm = (formSet, credentialsInput, config) => {
  if (!credentialsInput.validity.valid) {
    showInputError(formSet, credentialsInput, credentialsInput.validationMessage, config)
  } else {
    hideInputError(formSet, credentialsInput, config)
  }
}

const checkValidity = (inputList) => {
  return inputList.some(credentialsInput => {
    return !credentialsInput.validity.valid
  })
}

const toggleSubmit = (inputList, buttonElement, config) => {
  if (checkValidity(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    buttonElement.setAttribute('disabled', 'true')
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass)
    buttonElement.removeAttribute('disabled', 'true')
  }
}

const setEventListener = (formSet, config) => {
  const inputItems = Array.from(formSet.querySelectorAll(config.inputSelector))
  const buttonElement = formSet.querySelector(config.submitButtonSelector)
  toggleSubmit(inputItems, buttonElement, config)
  inputItems.forEach(credentialsInput => {
    credentialsInput.addEventListener('input', () => {
      validateForm(formSet, credentialsInput, config)
      toggleSubmit(inputItems, buttonElement, config)
    })
  })
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  console.log(config.formSelector)
  formList.forEach(formSet => {
    formSet.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formSet, config);
  });

}
enableValidation(validationSettings)

export { enableValidation }

  const formValidate = (formSet, credentialsInput) => {

    if (!credentialsInput.validity.valid) {

      showInputError(formSet, credentialsInput, credentialsInput.validationMessage)
    } else if (credentialsInput.validity.valid) {

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
      buttonElement.classList.add('credentials__submit-button_disabled')
      buttonElement.setAttribute('disabled', 'true')
    } else {
      buttonElement.classList.remove('credentials__submit-button_disabled')
      buttonElement.removeAttribute('disabled', 'true')
    }
  }

  const showInputError = (formSet, credentialsInput, errorMessage) => {
    const errorElement = formSet.querySelector(`.${credentialsInput.id}-error`)
    credentialsInput.classList.add('credentials__user-input_invalid')
    errorElement.classList.remove('credentials__input-error_hidden')
    errorElement.textContent = errorMessage
  }

  const hideInputError = (formSet, credentialsInput) => {
    const errorElement = formSet.querySelector(`.${credentialsInput.id}-error`)
    credentialsInput.classList.remove('credentials__user-input_invalid')
    errorElement.classList.add('credentials__input-error_hidden')
    errorElement.textContent = " "
  }

  const setEventListener = (formSet) => {
    const inputItems = Array.from(formSet.querySelectorAll('.credentials__user-input'))
    const buttonElement = formSet.querySelector('.credentials__submit-button')
    toggleSubmit(inputItems, buttonElement)
    inputItems.forEach(credentialsInput => {
      credentialsInput.addEventListener('input', () => {
        formValidate(formSet, credentialsInput)
        toggleSubmit(inputItems, buttonElement)
      })
    })
  }

  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.credentials'));
    formList.forEach(formSet => {
      formSet.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListener(formSet);
    });
  }
  enableValidation()


export { enableValidation } 
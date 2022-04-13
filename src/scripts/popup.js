import { enableValidation } from './validateForm.js'

const activatePopup = popup => {
  popup.classList.remove('popup_closed')
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', removePopupByEsc)
}

const removePopup = popup => {
  popup.classList.add('popup_closed')
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', removePopupByEsc)
}

const removePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    removePopup(openedPopup)
  }
}  

const resetPopup = (formElement) => {
  formElement.reset()
  formElement.querySelectorAll('.credentials__user-input').forEach(item => {
    if(item.classList.contains('credentials__user-input_invalid')) {
      item.classList.remove('credentials__user-input_invalid')
    }
  })
  formElement.querySelectorAll('.credentials__input-error').forEach(item => {
      item.classList.add('credentials__input-error_hidden')
      item.textContent = " "
  })
}

const disableSubmit = (submitElement) => {
  submitElement.querySelector('.credentials__submit-button').classList.add('credentials__submit-button_disabled');
  submitElement.querySelector('.credentials__submit-button').setAttribute('disabled', 'true')
}

export {activatePopup, removePopup, resetPopup, removePopupByEsc, disableSubmit}
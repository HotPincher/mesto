import { enableValidation } from './validateForm.js'

const activatePopup = popup => {
  popup.classList.remove('popup_animation-out')
  popup.classList.add('popup_animation-on')
  enableValidation()
  document.addEventListener('keydown', removePopupByEsc)
  document.addEventListener('click', removePopupByOverlay)
}

const removePopup = popup => {
  popup.classList.remove('popup_animation-on')
  popup.classList.add('popup_animation-out')
  document.removeEventListener('keydown', removePopupByEsc)
  document.removeEventListener('click', removePopupByOverlay)
}

const removePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_animation-on')
    removePopup(openedPopup)
  }
}  

const removePopupByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_animation-on')) {
    const openedPopup = document.querySelector('.popup_animation-on')
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

export {activatePopup, removePopup, removePopupByEsc, removePopupByOverlay, resetPopup}
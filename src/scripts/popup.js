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

export { activatePopup, removePopup, removePopupByEsc }
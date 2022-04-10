import {  profileNewCardFormCredentials} from './data.js'



const activatePopup = popup => {
  popup.classList.remove('popup_animation-out')
  popup.classList.add('popup_animation-on')
}

const removePopup = popup => {
  popup.classList.remove('popup_animation-on')
  popup.classList.add('popup_animation-out')
}

const zeroPopup = () => {
  profileNewCardFormCredentials.reset()
  document.querySelectorAll('.credentials__user-input').forEach(item => {
    if(item.classList.contains('credentials__user-input_invalid')) {
      item.classList.remove('credentials__user-input_invalid')
    }
  })
  document.querySelectorAll('.credentials__input-error').forEach(item => {
      item.classList.add('credentials__input-error_hidden')
      item.textContent = " "
  })
}

export {activatePopup, removePopup, zeroPopup}
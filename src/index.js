import './styles/index.css';
import { renderElements, addCard } from './scripts/renderCard.js'
import { activatePopup, disableSubmit, removePopup, resetPopup } from './scripts/popup.js'
import {
  currentAccountName,
  currentAccountProfession,
  profileEditButton,
  avatarEditButton,
  newCardCreatorButton,
  popupAccountEditModifier,
  popupAvatarEditModifier,
  popupAccountNewCardModifier,
  popupRemovers,
  profileEditFormCredentials,
  profileAvatarEditFormCredentials,
  profileNewCardFormCredentials,
  profileEditFormInitialValue1,
  profileEditFormInitialValue2,
  newCardPlace,
  newCardUrl,
  avatarUrl,
  avatarImage,
} from './scripts/data.js'

(function () {
  profileEditButton.addEventListener('click', () => {
    activatePopup(popupAccountEditModifier)
    disableSubmit(popupAccountEditModifier)
    resetPopup(profileEditFormCredentials)
    profileEditFormInitialValue1.setAttribute('value', currentAccountName.textContent)
    profileEditFormInitialValue2.setAttribute('value', currentAccountProfession.textContent)
  })

  profileEditFormCredentials.addEventListener('submit', evt => {
    evt.preventDefault()
    const pendingInputValue1 = evt.target.querySelector('#name-input').value
    currentAccountName.textContent = pendingInputValue1
    const pendingInputValue2 = evt.target.querySelector('#description-input').value
    currentAccountProfession.textContent = pendingInputValue2
    removePopup(popupAccountEditModifier)
  })

  avatarEditButton.addEventListener('mouseover', function (evt) {
    evt.target.closest('.profile__avatar-swapper').classList.add('profile__avatar-swapper_active')
    document.querySelector('.profile__avatar-swapper-icon').classList.add('profile__avatar-swapper-icon_active')
  })

  avatarEditButton.addEventListener('mouseout', function (evt) {
    evt.target.closest('.profile__avatar-swapper').classList.remove('profile__avatar-swapper_active')
    document.querySelector('.profile__avatar-swapper-icon').classList.remove('profile__avatar-swapper-icon_active')
  })

  avatarEditButton.addEventListener('click', () => {
    activatePopup(popupAvatarEditModifier)
    disableSubmit(popupAvatarEditModifier)
    resetPopup(profileAvatarEditFormCredentials)
  })

  profileAvatarEditFormCredentials.addEventListener('submit', evt => {
    evt.preventDefault()
    const newAvatar = { url: `${avatarUrl.value}` }
    avatarImage.style.backgroundImage = `url(${newAvatar.url})`;
    removePopup(popupAvatarEditModifier)
  })

  newCardCreatorButton.addEventListener('click', () => {
    activatePopup(popupAccountNewCardModifier)
    disableSubmit(popupAccountNewCardModifier)
    resetPopup(profileNewCardFormCredentials)
  })

  profileNewCardFormCredentials.addEventListener('submit', evt => {
    evt.preventDefault()
    const newCard = { title: `${newCardPlace.value}`, link: `${newCardUrl.value}` }
    addCard(newCard)
    removePopup(popupAccountNewCardModifier)
  })

  popupRemovers.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        removePopup(popup)
      }
    })
  })
  renderElements()
})()

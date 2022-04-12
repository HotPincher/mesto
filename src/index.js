import './styles/index.css';
import { enableValidation } from './scripts/validateForm.js'
import { renderElements, addCard } from './scripts/renderCard.js'
import { activatePopup, removePopup, removePopupByOverlay, resetPopup } from './scripts/popup.js'
import {
  cardContentTitles,
  currentAccountName,
  currentAccountProfession,
  profileEditButton,
  avatarEditButton,
  newCardCreatorButton,
  popupAccountEditModifier,
  popupAvatarEditModifier,
  popupAccountNewCardModifier,
  bigPicturePopup,
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

  popupAccountEditModifier.querySelector('.popup__close-button').addEventListener('click', () => {
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
    resetPopup(profileAvatarEditFormCredentials)
  })


  profileAvatarEditFormCredentials.addEventListener('submit', evt => {
    evt.preventDefault()
    const newAvatar = { url: `${avatarUrl.value}` }
    avatarImage.style.backgroundImage = `url(${newAvatar.url})`;
    removePopup(popupAvatarEditModifier)
  })

  popupAvatarEditModifier.querySelector('.popup__close-button').addEventListener('click', () => {
    removePopup(popupAvatarEditModifier)
  })

  newCardCreatorButton.addEventListener('click', () => {
    activatePopup(popupAccountNewCardModifier)
    resetPopup(profileNewCardFormCredentials)
  })

  profileNewCardFormCredentials.addEventListener('submit', evt => {
    evt.preventDefault()
    const newCard = { title: `${newCardPlace.value}`, link: `${newCardUrl.value}` }
    addCard(newCard)
    removePopup(popupAccountNewCardModifier)
  })

  popupAccountNewCardModifier.querySelector('.popup__close-button').addEventListener('click', () => {
    removePopup(popupAccountNewCardModifier)
  })

  bigPicturePopup.querySelector('.popup__close-button').addEventListener('click', () => {
    removePopup(bigPicturePopup)
  })

  enableValidation()
  renderElements()
})()

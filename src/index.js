import './styles/index.css';

import { enableValidation } from './scripts/validateForm.js'
import { renderElements, addCard } from './scripts/renderCard.js'
import { activatePopup, removePopup, zeroPopup } from './scripts/popup.js'
import {
  cardContentTitles,
  popupTitle,
  popupFormPlaceholder,
  currentAccountName,
  currentAccountProfession,
  profileEditButton,
  avatarEditButton,
  newCardCreatorButton,
  popupAccountEditModifier,
  popupEditAccountFormTitleCurrent,
  popupAvatarEditModifier,
  popupAvatarFormTitleCurrent,
  popupAccountNewCardModifier,
  popupNewCardFormTitleCurrent,
  bigPicturePopup,
  profileEditFormCredentials,
  profileAvatarEditFormCredentials,
  profileNewCardFormCredentials,
  profileEditFormInitialValue1,
  profileEditFormInitialValue2,
  newCardPlace,
  newCardUrl,
  avatarUrl,
} from './scripts/data.js'



(function () {
  profileEditButton.addEventListener('click', () => {
    activatePopup(popupAccountEditModifier)
    popupEditAccountFormTitleCurrent.textContent = popupTitle[0]
    profileEditFormInitialValue1.setAttribute('value', currentAccountName.textContent)
    profileEditFormInitialValue2.setAttribute('value', currentAccountProfession.textContent)
    profileEditFormInitialValue1.setAttribute('placeholder', popupFormPlaceholder[0]['inputOne'])
    profileEditFormInitialValue2.setAttribute('placeholder', popupFormPlaceholder[0]['inputTwo'])
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        removePopup(popupAccountEditModifier)
      }
    })
    popupAccountEditModifier.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup'))
        removePopup(popupAccountEditModifier)
    })
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
    popupAvatarFormTitleCurrent.textContent = popupTitle[2]
    avatarUrl.setAttribute('placeholder', popupFormPlaceholder[2]['inputOne'])
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        removePopup(popupAvatarEditModifier)
        zeroPopup()
      }
    })
    popupAvatarEditModifier.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup'))
        removePopup(popupAvatarEditModifier)
    })
    zeroPopup()
  })


  profileAvatarEditFormCredentials.addEventListener('submit', evt => {
    evt.preventDefault()
    const avatarSourceTemp = []
    avatarSourceTemp.push(`${avatarUrl.value}`)
    const avatarSource = avatarSourceTemp.pop()
    document.querySelector('.profile__avatar-overlay').style.backgroundImage = `url(${avatarSource})`;
    removePopup(popupAvatarEditModifier)
    profileAvatarEditFormCredentials.reset()
  })


  popupAvatarEditModifier.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      removePopup(popupAvatarEditModifier)
      zeroPopup()
      profileAvatarEditFormCredentials.reset()
    }
  })

  popupAvatarEditModifier.querySelector('.popup__close-button').addEventListener('click', () => {
    removePopup(popupAvatarEditModifier)
    profileAvatarEditFormCredentials.reset()
  })

  newCardCreatorButton.addEventListener('click', () => {
    activatePopup(popupAccountNewCardModifier)
    popupNewCardFormTitleCurrent.textContent = popupTitle[1]
    newCardPlace.setAttribute('placeholder', popupFormPlaceholder[1]['inputOne'])
    newCardUrl.setAttribute('placeholder', popupFormPlaceholder[1]['inputTwo'])
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        removePopup(popupAccountNewCardModifier)
        zeroPopup()
      }
    })
    popupAccountNewCardModifier.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup'))
        removePopup(popupAccountNewCardModifier)
    })
    zeroPopup()
  })

  profileNewCardFormCredentials.addEventListener('submit', evt => {
    evt.preventDefault()
    cardContentTitles.push({ title: `${newCardPlace.value}`, link: `${newCardUrl.value}` })
    const lastInputCredentials = cardContentTitles.pop()
    addCard(lastInputCredentials)
    removePopup(popupAccountNewCardModifier)
    profileNewCardFormCredentials.reset()
  })
  
  document.onerror = function () {
    document.querySelector('.elements__image').setAttribute('src', './src/images/no-image.jpg')
  }

  popupAccountNewCardModifier.querySelector('.popup__close-button').addEventListener('click', () => {
    removePopup(popupAccountNewCardModifier)
    zeroPopup()
  })

  bigPicturePopup.querySelector('.popup__close-button').addEventListener('click', () => {
    removePopup(bigPicturePopup)
  })

  enableValidation()
  renderElements()
})()

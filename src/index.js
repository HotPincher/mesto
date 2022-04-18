import './styles/index.css';
import { addCard } from './scripts/renderCard.js'
import { activatePopup, disableSubmit, removePopup, resetPopup } from './scripts/popup.js'
import { acquireUserData, loadCards, acquireAllData } from './scripts/api.js'
import {
  currentAccountName,
  currentAccountProfession,
  avatarImage,
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
} from './scripts/data.js'

import { handleAvatarForm, changeProfileCredentials, createNewCardCredentials } from './scripts/formHandlers.js'

profileEditButton.addEventListener('click', () => {
  activatePopup(popupAccountEditModifier)
  disableSubmit(popupAccountEditModifier)
  popupAccountEditModifier.querySelector('.credentials__submit-button').innerText = "Сохранить"
  resetPopup(profileEditFormCredentials)
  profileEditFormInitialValue1.setAttribute('value', currentAccountName.textContent)
  profileEditFormInitialValue2.setAttribute('value', currentAccountProfession.textContent)
})

profileEditFormCredentials.addEventListener('submit', () => {
  changeProfileCredentials(profileEditFormCredentials)
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
  popupAvatarEditModifier.querySelector('.credentials__submit-button').innerText = "Сохранить"
  resetPopup(profileAvatarEditFormCredentials)
})

profileAvatarEditFormCredentials.addEventListener('submit', () => {
  handleAvatarForm(profileAvatarEditFormCredentials)
})

newCardCreatorButton.addEventListener('click', () => {
  activatePopup(popupAccountNewCardModifier)
  disableSubmit(popupAccountNewCardModifier)
  popupAccountNewCardModifier.querySelector('.credentials__submit-button').innerText = "Создать"
  resetPopup(profileNewCardFormCredentials)
})

profileNewCardFormCredentials.addEventListener('submit', () => {
  const currentInputPlace = newCardPlace.value
  const currentInputUrl = newCardUrl.value
  createNewCardCredentials(currentInputUrl, currentInputPlace)
})

popupRemovers.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      removePopup(popup)
    }
  })
})

acquireAllData()
  .then(([data, cards]) => {
    avatarImage.src = data.avatar
    currentAccountName.textContent = data.name
    currentAccountProfession.textContent = data.about
    cards.forEach(card => {
      const userId = data._id
      const ownerId = card.owner._id;
      const elementId = card._id;
      const ownerIdLikes = [];
      const like = card.likes;
      const likeLength = like.length
      like.forEach(element =>{ownerIdLikes.push(element._id)})


      addCard(card.link, card.name, likeLength, userId, ownerId, elementId, ownerIdLikes)
    })
  })
  .catch(err => {
    console.log('Ошибка: ', err);
  });



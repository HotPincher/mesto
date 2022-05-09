import './styles/index.css';
import { renderElementCard, updateLikes, updateDelete } from './scripts/renderCard.js'
import { activatePopup, removePopup } from './scripts/popup.js'
import Api from './scripts/api.js'
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
  cardContainer,
} from './scripts/data.js'
import { handleAvatarForm, changeProfileCredentials, createNewCardCredentials } from './scripts/formHandlers.js'
import { disableSubmit, resetPopup } from './scripts/validateForm.js'

const api = new Api ();
const userInfo = new UserInfo (currentAccountName, currentAccountProfession);

profileEditButton.addEventListener('click', () => {
  activatePopup(popupAccountEditModifier)
  disableSubmit(popupAccountEditModifier)
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
  resetPopup(profileAvatarEditFormCredentials)
})

profileAvatarEditFormCredentials.addEventListener('submit', () => {
  handleAvatarForm(profileAvatarEditFormCredentials)
})

newCardCreatorButton.addEventListener('click', () => {
  activatePopup(popupAccountNewCardModifier)
  disableSubmit(popupAccountNewCardModifier)
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

let userId = null

function handleLikeClick(cardElement, cardId, isLike) {

  api.createLikeElement(cardId, isLike)
    .then((dataCards) => {
      updateLikes(cardElement, dataCards.likes, userId)
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
}

function handleDeleteClick(cardElement, cardId, elementId) {

  api.removeCardElement(cardId, elementId)
    .then(() => {
      updateDelete(cardElement, cardId, elementId)
      cardElement.remove()
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
}

const prependCard = (cardLink, cardTitle, likes, elementId, ownerIdLikes, userId, ownerId) => {
  const cardCaller = renderElementCard(
    cardLink, 
    cardTitle, 
    likes, 
    elementId, 
    ownerIdLikes, 
    userId, 
    ownerId, 
    handleLikeClick, 
    handleDeleteClick)
  cardContainer.prepend(cardCaller)
}

const appendCard = (cardLink, cardTitle, likes, elementId, ownerIdLikes, userId, ownerId) => {
  const cardCaller = renderElementCard(
    cardLink, 
    cardTitle, 
    likes, 
    elementId, 
    ownerIdLikes, 
    userId, 
    ownerId, 
    handleLikeClick, 
    handleDeleteClick)
  cardContainer.append(cardCaller)
}

api.acquireAllData()
  .then(([data, cards]) => {
    avatarImage.src = data.avatar
    currentAccountName.textContent = data.name
    currentAccountProfession.textContent = data.about
    cards.forEach(card => {
      userId = data._id
      const ownerId = card.owner._id;
      const elementId = card._id;
      const ownerIdLikes = [];
      const likes = card.likes;
      likes.forEach(element => {ownerIdLikes.push(element._id)})
      appendCard(card.link, card.name, likes, userId, ownerId, elementId, ownerIdLikes)
    })
  })
  .catch(err => {
    console.log('Ошибка: ', err);
  });

export { prependCard }

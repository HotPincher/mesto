import {
  popupAvatarEditModifier,
  popupAccountEditModifier,
  popupAccountNewCardModifier,
  avatarImage,
  avatarUrl,
  currentAccountName,
  currentAccountProfession,
  profileEditFormInitialValue1,
  profileEditFormInitialValue2,
} from './data.js'
import { editAvatar, changeProfileData, createCardElement } from './api.js'
import { removePopup } from './popup.js'
import { addCard } from './renderCard.js'

const handleAvatarForm = () => {

  const newAvatar = avatarUrl.value

  editAvatar(newAvatar)

    .then(() => {
      avatarImage.src = newAvatar
    })
    .then(() => {
      popupAvatarEditModifier.querySelector('.credentials__submit-button').innerText = "Сохранение..."
      removePopup(popupAvatarEditModifier)
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
}

const changeProfileCredentials = () => {

  const pendingInputValue1 = profileEditFormInitialValue1.value
  const pendingInputValue2 = profileEditFormInitialValue2.value

  changeProfileData(pendingInputValue1, pendingInputValue2)

    .then(() => {
      currentAccountName.textContent = pendingInputValue1
      currentAccountProfession.textContent = pendingInputValue2
    })
    .then(() => {
      popupAccountEditModifier.querySelector('.credentials__submit-button').innerText = "Сохранение..."
      removePopup(popupAccountEditModifier)
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
}

const createNewCardCredentials = (cardLink, cardTitle) => {

  createCardElement(cardLink, cardTitle)
      .then(data => {
      const userId = data._id
      const ownerId = data.owner._id;
      const elementId = data._id;
      const ownerIdLikes = [];
      const like = data.likes;
      const likeLength = like.length
      like.forEach(element =>{ownerIdLikes.push(element._id)})
      addCard(cardLink, cardTitle, likeLength, userId, ownerId, elementId, ownerIdLikes)  
    })
    .then(() => {
      popupAccountNewCardModifier.querySelector('.credentials__submit-button').innerText = "Сохранение..."
      removePopup(popupAccountNewCardModifier)
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
}

export { handleAvatarForm, changeProfileCredentials, createNewCardCredentials }
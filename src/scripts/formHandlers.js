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
import { prependCard } from '../index.js'

const handleAvatarForm = () => {

  const newAvatar = avatarUrl.value

  popupAvatarEditModifier.querySelector('.credentials__submit-button').innerText = "Сохранение..."

  editAvatar(newAvatar)

    .then(() => {
      avatarImage.src = newAvatar
    })
    .then(() => {
      removePopup(popupAvatarEditModifier)
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
    .finally(() => {
      popupAvatarEditModifier.querySelector('.credentials__submit-button').innerText = "Создать"
    })
}

const changeProfileCredentials = () => {

  const pendingInputValue1 = profileEditFormInitialValue1.value
  const pendingInputValue2 = profileEditFormInitialValue2.value

  popupAccountEditModifier.querySelector('.credentials__submit-button').innerText = "Сохранение..."

  changeProfileData(pendingInputValue1, pendingInputValue2)

    .then(() => {
      currentAccountName.textContent = pendingInputValue1
      currentAccountProfession.textContent = pendingInputValue2
    })
    .then(() => {
      removePopup(popupAccountEditModifier)
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
    .finally(() => {
      popupAccountEditModifier.querySelector('.credentials__submit-button').innerText = "Сохранить"
    })
}

const createNewCardCredentials = (cardLink, cardTitle) => {

  popupAccountNewCardModifier.querySelector('.credentials__submit-button').innerText = "Сохранение..."

  createCardElement(cardLink, cardTitle)
      .then(data => {
      const ownerId = data.owner._id;
      const userId = ownerId
      const elementId = data._id;
      const ownerIdLikes = [];
      const like = data.likes;
      const likeLength = like.length
      like.forEach(element =>{ownerIdLikes.push(element._id)})
      prependCard(cardLink, cardTitle, likeLength, userId, ownerId, elementId, ownerIdLikes)
    })
    .then(() => {
      removePopup(popupAccountNewCardModifier)
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
    .finally(() => {
      popupAccountNewCardModifier.querySelector('.credentials__submit-button').innerText = "Создать"
    })
}

export { handleAvatarForm, changeProfileCredentials, createNewCardCredentials }
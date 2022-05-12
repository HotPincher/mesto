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
/*import { editAvatar, changeProfileData, createCardElement } from './api.js'*/
import { removePopup } from './popup.js'
import { prependCard } from '../index.js'

const renderLoading = (isLoading, popup, text) => {
  if (isLoading) {
    popup.querySelector('.credentials__submit-button').innerText = text
  } else {
    popup.querySelector('.credentials__submit-button').innerText = text
  }
}

const handleAvatarForm = () => {

  const newAvatar = avatarUrl.value
  renderLoading(true, popupAvatarEditModifier, "Сохранение...")

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
      renderLoading(false, popupAvatarEditModifier, "Сохранить")
    })
}

const changeProfileCredentials = () => {

  const pendingInputValue1 = profileEditFormInitialValue1.value
  const pendingInputValue2 = profileEditFormInitialValue2.value
  
  renderLoading(true, popupAccountEditModifier, "Сохранение...")

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
      renderLoading(false, popupAccountEditModifier, "Сохранить")
    })
}

const createNewCardCredentials = (cardLink, cardTitle) => {

  renderLoading(true, popupAccountNewCardModifier, "Сохранение...")
  createCardElement(cardLink, cardTitle)
    .then(data => {
      const ownerId = data.owner._id;
      const userId = ownerId
      const elementId = data._id;
      const ownerIdLikes = [];
      const likes = data.likes;
      likes.forEach(element => { ownerIdLikes.push(element._id) })
      prependCard(cardLink, cardTitle, likes, userId, ownerId, elementId, ownerIdLikes)
    })
    .then(() => {
      removePopup(popupAccountNewCardModifier)
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    })
    .finally(() => {
      renderLoading(false, popupAccountNewCardModifier, "Создать")
    })
}

export { handleAvatarForm, changeProfileCredentials, createNewCardCredentials }
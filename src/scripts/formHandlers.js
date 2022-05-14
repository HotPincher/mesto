import {
  popupAvatarEditModifier,
  popupAccountEditModifier,
  popupAccountNewCardModifier,
  avatarImage,
  avatarUrl,
  accountName,
  accountJob,
  formValueName,
  formValueJob,
} from './data.js'

import { removePopup } from './popup.js'
import { cardSection, api, userInfo, renderCard } from '../index.js'


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

  api.editAvatar(newAvatar)

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

  renderLoading(true, popupAccountEditModifier, "Сохранение...")

  api.changeProfileData(formValueName.value, formValueJob.value)

    .then((data) => {
      userInfo.setUserInfo(data.name, data.about)
      userInfo.updateUserInfo()
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

  api.createCardElement(cardLink, cardTitle)

    .then((data) => {
      renderCard(data, cardSection)
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
import './styles/index.css';
import { renderElementCard, updateLikes, updateDelete } from './scripts/renderCard.js'
import { activatePopup, removePopup } from './scripts/popup.js'
import Api from './scripts/api.js'
import UserInfo from './scripts/UserInfo';
import Card from './scripts/Card.js'
import Section from './scripts/Section.js'
import {
  accountName,
  accountJob,
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
  formValueName,
  formValueJob,
  newCardPlace,
  newCardUrl,
} from './scripts/data.js'
import { handleAvatarForm, changeProfileCredentials, createNewCardCredentials } from './scripts/formHandlers.js'
import { disableSubmit, resetPopup } from './scripts/validateForm.js'

export const api = new Api ();
export const userInfo = new UserInfo (accountName, accountJob);
export const cardSection = new Section (renderCard, '.elements');
export let userId = null

profileEditButton.addEventListener('click', () => {
  activatePopup(popupAccountEditModifier)
  disableSubmit(popupAccountEditModifier)
  resetPopup(profileEditFormCredentials)
  formValueName.setAttribute('value', accountName.textContent)
  formValueJob.setAttribute('value', accountJob.textContent)
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

export function renderCard (dataElement) {
  const card = new Card ({data: dataElement}, '#elements__item-template');
  const cardNode = card.createNode()
  cardSection.addItem(cardNode, 'after')
}

api.acquireAllData()
  .then(([data, cards]) => {
    userId = data._id
    avatarImage.src = data.avatar
    userInfo.setUserInfo(data.name, data.about)
    userInfo.updateUserInfo()
    cardSection.renderItems(cards)
  })
  .catch(err => {
    console.log('Ошибка: ', err);
  });
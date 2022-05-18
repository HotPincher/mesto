// В подготовке проекта участвовали :
// Александр Панькин
// Павел Сенчуров


import './styles/index.css';
import Api from './components/Api.js'
import UserInfo from './components/UserInfo'
import Card from './components/Card.js'
import Section from './components/Section.js'
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage';
import FormValidator from './components/FormValidator.js';

import {
  popupSelectors,
  accountName,
  accountJob,
  avatarImage,
  profileEditButton,
  avatarEditButton,
  newCardCreatorButton,
  formValueName,
  formValueJob,
  validationSettings,
  serverConfig,
  cardConfig,
  bigPictureConfig,
} from './scripts/data.js'

export let userId = null
export const api = new Api(serverConfig);
export const userInfo = new UserInfo(accountName, accountJob, avatarImage)
export const cardSection = new Section(renderCard, '.elements')
export const bigPicturePopup = new PopupWithImage(popupSelectors.popupBigPicture, bigPictureConfig)
export const editUserAvatar = new PopupWithForm(popupSelectors.popupAvatar, (data) => {

  return api.editAvatar(data['avatar'])

    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar)
      userInfo.updateUserInfo()
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
})

export const newCardPopup = new PopupWithForm(popupSelectors.popupNewCard, (data) => {

  return api.createCardElement(data['place'], data['url'])

    .then((data) => {
      renderCard(data, cardSection)
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
})

export const editUserProfile = new PopupWithForm(popupSelectors.popupEditProfile, (data) => {

  return api.changeProfileData(data['first-name'], data['occupation'])

    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar)
      userInfo.updateUserInfo()
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
})

profileEditButton.addEventListener('click', () => {
  editUserProfile.activatePopup()
  formValidators["profile-edit"].resetPopup();
  formValidators["profile-edit"].disableSubmit();
  formValueName.value = accountName.textContent
  formValueJob.value = accountJob.textContent
})

avatarEditButton.addEventListener('click', () => {
  editUserAvatar.activatePopup()

  const validator = formValidators["avatar-edit"];
  validator.resetPopup();
  validator.disableSubmit();
})

newCardCreatorButton.addEventListener('click', () => {
  newCardPopup.activatePopup()
  const validator = formValidators["card-edit"];
  validator.resetPopup();
  validator.disableSubmit();
})

export function renderCard(dataElement) {
  const card = new Card({ data: dataElement }, cardConfig, '#elements__item-template');
  const cardNode = card.createNode()
  cardSection.addItem(cardNode, 'after')
  const cardImage = cardNode.querySelector('.elements__image')
  cardImage.addEventListener('click', () => {
    card._handleImageClick(bigPicturePopup)
  })
}

api.acquireAllData()
  .then(([data, cards]) => {
    userId = data._id
    userInfo.setUserInfo(data.name, data.about, data.avatar)
    userInfo.updateUserInfo()
    cardSection.renderItems(cards)
  })
  .catch(err => {
    console.log('Ошибка: ', err);
  });


const formValidators = {}

const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

editUserProfile.setEventListeners('Сохранить')
editUserAvatar.setEventListeners('Сменить аватар')
newCardPopup.setEventListeners('Создать')


enableValidation(validationSettings);
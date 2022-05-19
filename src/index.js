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

export const formValidators = {}
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
    .then((data) => {
      userInfo.updateUserInfo()
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
  formValidators["profile-edit"].clearErrors();
  formValidators["profile-edit"].disableSubmit();
  formValueName.value = userInfo.getUserInfo().name
  formValueJob.value = userInfo.getUserInfo().job
})

avatarEditButton.addEventListener('click', () => {
  editUserAvatar.activatePopup()
  formValidators["avatar-edit"].clearErrors();
  formValidators["avatar-edit"].disableSubmit();
})

newCardCreatorButton.addEventListener('click', () => {
  newCardPopup.activatePopup()
  formValidators["card-edit"].clearErrors();
  formValidators["card-edit"].disableSubmit();
})

function createCard(dataElement) {
  const card = new Card({ data: dataElement }, cardConfig, '#elements__item-template', api, userInfo);
  return card
}

export function renderCard(data) {
  const cardNode = createCard(data).createNode()
  const cardImage = cardNode.querySelector('.elements__image')
  cardImage.addEventListener('click', () => {
    cardNode._handleImageClick(bigPicturePopup)
  })
  cardSection.addItem(cardNode, 'after')
}

api.acquireAllData()
  .then(([data, cards]) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar, data._id)
    console.log(data._id)
    userInfo.updateUserInfo()
    cardSection.renderItems(cards)
  })
  .catch(err => {
    console.log('Ошибка: ', err);
  });

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
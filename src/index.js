import './styles/index.css';
import Api from './scripts/api.js'
import UserInfo from './scripts/UserInfo'
import Card from './scripts/Card.js'
import Section from './scripts/Section.js'
import Popup from './scripts/Popup.js'
import PopupWithForm from './scripts/PopupWithForm.js';
import FormValidator from './scripts/validateForm.js';

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
  // popupRemovers,
  profileEditFormCredentials,
  profileAvatarEditFormCredentials,
  profileNewCardFormCredentials,
  formValueName,
  formValueJob,
  newCardPlace,
  newCardUrl,
  avatarUrl,
  validationSettings,
} from './scripts/data.js'
import { disableSubmit, resetPopup } from './scripts/validateForm.js'

export const api = new Api ();
export const userInfo = new UserInfo (accountName, accountJob)
export const cardSection = new Section (renderCard, '.elements')

export let userId = null

export const editUserAvatar = new PopupWithForm (Popup.popupselectors.popupAvatar,
  () => {

    const newAvatar = avatarUrl.value
    
    return api.editAvatar(newAvatar)

    .then((data) => {
      avatarImage.src = data.avatar
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }
)

export const newCardPopup = new PopupWithForm (Popup.popupselectors.popupNewCard,
  () => {

  const currentInputPlace = newCardPlace.value
  const currentInputUrl = newCardUrl.value
  console.log(currentInputPlace)
  console.log(currentInputUrl)

    return api.createCardElement(currentInputUrl, currentInputPlace)

    .then((data) => {
      renderCard(data, cardSection)
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    });
  }
)

export const editUserProfile = new PopupWithForm (Popup.popupselectors.popupEditProfile,
  () => {
      
      return api.changeProfileData(formValueName.value, formValueJob.value)
  
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about)
        userInfo.updateUserInfo()
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }
)

avatarEditButton.addEventListener('mouseover', function (evt) {
  evt.target.closest('.profile__avatar-swapper').classList.add('profile__avatar-swapper_active')
  document.querySelector('.profile__avatar-swapper-icon').classList.add('profile__avatar-swapper-icon_active')
})

avatarEditButton.addEventListener('mouseout', function (evt) {
  evt.target.closest('.profile__avatar-swapper').classList.remove('profile__avatar-swapper_active')
  document.querySelector('.profile__avatar-swapper-icon').classList.remove('profile__avatar-swapper-icon_active')
})

profileEditButton.addEventListener('click', () => {
  editUserProfile.activatePopup()
  editUserProfile.setEventListeners()
  formValidators["profile-edit"].resetPopup();
  formValidators["profile-edit"].disableSubmit();
  formValueName.value = accountName.textContent
  formValueJob.value = accountJob.textContent
})


avatarEditButton.addEventListener('click', () => {
  editUserAvatar.activatePopup()
  editUserAvatar.setEventListeners()
  const validator = formValidators["avatar-edit"];
    validator.resetPopup();
    validator.disableSubmit();
})

newCardCreatorButton.addEventListener('click', () => {
  newCardPopup.activatePopup()
  newCardPopup.setEventListeners()
  const validator = formValidators["card-edit"];
    validator.resetPopup();
    validator.disableSubmit();
})

// popupRemovers.forEach(popup => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
//       removePopup(popup)
//     }
//   })
// })

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


const formValidators = {}

// Включение валидации
const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);
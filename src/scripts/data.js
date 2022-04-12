import marianna from '../images/image_mariana.jpg'
import philippines from '../images/image_phillipines.jpg'
import redSea from '../images/image_red-sea.jpg'
import bigBarrierReef from '../images/image_reef.jpg'
import northAtlantics from '../images/image_atlantics.jpg'
import carribean from '../images/image_carribean.jpg'

export {
  cardContentTitles,
  currentAccountName,
  currentAccountProfession,
  profileEditButton,
  avatarEditButton,
  newCardCreatorButton,
  popupAccountEditModifier,
  popupAvatarEditModifier,
  popupAccountNewCardModifier,
  cardContainer,
  cardFromTemplate,
  bigPicturePopup,
  bigPicturePopupImage,
  bigPicturePopupSpan,
  profileEditFormCredentials,
  profileAvatarEditFormCredentials,
  profileNewCardFormCredentials,
  profileEditFormInitialValue1,
  profileEditFormInitialValue2,
  newCardPlace,
  newCardUrl,
  avatarUrl,
  avatarImage,
  validationSettings,
}

const cardContentTitles = [
  { title: 'Марианская впадина', link: marianna },
  { title: 'Филиппинский архипелаг', link: philippines },
  { title: 'Красное море', link: redSea },
  { title: 'Большой Барьерный Риф', link: bigBarrierReef },
  { title: 'Северная Атлантика', link: northAtlantics },
  { title: 'Карибское море', link: carribean },
]

// PAGE LAYOUT

const currentAccountName = document.querySelector('.profile__title')
const currentAccountProfession = document.querySelector('.profile__subtitle')

// BUTTONS

const profileEditButton = document.querySelector('.profile__edit-button')
const avatarEditButton = document.querySelector('.profile__avatar-swapper')
const newCardCreatorButton = document.querySelector('.profile__add-button')

// EDITING PROFILE POPUP

const popupAccountEditModifier = document.querySelector('#profileEditPopup')

// EDITING AVATAR

const popupAvatarEditModifier = document.querySelector('#avatarEditPopup')
const avatarImage = document.querySelector('.profile__avatar-overlay')

// NEW CARD POPUP

const popupAccountNewCardModifier = document.querySelector('#newCardPopup')

// ADDING A NEW CARD

const cardContainer = document.querySelector('.elements')
const cardFromTemplate = document.querySelector('#elements__item-template').content.querySelector('.elements__item')

// BIG PICTURE POPUP

const bigPicturePopup = document.querySelector('#big-picture-popup')
const bigPicturePopupImage = bigPicturePopup.querySelector('.big-picture__image')
const bigPicturePopupSpan = bigPicturePopup.querySelector('.big-picture__tag')

// FORMS

const profileEditFormCredentials = document.forms['profile-edit']
const profileNewCardFormCredentials = document.forms['card-edit']
const profileAvatarEditFormCredentials = document.forms['avatar-edit']
const profileEditFormInitialValue1 = profileEditFormCredentials.querySelector('#name-input')
const profileEditFormInitialValue2 = profileEditFormCredentials.querySelector('#description-input')
const newCardPlace = document.querySelector('#place-input')
const newCardUrl = document.querySelector('#url-input')
const avatarUrl = document.querySelector('#avatar-input')

// FORM VALIDATION OBJECT

const validationSettings = {
  formSelector: '.credentials',
  inputSelector: '.credentials__user-input',
  submitButtonSelector: '.credentials__submit-button',
  inactiveButtonClass: 'credentials__submit-button_disabled',
  inputErrorClass: 'credentials__user-input_invalid',
  inputErrorHiddenClass: 'credentials__input-error_hidden',
}


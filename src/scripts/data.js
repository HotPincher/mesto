export {
  cardContentTitles,
  popupTitle,
  popupFormPlaceholder,
  currentAccountName,
  currentAccountProfession,
  profileEditButton,
  avatarEditButton,
  newCardCreatorButton,
  popupAccountEditModifier,
  popupEditAccountFormTitleCurrent,
  popupAvatarEditModifier,
  popupAvatarFormTitleCurrent,
  popupAccountNewCardModifier,
  popupNewCardFormTitleCurrent,
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
}

const cardContentTitles = [
  { title: 'Марианская впадина', link: '../src/images/image_mariana.jpg' },
  { title: 'Филиппинский архипелаг', link: '../src/images/image_phillipines.jpg' },
  { title: 'Красное море', link: '../src/images/image_red-sea.jpg' },
  { title: 'Большой Барьерный Риф', link: '../src/images/image_reef.jpg' },
  { title: 'Северная Атлантика', link: '../src/images/image_atlantics.jpg' },
  { title: 'Карибское море', link: '../src/images/image_carribean.jpg' },
]

const popupTitle =
  ['Редактировать профиль', 'Новое место', 'Обновить аватар']

const popupFormPlaceholder = [
  { inputOne: 'Имя исследователя', inputTwo: 'Профессия' },
  { inputOne: 'Название', inputTwo: 'Ссылка на картинку' },
  { inputOne: 'Ссылка на аватар'},
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
const popupEditAccountFormTitleCurrent = popupAccountEditModifier.querySelector('.popup__title')

// EDITING AVATAR

const popupAvatarEditModifier = document.querySelector('#avatarEditPopup')
const popupAvatarFormTitleCurrent = popupAvatarEditModifier.querySelector('.popup__title')

// NEW CARD POPUP

const popupAccountNewCardModifier = document.querySelector('#newCardPopup')
const popupNewCardFormTitleCurrent = popupAccountNewCardModifier.querySelector('.popup__title')

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


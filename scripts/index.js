

// 1 Initial rendering of cards in __elements section

const cardContentTitles = 
[ {title: 'Марианская впадина', link: './images/image_mariana.jpg'},
  {title: 'Филиппинский архипелаг', link: './images/image_phillipines.jpg'},
  {title: 'Красное море', link: './images/image_red-sea.jpg'},
  {title: 'Большой Барьерный Риф', link: './images/image_reef.jpg'},
  {title: 'Северная Атлантика', link: './images/image_atlantics.jpg'},
  {title: 'Карибское море', link: './images/image_carribean.jpg'},
]

const popupTitle = 
['Редактировать профиль', 'Новое место']

const popupFormPlaceholder = 
[{inputOne: 'Имя исследователя', inputTwo: 'Профессия'}, 
  {inputOne: 'Название', inputTwo: 'Ссылка на картинку'},]

const popUpContainer = document.querySelector('.body')
const currentAccountName = popUpContainer.querySelector('.profile__title')
const currentAccountProfession = popUpContainer.querySelector('.profile__subtitle')
const cardContainer = popUpContainer.querySelector('.elements')
const bigPicturePopup = popUpContainer.querySelector('#big-picture-popup')
const bigPicturePopupImage = bigPicturePopup.querySelector('.big-picture__image')
const bigPicturePopupSpan = bigPicturePopup.querySelector('.big-picture__tag')
const cardFromTemplate = popUpContainer.querySelector('#elements__item-template').content.querySelector('.elements__item')
const popupAccountEditModifier = popUpContainer.querySelector('#profileEditPopup')
const popupEditAccountFormTitleCurrent = popupAccountEditModifier.querySelector('.popup__title')
const profileEditFormCredentials = popupAccountEditModifier.querySelector('.credentials')
const profileEditFormInitialValue1 = profileEditFormCredentials.querySelector('#formInitialValue1')
const profileEditFormInitialValue2 = profileEditFormCredentials.querySelector('#formInitialValue2')
const profileEditButton = popUpContainer.querySelector('.profile__edit-button')
const popupAccountNewCardModifier = popUpContainer.querySelector('#newCardPopup')
const popupNewCardFormTitleCurrent = popupAccountNewCardModifier.querySelector('.popup__title')
const profileNewCardFormCredentials = popupAccountNewCardModifier.querySelector('.credentials')
const profileNewCardFormInitialValue1 = profileNewCardFormCredentials.querySelector('#newCardValue1')
const profileNewCardFormInitialValue2 = profileNewCardFormCredentials.querySelector('#newCardValue2')
const newCardCreatorButton = popUpContainer.querySelector('.profile__add-button')

activatePopup = popup => {  
  popup.classList.remove('popup_animation-out')
  popup.classList.add('popup_animation-on')
}

removePopup = popup => {  
  popup.classList.remove('popup_animation-on')
  popup.classList.add('popup_animation-out')
}

renderElementCard = heading => {
  const cardCreator = cardFromTemplate.cloneNode(true)
  const cardCreatorTextElement = cardCreator.querySelector('.elements__heading')
  const cardCreatorImageElement = cardCreator.querySelector('.elements__image')
  cardCreatorTextElement.textContent = heading['title']
  cardCreatorImageElement.setAttribute('src', heading['link'])  
  cardCreatorImageElement.setAttribute('alt', heading['title'])     

  const cardRemover = cardCreator.querySelector('.elements__delete-button')
  cardRemover.addEventListener('click', evt => {evt.target.closest('.elements__item').remove()})

  const cardLikeButton = cardCreator.querySelector('.elements__like-button')
  cardLikeButton.addEventListener('click', evt => {
    evt.target.closest('.elements__like-button').classList.toggle('elements__like-button_active')
  })

  cardCreatorImageElement.addEventListener('click', () => {    
    bigPicturePopupImage.setAttribute('src', heading['link'])
    bigPicturePopupImage.setAttribute('alt', heading['title'])     
    bigPicturePopupSpan.textContent = heading['title']
    activatePopup(bigPicturePopup)
  })

  return cardCreator
}

addCard = (title, link) => {
  const cardCaller = renderElementCard(title, link)
  cardContainer.prepend(cardCaller) 
}

cardContentTitles.forEach(addCard)

bigPicturePopup.querySelector('.popup__close-button').addEventListener('click', () => {
  removePopup(bigPicturePopup)})

// 2 Popup containers / not-from-template method

// Edit button activating popup and submit button closing popup

profileEditButton.addEventListener('click', () => {
  activatePopup(popupAccountEditModifier)
  popupEditAccountFormTitleCurrent.textContent = popupTitle[0]
  profileEditFormInitialValue1.setAttribute('value', currentAccountName.textContent)
  profileEditFormInitialValue2.setAttribute('value', currentAccountProfession.textContent)
  profileEditFormInitialValue1.setAttribute('placeholder', popupFormPlaceholder[0]['inputOne'])
  profileEditFormInitialValue2.setAttribute('placeholder', popupFormPlaceholder[0]['inputTwo'])
})

profileEditFormCredentials.addEventListener('submit', evt => {
  evt.preventDefault()
  const pendingInputValue1 = evt.target.querySelector('#formInitialValue1').value
  currentAccountName.textContent = pendingInputValue1
  const pendingInputValue2 = evt.target.querySelector('#formInitialValue2').value
  currentAccountProfession.textContent = pendingInputValue2
  removePopup(popupAccountEditModifier)
})

popupAccountEditModifier.querySelector('.popup__close-button').addEventListener('click', () => {
  removePopup(popupAccountEditModifier)})


// New Card button activating popup and submit button closing popup


newCardCreatorButton.addEventListener('click', () => {
  activatePopup(popupAccountNewCardModifier)
  popupNewCardFormTitleCurrent.textContent = popupTitle[1]
  profileNewCardFormInitialValue1.setAttribute('placeholder', popupFormPlaceholder[1]['inputOne'])
  profileNewCardFormInitialValue2.setAttribute('placeholder', popupFormPlaceholder[1]['inputTwo'])
})
  
profileNewCardFormCredentials.addEventListener('submit', evt => {
  evt.preventDefault()
  const newCardInputValue1 = evt.target.querySelector('#newCardValue1')
  const newCardInputValue2 = evt.target.querySelector('#newCardValue2')
  cardContentTitles.push({title: `${newCardInputValue1.value}`, link:`${newCardInputValue2.value}`})
  const lastInputCredentials = cardContentTitles.pop()
  addCard(lastInputCredentials)
  newCardInputValue1.value = ''
  newCardInputValue2.value = ''
  removePopup(popupAccountNewCardModifier)
})  
  
popupAccountNewCardModifier.querySelector('.popup__close-button').addEventListener('click', () => {
  removePopup(popupAccountNewCardModifier)
})



// 1 Initial rendering of cards in __elements section

const cardContentTitles = [
  {title: 'Марианская впадина', link: './images/image_mariana.jpg'},
  {title: 'Филиппинский архипелаг', link: './images/image_phillipines.jpg'},
  {title: 'Красное море', link: './images/image_red-sea.jpg'},
  {title: 'Большой Барьерный Риф', link: './images/image_reef.jpg'},
  {title: 'Северная Атлантика', link: './images/image_atlantics.jpg'},
  {title: 'Карибское море', link: './images/image_carribean.jpg'},
]

const popUpContainer = document.querySelector('.body')

const currentAccountName = document.querySelector('.profile__title')

const currentAccountProfession = document.querySelector('.profile__subtitle')

const cardContainer = document.querySelector('.elements')

const cardFromTemplate = document.querySelector('#elements__item-template').content.querySelector('.elements__item')

function renderElementCard (heading) {
  const cardCreator = cardFromTemplate.cloneNode(true)
  const cardCreatorTextElement = cardCreator.querySelector('.elements__heading')
  cardCreatorTextElement.textContent = heading['title']
  const cardCreatorImageElement = cardCreator.querySelector('.elements__image')
  cardCreatorImageElement.setAttribute('src', heading['link'])  
  cardContainer.prepend(cardCreator)

  const cardRemover = cardCreator.querySelector('.elements__delete-button')
  cardRemover.addEventListener('click', function(evt) {
    evt.target.closest('.elements__item').remove()
  })

  const cardLikeButton = cardCreator.querySelector('.elements__like-button')
  cardLikeButton.addEventListener('click', function (evt) {
    evt.target.closest('.elements__like-button').classList.toggle('elements__like-button_active')
  })

  const bigPicturePopup = document.querySelector('.big-picture')
  cardCreatorImageElement.addEventListener('click', function () {
    const bigPicturePopupImage = bigPicturePopup.querySelector('.big-picture__image')
    bigPicturePopupImage.setAttribute('src', heading['link'])
    const bigPicturePopupSpan = bigPicturePopup.querySelector('.big-picture__tag')
    bigPicturePopupSpan.textContent = heading['title']
    bigPicturePopup.classList.remove('big-picture_animation-out')
    bigPicturePopup.classList.add('big-picture_animation-on')
  })

  const bigPictureRemover = document.querySelector('.big-picture__close-button')
  bigPictureRemover.addEventListener('click', function() {
    bigPicturePopup.classList.remove('big-picture_animation-on')
    bigPicturePopup.classList.add('big-picture_animation-out')
  })
}

cardContentTitles.forEach(renderElementCard)

// 2 Popup containers / not-from-template method

const popupTitle = 
['Редактировать профиль', 'Новое место']

const popupFormPlaceholder = 
[ {inputOne: 'Имя исследователя', inputTwo: 'Профессия'}, 
  {inputOne: 'Название', inputTwo: 'Ссылка на картинку'}, ]

const popupEditFormInitialValue = 
[{inputOne: 'Жак-Ив Кусто', inputTwo: 'Исследователь океана'}]

// Edit-popup variables

const popupAccountEditModifier = document.querySelector('#profileEditPopup')
const popupEditAccountFormTitleCurrent = popupAccountEditModifier.querySelector('.popup__title')
const profileEditFormCredentials = popupAccountEditModifier.querySelector('.credentials')
const profileEditFormInitialValue1 = profileEditFormCredentials.querySelector('#formInitialValue1')
const profileEditFormInitialValue2 = profileEditFormCredentials.querySelector('#formInitialValue2')
const profileEditCloseButton = popupAccountEditModifier.querySelector('.popup__close-button')
const profileEditButton = document.querySelector('.profile__edit-button')

// New-Card-popup variables

const popupAccountNewCardModifier = document.querySelector('#newCardPopup')
const popupNewCardFormTitleCurrent = popupAccountNewCardModifier.querySelector('.popup__title')
const profileNewCardFormCredentials = popupAccountNewCardModifier.querySelector('.credentials')
const profileNewCardFormInitialValue1 = profileNewCardFormCredentials.querySelector('#newCardValue1')
const profileNewCardFormInitialValue2 = profileNewCardFormCredentials.querySelector('#newCardValue2')
const profileNewCardCloseButton = popupAccountNewCardModifier.querySelector('.popup__close-button')
const newCardCreatorButton = document.querySelector('.profile__add-button')

// Edit button activating popup and submit button closing popup

profileEditButton.addEventListener('click', function() {
  popupAccountEditModifier.classList.remove('popup_animation-out')
  popupAccountEditModifier.classList.add('popup_animation-on')
  popupEditAccountFormTitleCurrent.textContent = popupTitle[0]
  profileEditFormInitialValue1.setAttribute('value', popupEditFormInitialValue[0]['inputOne'])
  profileEditFormInitialValue2.setAttribute('value', popupEditFormInitialValue[0]['inputTwo'])
  profileEditFormInitialValue1.setAttribute('placeholder', popupFormPlaceholder[0]['inputOne'])
  profileEditFormInitialValue2.setAttribute('placeholder', popupFormPlaceholder[0]['inputTwo'])
})

profileEditFormCredentials.addEventListener('submit', function(evt){
  evt.preventDefault()
  const pendingInputValue1 = evt.target.querySelector('#formInitialValue1').value
  currentAccountName.textContent = pendingInputValue1
  popupEditFormInitialValue[0]['inputOne'] = pendingInputValue1
  const pendingInputValue2 = evt.target.querySelector('#formInitialValue2').value
  currentAccountProfession.textContent = pendingInputValue2
  popupEditFormInitialValue[0]['inputTwo'] = pendingInputValue2
  popupAccountEditModifier.classList.remove('popup_animation-on')
  popupAccountEditModifier.classList.add('popup_animation-out')
})

profileEditCloseButton.addEventListener('click', function() {
  popupAccountEditModifier.classList.remove('popup_animation-on')
  popupAccountEditModifier.classList.add('popup_animation-out')
  })


// New Card button activating popup and submit button closing popup


newCardCreatorButton.addEventListener('click', function() {
  popupAccountNewCardModifier.classList.remove('popup_animation-out')
  popupAccountNewCardModifier.classList.add('popup_animation-on')
  popupNewCardFormTitleCurrent.textContent = popupTitle[1]
  profileNewCardFormInitialValue1.setAttribute('placeholder', popupFormPlaceholder[1]['inputOne'])
  profileNewCardFormInitialValue2.setAttribute('placeholder', popupFormPlaceholder[1]['inputTwo'])
})
  
profileNewCardFormCredentials.addEventListener('submit', function(evt){
  evt.preventDefault()
  let newCardInputValue1 = evt.target.querySelector('#newCardValue1')
  let newCardInputValue2 = evt.target.querySelector('#newCardValue2')
  cardContentTitles.push({title: `${newCardInputValue1.value}`, link:`${newCardInputValue2.value}`})
  const lastInputCredentials = cardContentTitles.pop()
  renderElementCard(lastInputCredentials)
  newCardInputValue1.value = ''
  newCardInputValue2.value = ''
  popupAccountNewCardModifier.classList.remove('popup_animation-on')
  popupAccountNewCardModifier.classList.add('popup_animation-out')
})  
  
profileNewCardCloseButton.addEventListener('click', function() {
  popupAccountNewCardModifier.classList.remove('popup_animation-on')
  popupAccountNewCardModifier.classList.add('popup_animation-out')
  })  






// Using template method for popup activation


// For template method of pop-up initiation
// const bigPictureFromTemplate = document.querySelector('#big-picture-template').content.querySelector('.big-picture');

  //   function bigImageRender () { 
  //   const bigPictureFromTemplateCreator = bigPictureFromTemplate.cloneNode(true)
  //   const bigPictureFromTemplateImage = bigPictureFromTemplateCreator.querySelector('.big-picture__image')
  //   bigPictureFromTemplateImage.setAttribute('src', heading['link'])
  //   const bigPictureFromTemplateSpan = bigPictureFromTemplateCreator.querySelector('.big-picture__tag')
  //   bigPictureFromTemplateSpan.textContent = heading['title']
  //   bigPictureFromTemplateCreator.classList.add('big-picture_animation-on')
  //   popUpContainer.append(bigPictureFromTemplateCreator)

  //   const bigPictureFromTemplateRemover = bigPictureFromTemplateCreator.querySelector('.big-picture__close-button')
  //   bigPictureFromTemplateRemover.addEventListener('click', function(evt) {
  //     evt.target.closest('.big-picture').classList.remove('big-picture_animation-on')
  //     evt.target.closest('.big-picture').classList.add('big-picture_animation-out')
  //     evt.target.closest('.big-picture').remove()
  //   })
  // }
  // cardCreatorImageElement.addEventListener('click', bigImageRender)




// const popupFromTemplate = document.querySelector('#popup-template').content.querySelector('.popup')

// editProfileButton.addEventListener('click', editPopupRender)



// function editPopupRender () {
//   const editPopupCreator = popupFromTemplate.cloneNode(true)
//   const editPopupCreatorTitle = editPopupCreator.querySelector('.popup__title')
//   editPopupCreatorTitle.textContent = popupTitle[0]
//   const editPopupInputOneInitialValue = editPopupCreator.querySelector('#person-name')
//   editPopupInputOneInitialValue.setAttribute('value', popupEditFormInitialValue[0]['inputOne'])
//   const editPopupInputTwoInitialValue = editPopupCreator.querySelector('#person-occupation')
//   editPopupInputTwoInitialValue.setAttribute('value', popupEditFormInitialValue[0]['inputTwo'])
//   const editPopupInputOnePlaceholder = editPopupCreator.querySelector('#person-name')
//   editPopupInputOnePlaceholder.setAttribute('placeholder', popupFormPlaceholder[0]['inputOne'])
//   const editPopupInputTwoPlaceholder = editPopupCreator.querySelector('#person-occupation')
//   editPopupInputTwoPlaceholder.setAttribute('placeholder', popupFormPlaceholder[0]['inputTwo'])
  // editPopupCreator.classList.add('popup_animation-on')
//   popUpContainer.append(editPopupCreator)

//   const closeEditPopupButton = document.querySelector('.popup__close-button')
//   closeEditPopupButton.addEventListener('click', (evt) => {
//   // evt.preventDefault()  
//   // evt.target.closest('.popup').classList.remove('popup_animation-on')
//   // evt.target.closest('.popup').classList.add('popup_animation-out')  
//   evt.target.closest('.popup').remove()
//   })
//   const updateAccountForm = document.querySelector('.credentials')
//   updateAccountForm.addEventListener('submit', function (evt) {
//   evt.preventDefault()
//   const currentAccountName = document.querySelector('.profile__title')
//   const inputOne = evt.target.querySelector('#person-name').value
//   currentAccountName.textContent = inputOne

//   const currentAccountProfession = document.querySelector('.profile__subtitle')
//   const inputTwo = evt.target.querySelector('#person-occupation').value
//   currentAccountProfession.textContent = inputTwo

//   evt.target.closest('.popup').remove()
  
//   // evt.target.closest('.popup').classList.add('popup_animation-out')
//   // evt.target.closest('.popup').classList.remove('popup_animation-on')
//   })
// }


// function newCardPopupRender () {
//   const newCardPopupCreator = popupFromTemplate.cloneNode(true)
//   const newCardPopupCreatorTitle = newCardPopupCreator.querySelector('.popup__title')
//   newCardPopupCreatorTitle.textContent = popupTitle[1]
//   const newCardPopupInputOnePlaceholder = newCardPopupCreator.querySelector('#person-name')
//   newCardPopupInputOnePlaceholder.setAttribute('placeholder', popupFormPlaceholder[1]['inputOne'])
//   const newCardPopupInputTwoPlaceholder = newCardPopupCreator.querySelector('#person-occupation')
//   newCardPopupInputTwoPlaceholder.setAttribute('placeholder', popupFormPlaceholder[1]['inputTwo'])
//   newCardPopupCreator.classList.add('popup_animation-on')
//   popUpContainer.append(newCardPopupCreator)
    
//   const closeNewCardPopupButton = document.querySelector('.popup__close-button')
//   closeNewCardPopupButton.addEventListener('click', (evt) => {
//     // evt.target.closest('.popup').classList.remove('popup_animation-on')
//     // evt.target.closest('.popup').classList.add('popup_animation-out')
//     // evt.target.closest('.popup').remove()
//   })

  
//   const createNewCardForm = document.querySelector('.credentials')
//   createNewCardForm.addEventListener('submit', function (evt) {
//     evt.preventDefault()
//     const inputOneNew = evt.target.querySelector('#person-name').value
//     const inputTwoNew = evt.target.querySelector('#person-occupation').value
//     cardContentTitles.push({title: `${inputOneNew}`, link:`${inputTwoNew}`})
//     lastInputCredentials = cardContentTitles.pop()
//     // newCardPopupCreator.classList.add('popup_animation-on')
//     renderElementCard(lastInputCredentials)
//     evt.target.closest('.popup').classList.remove('popup_animation-on')
//     evt.target.closest('.popup').classList.add('popup_animation-out')
//     evt.target.closest('.popup').remove()
//   })
// }

// createNewCardButton.addEventListener('click', newCardPopupRender)



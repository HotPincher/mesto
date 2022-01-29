
const cardContentTitles = [
  {title: 'Марианская впадина', link: './images/image_mariana.jpg'},
  {title: 'Филиппинский архипелаг', link: './images/image_phillipines.jpg'},
  {title: 'Красное море', link: './images/image_red-sea.jpg'},
  {title: 'Большой Барьерный Риф', link: './images/image_reef.jpg'},
  {title: 'Северная Атлантика', link: './images/image_atlantics.jpg'},
  {title: 'Карибское море', link: './images/image_carribean.jpg'},
]

// 1 Initial cards
const popUpContainer = document.querySelector('.body')

const cardContainer = document.querySelector('.elements')

const cardFromTemplate = document.querySelector('#elements__item-template').content.querySelector('.elements__item')

const bigPictureFromTemplate = document.querySelector('#big-picture-template').content.querySelector('.big-picture');

function renderElementCard (heading) {

  const cardCreator = cardFromTemplate.cloneNode(true)
  const cardCreatorTextElement = cardCreator.querySelector('.elements__heading')
  cardCreatorTextElement.textContent = heading['title']
  const cardCreatorImageElement = cardCreator.querySelector('.elements__image')
  cardCreatorImageElement.setAttribute('src', heading['link'])  
  cardContainer.append(cardCreator)

  const cardRemover = cardCreator.querySelector('.elements__delete-button')
  cardRemover.addEventListener('click', function(evt) {
    evt.target.closest('.elements__item').remove()
  })

  const cardLikeButton = cardCreator.querySelector('.elements__like-button')
  cardLikeButton.addEventListener('click', function (evt) {
    evt.target.closest('.elements__like-button').classList.toggle('elements__like-button_active')
  })

    function bigImageRender () { 
    const bigPictureFromTemplateCreator = bigPictureFromTemplate.cloneNode(true)
    
    const bigPictureFromTemplateImage = bigPictureFromTemplateCreator.querySelector('.big-picture__image')
    bigPictureFromTemplateImage.setAttribute('src', heading['link'])
    
    const bigPictureFromTemplateSpan = bigPictureFromTemplateCreator.querySelector('.big-picture__tag')
    bigPictureFromTemplateSpan.textContent = heading['title']

    popUpContainer.append(bigPictureFromTemplateCreator)

    const bigPictureFromTemplateRemover = bigPictureFromTemplateCreator.querySelector('.big-picture__close-button')
    bigPictureFromTemplateRemover.addEventListener('click', function(evt) {
      evt.target.closest('.big-picture').remove()
    })
    
  }
  cardCreatorImageElement.addEventListener('click', bigImageRender)
}
cardContentTitles.forEach(renderElementCard)


// 2 Popup container

const editButtonActivator = document.querySelector('.profile__edit-button')
const popupFromTemplate = document.querySelector('#popup-template').content.querySelector('.popup')


const popupTitle = ['Редактировать профиль', 'Новое место']

const popupFormPlaceholder = 
[ {inputOne: 'Имя исследователя', inputTwo: 'Профессия'}, 
  {inputOne: 'Название места', inputTwo: 'Ссылка'}, ]

const popupEditFormInitialValue = [{inputOne: 'Жак-Ив Кусто', inputTwo: 'Исследователь океана'}]

const editProfileButton = document.querySelector('.profile__edit-button')
editProfileButton.addEventListener('click', editPopupRender)

const createNewCardButton = document.querySelector('.profile__add-button')
createNewCardButton.addEventListener('click', newCardPopupRender)
    

function editPopupRender () {
  const editPopupCreator = popupFromTemplate.cloneNode(true)
  const editPopupCreatorTitle = editPopupCreator.querySelector('.popup__title')
  editPopupCreatorTitle.textContent = popupTitle[0]
  const editPopupInputOneInitialValue = editPopupCreator.querySelector('#person-name')
  editPopupInputOneInitialValue.setAttribute('value', popupEditFormInitialValue[0]['inputOne'])
  const editPopupInputTwoInitialValue = editPopupCreator.querySelector('#person-occupation')
  editPopupInputTwoInitialValue.setAttribute('value', popupEditFormInitialValue[0]['inputTwo'])
  const editPopupInputOnePlaceholder = editPopupCreator.querySelector('#person-name')
  editPopupInputOnePlaceholder.setAttribute('placeholder', popupFormPlaceholder[0]['inputOne'])
  const editPopupInputTwoPlaceholder = editPopupCreator.querySelector('#person-occupation')
  editPopupInputTwoPlaceholder.setAttribute('placeholder', popupFormPlaceholder[0]['inputTwo'])
  popUpContainer.append(editPopupCreator)


  const closeEditPopupButton = document.querySelector('.popup__close-button')
  closeEditPopupButton.addEventListener('click', (evt) => {
  evt.target.closest('.popup').remove()
  })
  const updateAccountForm = document.querySelector('.credentials')
  updateAccountForm.addEventListener('submit', function (evt) {
  evt.preventDefault()
  const currentAccountName = document.querySelector('.profile__title')
  const inputOne = evt.target.querySelector('#person-name').value
  currentAccountName.textContent = inputOne

  const currentAccountProfession = document.querySelector('.profile__subtitle')
  const inputTwo = evt.target.querySelector('#person-occupation').value
  currentAccountProfession.textContent = inputTwo

  evt.target.closest('.popup').remove()
  })
}


function newCardPopupRender () {
  const newCardPopupCreator = popupFromTemplate.cloneNode(true)
  const newCardPopupCreatorTitle = newCardPopupCreator.querySelector('.popup__title')
  newCardPopupCreatorTitle.textContent = popupTitle[1]
  const newCardPopupInputOnePlaceholder = newCardPopupCreator.querySelector('#person-name')
  newCardPopupInputOnePlaceholder.setAttribute('placeholder', popupFormPlaceholder[1]['inputOne'])
  const newCardPopupInputTwoPlaceholder = newCardPopupCreator.querySelector('#person-occupation')
  newCardPopupInputTwoPlaceholder.setAttribute('placeholder', popupFormPlaceholder[1]['inputTwo'])
  popUpContainer.append(newCardPopupCreator)
    
  const closeNewCardPopupButton = document.querySelector('.popup__close-button')
  closeNewCardPopupButton.addEventListener('click', (evt) => {
    evt.target.closest('.popup').remove()
  })

  
  const createNewCardForm = document.querySelector('.credentials')
  createNewCardForm.addEventListener('submit', function (evt) {
    evt.preventDefault()
    const inputOneNew = evt.target.querySelector('#person-name').value
    const inputTwoNew = evt.target.querySelector('#person-occupation').value
    cardContentTitles.push({title: `${inputOneNew}`, link:`${inputTwoNew}`})
    lastInputCredentials = cardContentTitles.pop()
    renderElementCard(lastInputCredentials)
    evt.target.closest('.popup').remove()
  })
}



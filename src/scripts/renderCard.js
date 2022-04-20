import {
  cardFromTemplate,
  bigPicturePopup,
  bigPicturePopupImage,
  bigPicturePopupSpan,
} from './data.js'
import errorImage from '../images/no-image.jpg'
import { activatePopup } from './popup.js'

const isLiked = (cardLikes, userId) => {
  return cardLikes.some(like => like._id === userId)
}

const canDelete = (userId, ownerId) => {
  return userId !== ownerId
}

const updateLikes = (cardCreator, cardLikes, userId) => {
  const cardLikeToggler = cardCreator.querySelector('.elements__like-button')
  const cardLikeCounter = cardCreator.querySelector('.elements__like-counter')
  cardLikeCounter.textContent = cardLikes.length

  if (isLiked(cardLikes, userId)) {
    cardLikeToggler.classList.add('elements__like-button_active')
  } else {
    cardLikeToggler.classList.remove('elements__like-button_active')
  }
}

const updateDelete = (cardCreator, userId, ownerId) => {
  const cardRemover = cardCreator.querySelector('#elements__delete-button-template')
  if (canDelete(userId, ownerId)) {
    cardRemover.remove()
  }
}

const renderElementCard = (
  cardLink, 
  cardTitle, 
  likes, 
  userId, 
  ownerId, 
  elementId, 
  ownerIdLikes,
  handleLikeClick, 
  handleDeleteClick) => {
  const cardCreator = cardFromTemplate.cloneNode(true)
  const cardCreatorTextElement = cardCreator.querySelector('.elements__heading')
  const cardCreatorImageElement = cardCreator.querySelector('.elements__image')
  const cardLikeToggler = cardCreator.querySelector('.elements__like-button')
  const cardRemover = cardCreator.querySelector('#elements__delete-button-template')

  cardCreatorImageElement.src = cardLink
  cardCreatorImageElement.alt = cardTitle
  cardCreatorImageElement.dataset.id = elementId
  cardCreatorTextElement.textContent = cardTitle
  cardCreatorImageElement.onerror = () => { cardCreatorImageElement.src = errorImage }
  cardCreatorImageElement.addEventListener('click', function () {
    bigPicturePopupImage.src = cardLink
    bigPicturePopupImage.alt = cardTitle
    bigPicturePopupSpan.textContent = cardTitle
    bigPicturePopupImage.onerror = () => { bigPicturePopupImage.src = errorImage }
    activatePopup(bigPicturePopup)
  })

  cardLikeToggler.addEventListener('click', function () {
    handleLikeClick(cardCreator, elementId, cardLikeToggler.classList.contains('elements__like-button_active'))
  })

  cardRemover.addEventListener('click', function () {
    handleDeleteClick(cardCreator, elementId)
  })

  updateLikes(cardCreator, likes, userId)
  updateDelete(cardCreator, userId, ownerId)

  return cardCreator
}

export { renderElementCard, isLiked, canDelete, updateLikes, updateDelete }


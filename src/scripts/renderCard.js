import {
  cardFromTemplate,
  bigPicturePopup,
  bigPicturePopupImage,
  bigPicturePopupSpan,
} from './data.js'
import errorImage from '../images/no-image.jpg'
import { activatePopup } from './popup.js'
import { removeCardElement, createLikeElement, removeLikeElement } from './api.js'




const renderElementCard = (cardLink, cardTitle, likes, userId, ownerId, elementId, ownerIdLikes) => {
  const cardCreator = cardFromTemplate.cloneNode(true)
  const cardCreatorTextElement = cardCreator.querySelector('.elements__heading')
  const cardCreatorImageElement = cardCreator.querySelector('.elements__image')
  const cardLikeToggler = cardCreator.querySelector('.elements__like-button')
  const cardLikeCounter = cardCreator.querySelector('.elements__like-counter')
  const cardRemover = cardCreator.querySelector('#elements__delete-button-template')

  cardCreatorImageElement.src = cardLink
  cardCreatorImageElement.alt = cardTitle
  cardCreatorImageElement.dataset.id = elementId
  cardCreatorTextElement.textContent = cardTitle
  cardLikeCounter.textContent = likes
  cardCreatorImageElement.onerror = () => { cardCreatorImageElement.src = errorImage }
  cardCreatorImageElement.addEventListener('click', () => {
    bigPicturePopupImage.src = cardLink
    bigPicturePopupImage.alt = cardTitle
    bigPicturePopupSpan.textContent = cardTitle
    bigPicturePopupImage.onerror = () => {bigPicturePopupImage.src = errorImage}
    activatePopup(bigPicturePopup)
  })

  if (userId === ownerId) {
    cardRemover.addEventListener('click', evt => {
      removeCardElement(elementId)
        .then(() => {
          cardCreator.remove()
          cardCreator = null
        })
        .catch((err) => {
          console.log('Ошибка: ', err);
        })
    })
  } else {
    cardRemover.remove()
  }

  const postLike = (cardLikeCounter, elementId) => {

    createLikeElement(elementId, cardLikeCounter)
      .then(() => {
        cardLikeToggler.classList.add('elements__like-button_active')
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  }
  
  const disLike = (cardLikeCounter, elementId) => {
  
    removeLikeElement(elementId, cardLikeCounter)
      .then(() => {
        cardLikeToggler.classList.remove('elements__like-button_active')
      })
      .catch((err) => {
        console.log('Ошибка: ', err);
      })
  }

  cardLikeToggler.addEventListener('click', function () {
    if (cardLikeToggler.classList.contains('elements__like-button_active')) {
      console.log('yes')
      disLike(cardLikeCounter, elementId) 
    } else {
      postLike(cardLikeCounter, elementId)
    }
  })

  if (ownerIdLikes.indexOf(userId) !== -1) {
    cardLikeToggler.classList.add('elements__like-button_active')
  }

  return cardCreator
}

export { renderElementCard }


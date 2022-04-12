import {
  cardContentTitles,
  cardContainer,
  cardFromTemplate,
  bigPicturePopup,
  bigPicturePopupImage,
  bigPicturePopupSpan,
} from './data.js'

import errorImage from '../images/no-image.jpg'

import { activatePopup } from './popup.js'

const renderElementCard = heading => {
  const cardCreator = cardFromTemplate.cloneNode(true)
  const cardCreatorTextElement = cardCreator.querySelector('.elements__heading')
  const cardCreatorImageElement = cardCreator.querySelector('.elements__image')
  const cardLikeToggler = cardCreator.querySelector('.elements__like-button') 

  cardCreatorTextElement.textContent = heading['title']
  cardCreatorImageElement.setAttribute('src', heading['link'])
  cardCreatorImageElement.setAttribute('alt', heading['title'])
  cardCreatorImageElement.onerror = function () {
    cardCreatorImageElement.setAttribute('src', errorImage)
  }

  cardLikeToggler.addEventListener('click', evt => {
    evt.target.classList.toggle('elements__like-button_active')
  })

  const cardRemover = cardCreator.querySelector('.elements__delete-button')
  cardRemover.addEventListener('click', evt => { evt.target.closest('.elements__item').remove() })

  cardCreatorImageElement.addEventListener('click', () => {
    bigPicturePopupImage.setAttribute('src', heading['link'])
    bigPicturePopupImage.setAttribute('alt', heading['title'])
    bigPicturePopupSpan.textContent = heading['title']
    activatePopup(bigPicturePopup)
  })

  return cardCreator
}

// cardContainer.addEventListener('click', evt => {
//   if (evt.target.classList.contains('elements__like-button')) {
//     evt.target.classList.toggle('elements__like-button_active')
//   }
// })

const addCard = (title, link) => {
  const cardCaller = renderElementCard(title, link)
  cardContainer.prepend(cardCaller)
}

const renderElements = () => {
  cardContentTitles.forEach(addCard)
}

export { renderElements, addCard }


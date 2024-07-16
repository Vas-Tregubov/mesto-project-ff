import { cardTemplate } from "../index.js";

function addCard(card, deleteCard, cardLike, imageIncrease) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode("true");
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

function cardLike(evt) {
  const like = evt.target.closest('.card__like-button');
  like.classList.toggle("card__like-button_is-active");
  console.log(evt.target);
}

function imageIncrease(evt) {
  console.log('Check');
  // const image = evt.target.closest('.card__image');
  // image.
  // const popupImage = evt.target.closest('.card__image');

}

export {addCard, deleteCard, cardLike, imageIncrease };

// Export addCard and deleteCard to index.js
// Add like function here

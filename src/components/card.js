import { cardTemplate } from "../index.js";

function addCard(card, deleteCard) {
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

export {addCard, deleteCard};

// Export addCard and deleteCard to index.js
// Add like function here

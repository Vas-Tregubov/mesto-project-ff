import { increaseCardImage } from "../index.js";

const cardTemplate = document.querySelector("#card-template").content;

function addCard(link, name, deleteCard, toggleCardLike, increaseCardImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode("true");
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeItem = cardElement.querySelector(".card__like-button");
  likeItem.addEventListener("click", toggleCardLike);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", increaseCardImage);
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

function toggleCardLike(evt) {
  const like = evt.target.closest(".card__like-button");
  like.classList.toggle("card__like-button_is-active");
}

export { addCard, deleteCard, toggleCardLike };

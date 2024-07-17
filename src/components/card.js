import { popupTypeImage, placesList, increaseCardImage } from "../index.js";
import { openModal } from "./modal.js";
import { initialCards } from "../scripts/cards.js";

const cardTemplate = document.querySelector("#card-template").content;

function addCard(link, name, deleteCard, toggleCardLike, increaseCardImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode("true");
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

function addEventListenersToCards() {
  const likeItems = document.querySelectorAll(".card__like-button");
  const cardImages = document.querySelectorAll(".card__image");

  likeItems.forEach((item) => item.addEventListener("click", toggleCardLike));
  cardImages.forEach((image) =>
    image.addEventListener("click", increaseCardImage)
  );
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

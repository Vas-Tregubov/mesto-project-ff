import { cardTemplate, popupTypeImage, placesList } from "../index.js";
import { openModal } from "./modal.js";
import { initialCards } from "../scripts/cards.js";

function addCard(card, deleteCard, cardLike, imageIncrease) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode("true");
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

function addEventListenersToCards() {
  const likeItems = document.querySelectorAll(".card__like-button");
  const cardImages = document.querySelectorAll(".card__image");

  likeItems.forEach((item) => item.addEventListener("click", cardLike));
  cardImages.forEach((image) => image.addEventListener("click", imageIncrease));
}

function renderInitialCards() {
  initialCards.forEach((elem) => placesList.append(addCard(elem, deleteCard)));
  addEventListenersToCards();
}

function renderNewCard(link, name) {
  initialCards.unshift({ link: link, name: name });
  placesList.prepend(addCard(initialCards[0], deleteCard));
  addEventListenersToCards();
}

function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

function cardLike(evt) {
  const like = evt.target.closest(".card__like-button");
  like.classList.toggle("card__like-button_is-active");
}

function imageIncrease(evt) {
  const image = evt.target.closest(".card__image");
  const imageLink = image.src;
  const imageTitle = image.alt;
  const popupImage = popupTypeImage.querySelector(".popup__image");
  const popupCaption = popupTypeImage.querySelector(".popup__caption");
  popupImage.src = imageLink;
  popupImage.alt = imageTitle;
  popupCaption.textContent = imageTitle;
  openModal(popupTypeImage);
}

export {
  addCard,
  deleteCard,
  cardLike,
  imageIncrease,
  renderNewCard,
  renderInitialCards,
};

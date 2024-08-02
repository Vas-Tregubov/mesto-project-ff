import { deleteCardFromServer } from "./api";

export const MYID = "e5f96a8c118edfdc88d8f400";

const cardTemplate = document.querySelector("#card-template").content;

function addCard(
  name,
  link,
  likeCount = 0,
  ownerId = null,
  cardId = null,
  deleteCard,
  toggleCardLike,
  increaseCardImage,
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode("true");
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  compareCardholder(ownerId, deleteButton);
  const likeItem = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-count");
  likeCounter.textContent = likeCount;
  likeItem.addEventListener("click", toggleCardLike);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", increaseCardImage);
  deleteButton.addEventListener("click", (evt) => deleteCard(evt, cardId));
  return cardElement;
}

function deleteCard(evt, cardId) {
  const card = evt.target.closest(".card");
  card.remove();
  deleteCardFromServer(cardId);
}

function toggleCardLike(evt) {
  const like = evt.target.closest(".card__like-button");
  like.classList.toggle("card__like-button_is-active");
}

function compareCardholder(ownerId, button) {
  if (!ownerId) {
    console.log('PLS HELP ME');
  } else {
    if (ownerId != MYID) {
      button.style.display = "none";
    }
  }
}

export { addCard, deleteCard, toggleCardLike };

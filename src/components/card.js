import { deleteCardFromServer, likeCardWithSaveOnServer } from "./api";
import { userId } from "../index.js";

const cardTemplate = document.querySelector("#card-template").content;

function addCard(cardData, deleteCard, toggleCardLike, increaseCardImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode("true");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  compareCardholder(cardData.ownerId, deleteButton);
  const likeItem = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-count");
  if (cardData.isLiked) {
    likeItem.classList.add("card__like-button_is-active");
  }
  likeCounter.textContent = cardData.likeCount;
  likeItem.addEventListener("click", (evt) => {
    toggleCardLike(evt, cardData.cardId, likeCounter);
  });
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", increaseCardImage);
  deleteButton.addEventListener("click", (evt) =>
    deleteCard(evt, cardData.cardId)
  );
  return cardElement;
}

function deleteCard(evt, cardId) {
  const card = evt.target.closest(".card");
  deleteCardFromServer(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.error(`Ошибка при удалении карточки: ${err}`);
    });
}

function toggleCardLike(evt, cardId) {
  const like = evt.target.closest(".card__like-button");
  const isLiked = like.classList.contains("card__like-button_is-active");
  likeCardWithSaveOnServer(cardId, isLiked)
    .then(() => {
      like.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error(`Ошибка при постановке лайка: ${err}`);
    });
  return !isLiked;
}

function compareCardholder(ownerId, button) {
  if (ownerId && ownerId != userId) {
    button.style.display = "none";
  }
}

export { addCard, deleteCard, toggleCardLike };

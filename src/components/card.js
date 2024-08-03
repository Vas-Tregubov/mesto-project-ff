import { deleteCardFromServer, likeCardWithSaveOnServer } from "./api";

export const MYID = "e5f96a8c118edfdc88d8f400";

const cardTemplate = document.querySelector("#card-template").content;

function addCard(cardData, deleteCard, toggleCardLike, increaseCardImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode("true");
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  compareCardholder(cardData.ownerId, deleteButton);
  const likeItem = cardElement.querySelector(".card__like-button");
  if (cardData.isLiked) {
    likeItem.classList.add("card__like-button_is-active");
  }
  const likeCounter = cardElement.querySelector(".card__like-count");
  likeItem.addEventListener("click", (evt) => {
    const isLiked = toggleCardLike(evt, cardData.cardId);
    updateLikeCount(likeCounter, isLiked, cardData.cardId);
  });
  likeCounter.textContent = cardData.likeCount;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", increaseCardImage);
  deleteButton.addEventListener("click", (evt) =>
    deleteCard(evt, cardData.cardId)
  );
  return cardElement;
}

function deleteCard(evt, cardId) {
  const card = evt.target.closest(".card");
  card.remove();
  deleteCardFromServer(cardId);
}

function toggleCardLike(evt, cardId) {
  const like = evt.target.closest(".card__like-button");
  like.classList.toggle("card__like-button_is-active");
  const isLiked = like.classList.contains("card__like-button_is-active");
  likeCardWithSaveOnServer(cardId, isLiked);
  return isLiked;
}

function updateLikeCount(likeCounter, isLiked, cardId) {
  let likeCount = parseInt(likeCounter.textContent, 10);
  likeCount = isLiked ? likeCount + 1 : likeCount - 1;
  likeCounter.textContent = likeCount;

  likeCardWithSaveOnServer(cardId, isLiked).catch((error) => {
    console.error(`Ошибка обновления лайков на сервере: ${error}`);
    likeCounter.textContent = isLiked ? likeCount - 1 : likeCount + 1;
  });
}

function compareCardholder(ownerId, button) {
  if (ownerId && ownerId != MYID) {
    button.style.display = "none";
  }
}

export { addCard, deleteCard, toggleCardLike };

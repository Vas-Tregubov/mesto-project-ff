import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { addCard, deleteCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");

const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

const cardImage = document.querySelector(".card__image");
const popupEditCardImage = document.querySelector(".popup_type_image");

const editProfileFormName = document.querySelector(".popup__input_type_name");
editProfileFormName.value = "Жак-Ив Кусто";
const editProfileFormDescription = document.querySelector(
  ".popup__input_type_description"
);
editProfileFormDescription.value = "Исследователь океана";
const popupForm = document.querySelector(".popup__form");

profileEditButton.addEventListener("click", () => openModal(popupEditProfile));
profileAddButton.addEventListener("click", () => openModal(popupNewCard));
// cardImage.addEventListener("click", () => openModal(popupEditCardImage));

function renderInitialCards() {
  initialCards.forEach((elem) => placesList.append(addCard(elem, deleteCard)));
}

renderInitialCards();

export {
  cardTemplate,
  placesList,
  popupEditProfile,
  popupForm,
  editProfileFormName,
  editProfileFormDescription,
};

// don't forget to call imported functions

// here are global constants, event listeners

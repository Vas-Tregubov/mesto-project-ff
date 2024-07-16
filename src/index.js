import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  addCard,
  deleteCard,
  cardLike,
  imageIncrease,
  renderInitialCards,
} from "./components/card.js";
import {
  openModal,
  closeModal,
  handleFormSubmitProfile,
  handleFormSubmitCard,
} from "./components/modal.js";

// card template and card list variables

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// profile information

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// profile edit

const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", () => openModal(popupEditProfile));
const popupEditProfile = document.querySelector(".popup_type_edit");

// add card

const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", () => openModal(popupNewCard));
const popupNewCard = document.querySelector(".popup_type_new-card");

// card pop-up

const popupTypeImage = document.querySelector(".popup_type_image");

// form submits

const popupEditProfileForm = document.forms["edit-profile"];
popupEditProfileForm.addEventListener("submit", handleFormSubmitProfile);
const popupNewCardForm = document.forms["new-place"];
popupNewCardForm.addEventListener("submit", handleFormSubmitCard);

renderInitialCards();

export {
  cardTemplate,
  placesList,
  popupEditProfileForm,
  profileTitle,
  profileDescription,
  popupTypeImage,
};

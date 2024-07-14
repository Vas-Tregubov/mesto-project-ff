import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { addCard, deleteCard } from "./components/card.js";
import { openModal, closeModal, handleFormSubmit } from "./components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// profile edit

const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");

// add card

const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

// card edit

const cardImage = document.querySelector(".card__image");
const popupEditCardImage = document.querySelector(".popup_type_image");

// edit profile form fields

const editProfileFormName = document.querySelector(".popup__input_type_name");
editProfileFormName.value = "Жак-Ив Кусто";
const editProfileFormDescription = document.querySelector(
  ".popup__input_type_description"
);
editProfileFormDescription.value = "Исследователь океана";
const popupEditProfileForm = document.forms["edit-profile"];
const popupNewCardForm = document.forms["new-place"];

// event listeners

profileEditButton.addEventListener("click", () => openModal(popupEditProfile));
profileAddButton.addEventListener("click", () => openModal(popupNewCard));
// cardImage.addEventListener("click", () => openModal(popupEditCardImage));
popupEditProfileForm.addEventListener("submit", handleFormSubmit);
popupNewCardForm.addEventListener("submit", handleFormSubmit);

function renderInitialCards() {
  initialCards.forEach((elem) => placesList.append(addCard(elem, deleteCard)));
}

renderInitialCards();

export {
  cardTemplate,
  placesList,
  popupEditProfile,
  popupEditProfileForm,
  editProfileFormName,
  editProfileFormDescription,
  profileTitle,
  profileDescription,
  popupNewCard,
  popupNewCardForm
};

// don't forget to call imported functions

// here are global constants, event listeners

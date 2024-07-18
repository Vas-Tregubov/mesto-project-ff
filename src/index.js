import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { addCard, deleteCard, toggleCardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const placesList = document.querySelector(".places__list");

// profile information

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileFormName = document.querySelector(".popup__input_type_name");
const profileFormDescription = document.querySelector(
  ".popup__input_type_description"
);

// profile edit

const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", () => openModal(popupEditProfile));
const popupEditProfile = document.querySelector(".popup_type_edit");

// add card

const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", () => openModal(popupNewCard));
const popupNewCard = document.querySelector(".popup_type_new-card");

// card form

const cardFormName = document.querySelector(".popup__input_type_card-name");
const cardFormLink = document.querySelector(".popup__input_type_url");

// card pop-up

const popupTypeImage = document.querySelector(".popup_type_image");

// form submits

const popupEditProfileForm = document.forms["edit-profile"];
popupEditProfileForm.addEventListener("submit", handleFormSubmitProfile);
const popupNewCardForm = document.forms["new-place"];
popupNewCardForm.addEventListener("submit", handleFormSubmitCard);

// functions

function renderInitialCards() {
  initialCards.forEach((card) => {
    const { name, link } = card;
    placesList.append(
      addCard(link, name, deleteCard, toggleCardLike, increaseCardImage)
    );
  });
}

function renderNewCard(link, name) {
  placesList.prepend(
    addCard(link, name, deleteCard, toggleCardLike, increaseCardImage)
  );
}

const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

function increaseCardImage(evt) {
  const image = evt.target.closest(".card__image");
  const imageLink = image.src;
  const imageTitle = image.alt;
  popupImage.src = imageLink;
  popupImage.alt = imageTitle;
  popupCaption.textContent = imageTitle;
  openModal(popupTypeImage);
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const profileName = profileFormName.value;
  profileTitle.textContent = profileName;
  const profileJob = profileFormDescription.value;
  profileDescription.textContent = profileJob;
  closeModal(evt.target.closest(".popup"));
}

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const cardName = cardFormName.value;
  const cardLink = cardFormLink.value;
  renderNewCard(cardLink, cardName);
  closeModal(evt.target.closest(".popup"));
}

renderInitialCards();

export {
  placesList,
  profileFormName,
  profileFormDescription,
  popupEditProfileForm,
  profileTitle,
  profileDescription,
  popupTypeImage,
  renderNewCard,
  increaseCardImage,
  handleFormSubmitCard,
  handleFormSubmitProfile,
  cardFormLink,
  cardFormName,
};

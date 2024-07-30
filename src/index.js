import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { addCard, deleteCard, toggleCardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { isValid, hideInputError } from "./components/validate.js";

// list of cards

const placesList = document.querySelector(".places__list");

// profile information

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// profile edit

const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const profileFormName = document.querySelector(".popup__input_type_name");
const profileFormDescription = document.querySelector(
  ".popup__input_type_description"
);
const profileAddButton = document.querySelector(".profile__add-button");
profileEditButton.addEventListener("click", () => {
  openModal(popupEditProfile);
  resetFields(popupEditProfile);
  clearValidationErrors(popupEditProfile);
});

// card addition

const popupNewCard = document.querySelector(".popup_type_new-card");
const cardFormName = document.querySelector(".popup__input_type_card-name");
const cardFormLink = document.querySelector(".popup__input_type_url");
profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
  resetFields(popupNewCard);
  clearValidationErrors(popupNewCard);
});

function renderNewCard(link, name) {
  placesList.prepend(
    addCard(link, name, deleteCard, toggleCardLike, increaseCardImage)
  );
}

// card image increase

const popupTypeImage = document.querySelector(".popup_type_image");
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

// form submits

const popupEditProfileForm = document.forms["edit-profile"];
popupEditProfileForm.addEventListener("submit", handleFormSubmitProfile);
const popupNewCardForm = document.forms["new-place"];
popupNewCardForm.addEventListener("submit", handleFormSubmitCard);

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
  resetFields(popupNewCardForm);
}

// common functions

function renderInitialCards() {
  initialCards.forEach((card) => {
    const { name, link } = card;
    placesList.append(
      addCard(link, name, deleteCard, toggleCardLike, increaseCardImage)
    );
  });
}

function resetFields(obj) {
  const fields = obj.querySelectorAll("input, textarea, select");
  fields.forEach((field) => {
    if (
      field.tagName.toLowerCase() === "input" &&
      (field.type === "text" ||
        field.type === "textarea" ||
        field.type === "number" ||
        field.type === "email" ||
        field.type === "url")
    ) {
      field.value = field.defaultValue;
    } else if (field.tagName.toLowerCase() === "textarea") {
      field.value = field.defaultValue;
    } else if (field.tagName.toLowerCase() === "select") {
      field.value = field.defaultValue;
    }
  });
  // const buttonElement = obj.querySelector(".popup__button");
  // toggleButtonState(fields, buttonElement);
}

renderInitialCards();

// validation elements

function clearValidationErrors(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button-inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button-inactive");
  }
}

export { increaseCardImage };

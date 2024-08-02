import "./pages/index.css";
import { addCard, deleteCard, toggleCardLike } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  enableValidation,
  toggleButtonState,
  clearValidationErrors,
} from "./components/validation.js";
import { settings } from "./components/validation-settings.js";
import {
  getUserInformation,
  getAllCards,
  setProfileInfo,
  postNewCard,
} from "./components/api.js";

// list of cards

const placesList = document.querySelector(".places__list");

// profile information

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

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
  const name = profileFormName.value;
  const about = profileFormDescription.value;
  setProfileInfo(name, about)
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      profileImage.style.backgroundImage = `url('${user.avatar}')`;
    })
    .catch((err) => {
      console.error(`Ошибка обновления профиля: ${err}`);
    });
  closeModal(evt.target.closest(".popup"));
}

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const name = cardFormName.value;
  const link = cardFormLink.value;
  postNewCard(name, link)
    .then((card) => {
      name = card.name;
      link = card.link;
    })
    .catch((err) => {
      console.error(`Ошибка добавления карточки: ${err}`);
    });
  renderNewCard(name, link);
  closeModal(evt.target.closest(".popup"));
  resetFields(popupNewCardForm);
}

// fields validation and resets

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
  const inputList = Array.from(obj.querySelectorAll(".popup__input"));
  const buttonElement = obj.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement, settings);
}

enableValidation(settings);

// API functions

const catchError = (err) => {
  console.error(err);
};

if (profileTitle && profileDescription && profileImage) {
  getUserInformation()
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      profileImage.style.backgroundImage = `url('${user.avatar}')`;
    })
    .catch(catchError);
} else {
  console.error("Ошибка: Не удалось найти элементы DOM");
}

getAllCards().then((allCards) => {
  allCards.forEach((card) => {
    const { name, link, likes, owner } = card;
    const likeCount = likes.length;
    const ownerId = owner._id;
    placesList.append(
      addCard(name, link, likeCount, ownerId, deleteCard, toggleCardLike, increaseCardImage)
    );
  });
});

export { increaseCardImage };

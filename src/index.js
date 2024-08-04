import "./pages/index.css";
import {
  addCard,
  deleteCard,
  toggleCardLike,
  MYID,
} from "./components/card.js";
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
  setProfileAvatar,
  validateImageUrl,
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
const popupEditProfileAvatar = document.querySelector(".popup_type_new-avatar");
const profileAvatarLink = document.querySelector(
  ".popup__input_type_avatar_url"
);
const profileFormName = document.querySelector(".popup__input_type_name");
const profileFormDescription = document.querySelector(
  ".popup__input_type_description"
);
profileEditButton.addEventListener("click", () => {
  openModal(popupEditProfile);
  resetFields(popupEditProfile);
  clearValidationErrors(popupEditProfile);
});
profileImage.addEventListener("click", () => {
  openModal(popupEditProfileAvatar);
  resetFields(popupEditProfileAvatar);
  clearValidationErrors(popupEditProfileAvatar);
});

// card addition

const popupNewCard = document.querySelector(".popup_type_new-card");
const cardFormName = document.querySelector(".popup__input_type_card-name");
const cardFormLink = document.querySelector(".popup__input_type_url");
const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
  resetFields(popupNewCard);
  clearValidationErrors(popupNewCard);
});

function renderNewCard(cardData) {
  placesList.prepend(
    addCard(cardData, deleteCard, toggleCardLike, increaseCardImage)
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
popupEditProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleFormSubmit(
    popupEditProfileForm,
    popupEditProfileForm.querySelector(".popup__button"),
    handleFormSubmitProfile
  );
});
const popupNewCardForm = document.forms["new-place"];
popupNewCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleFormSubmit(
    popupNewCardForm,
    popupNewCardForm.querySelector(".popup__button"),
    handleFormSubmitCard
  );
});
const popupEditProfileAvatarForm = document.forms["new-avatar"];
popupEditProfileAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleFormSubmit(
    popupEditProfileAvatarForm,
    popupEditProfileAvatarForm.querySelector(".popup__button"),
    handleFormChangeProfileAvatar
  );
});

function handleFormSubmit(form, submitButton, submitAction) {
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  submitAction()
    .then(() => {
      closeModal(form.closest(".popup"));
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });
}

function handleFormSubmitProfile() {
  const name = profileFormName.value;
  const about = profileFormDescription.value;
  return setProfileInfo(name, about).then((user) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url('${user.avatar}')`;
  });
}

function handleFormChangeProfileAvatar() {
  const avatar = profileAvatarLink.value;
  return setProfileAvatar(avatar).then((user) => {
    profileImage.style.backgroundImage = `url('${user.avatar}')`;
  });
}

function handleFormSubmitCard(evt) {
  const name = cardFormName.value;
  const link = cardFormLink.value;
  return postNewCard(name, link).then((card) => {
    const cardData = {
      name: card.name,
      link: card.link,
      likeCount: card.likes.length,
      ownerId: card.owner._id,
      cardId: card._id,
    };
    renderNewCard(cardData);
    resetFields(popupNewCardForm);
  });
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
    const cardData = {
      name: card.name,
      link: card.link,
      likeCount: card.likes.length,
      ownerId: card.owner._id,
      cardId: card._id,
      isLiked: card.likes.some((like) => like._id === MYID),
    };
    placesList.append(
      addCard(cardData, deleteCard, toggleCardLike, increaseCardImage)
    );
  });
});

// function showErrorToUser(message) {
//   alert(`Ошибка: ${message}`);
// }

export { increaseCardImage };

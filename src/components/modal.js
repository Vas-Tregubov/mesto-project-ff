import {
  popupEditProfile,
  profileTitle,
  profileDescription,
  renderInitialCards,
  renderNewCard,
  profileFormName,
  profileFormDescription,
} from "../index.js";
import { addCard } from "./card.js";
import { initialCards } from "../scripts/cards.js";

const cardFormName = document.querySelector(".popup__input_type_card-name");
const cardFormLink = document.querySelector(".popup__input_type_url");

function openModal(obj) {
  obj.classList.add("popup_is-opened");
  const closeModalCross = obj.querySelector(".popup__close");
  closeModalCross.addEventListener("click", () => closeModal(obj));
  document.addEventListener("keydown", closeByEsc);
  window.addEventListener("click", (evt) => {
    if (evt.target == obj) {
      closeModal(obj);
    }
  });
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function closeModal(obj) {
  obj.classList.remove("popup_is-opened");
  const closeModalCross = obj.querySelector(".popup__close");
  closeModalCross.removeEventListener("click", closeModal);
  window.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", closeByEsc);
  const form = obj.querySelector("form");
  const timerRename = setTimeout(() => {
    if (form) {
      form.reset();
    }
  }, 1000);
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

export { openModal, closeModal, handleFormSubmitProfile, handleFormSubmitCard };

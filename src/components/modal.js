import {
  popupEditProfile,
  profileTitle,
  profileDescription,
  renderInitialCards,
  renderNewCard
} from "../index.js";
import { addCard } from "./card.js";
import { initialCards } from "../scripts/cards.js";

const profileFormName = document.querySelector(".popup__input_type_name");
profileFormName.value = "Жак-Ив Кусто";
const profileFormDescription = document.querySelector(
  ".popup__input_type_description"
);
profileFormDescription.value = "Исследователь океана";

const cardFormName = document.querySelector(".popup__input_type_card-name");
const cardFormLink = document.querySelector(".popup__input_type_url");

function openModal(obj) {
  obj.classList.add("popup_is-opened");
  const closeModalCross = obj.querySelector(".popup__close");
  closeModalCross.addEventListener("click", () => closeModal(obj));
  document.addEventListener("keydown", (evt) => {
    if (evt.code == "Escape") {
      closeModal(obj);
    }
  });
  window.addEventListener("click", (evt) => {
    if (evt.target == obj) {
      closeModal(obj);
    }
  });
}

function closeModal(obj) {
  obj.classList.remove("popup_is-opened");
  const inputs = obj.querySelectorAll("input");
  const closeModalCross = obj.querySelector(".popup__close");
  closeModalCross.removeEventListener("click", () => closeModal(obj));
  window.removeEventListener("click", () => closeModal(obj));
  document.removeEventListener("keyup", () => closeModal(obj));
  const timerRename = setTimeout(() => {
    inputs.forEach(function (item) {
      item.value = "";
    });
    profileFormName.value = "Жак-Ив Кусто";
    profileFormDescription.value = "Исследователь океана";
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

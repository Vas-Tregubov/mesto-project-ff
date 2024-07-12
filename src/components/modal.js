import {
  popupEditProfile,
  popupForm,
  editProfileFormName,
  editProfileFormDescription,
} from "../index.js";

function openModal(obj) {
  obj.classList.add("popup_is-opened");
  const closeModalCross = obj.querySelector(".popup__close");
  closeModalCross.addEventListener("click", () => closeModal(obj));
  // document.addEventListener("click", () => closeModal(obj));
  document.addEventListener("keydown", (evt) => {
    if (evt.code == "Escape") {
      closeModal(obj);
    }
  });
}

function closeModal(obj) {
  obj.classList.remove("popup_is-opened");
  obj.classList.add("popup_is-animated");
  const closeModalCross = obj.querySelector(".popup__close");
  closeModalCross.removeEventListener("click", () => closeModal(obj));
  document.removeEventListener("keyup", () => closeModal(obj));
  popupForm.reset();
  editProfileFormName.value = "Жак-Ив Кусто";
  editProfileFormDescription.value = "Исследователь океана";
  // obj.forms.form[0]
  // document.removeEventListener("click", () => closeModal(obj));
}

// popupForm.addEventListener('submit', function(evt) {
//   evt.preventDefault();
//   popupForm.reset();
// })

export { openModal, closeModal };

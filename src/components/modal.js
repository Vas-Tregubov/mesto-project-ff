import {
  popupEditProfile,
  popupEditProfileForm,
  editProfileFormName,
  editProfileFormDescription,
  profileTitle,
  profileDescription,
} from "../index.js";

const profileFormName = document.querySelector(".popup__input_type_name");
const profileFormDescription = document.querySelector(
  ".popup__input_type_description"
);
const defaultForm = {
  profileName: (profileFormName.value = "Жак-Ив Кусто"),
  profileJob: (profileFormDescription.value = "Исследователь океана"),
};

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
  const timerRename = setTimeout(() => {
    popupEditProfileForm.reset();
    profileFormName.value = "Жак-Ив Кусто";
    profileFormDescription.value = "Исследователь океана";
  }, 1000)
  // document.removeEventListener("click", () => closeModal(obj));
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = profileFormName.value;
  defaultForm.profileName = name;
  profileTitle.textContent = name;
  const job = profileFormDescription.value;
  defaultForm.profileJob = job;
  profileDescription.textContent = job;
  // const profileFormName = evt.target.querySelector(".popup__input_type_name");
  // const profileFormDescription = evt.target.querySelector(".popup__input_type_description");
  // const defaultForm = {
  //   profileName: profileFormName.value,
  //   profileJob: profileFormDescription.value,
  // };
  // const { profileName: userName = 'Жак-Ив Кусто', profileJob: userJob = 'Wanker'} = defaultForm;
  // console.log(userName, userJob);
}

// popupForm.addEventListener('submit', function(evt) {
//   evt.preventDefault();
//   popupForm.reset();
// })

export { openModal, closeModal, handleFormSubmit };

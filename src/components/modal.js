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
  setTimeout(() => {
    if (form) {
      form.reset();
    }
  }, 1000);
}

export { openModal, closeModal };

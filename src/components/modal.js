function openModal(obj) {
  obj.classList.add("popup_is-opened");
  obj.querySelector(".popup__close").addEventListener("click", closeByCross);
  document.addEventListener("keydown", closeByEsc);
  window.addEventListener("click", closeByClickOnOverlay);
}

function closeByClickOnOverlay(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.target === openedPopup) {
    closeModal(openedPopup);
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function closeByCross() {
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
}

function closeModal(obj) {
  obj.classList.remove("popup_is-opened");
  const closeModalCross = obj.querySelector(".popup__close");
  closeModalCross.removeEventListener("click", closeByCross);
  window.removeEventListener("click", closeByClickOnOverlay);
  document.removeEventListener("keydown", closeByEsc);
}

export { openModal, closeModal };

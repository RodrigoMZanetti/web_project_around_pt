function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup.popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

////open e close
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}
/////

export function setPopupCloseListeners(popup) {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", () => closePopup(popup));

  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) closePopup(popup);
  });
}

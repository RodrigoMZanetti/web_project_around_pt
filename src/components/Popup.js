class Popup {
  constructor(popupSelector, subButtonSubmitSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonSubmit = this._popup.querySelector(subButtonSubmitSelector);
  }

  open() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    const closeButtonPopup = this._popup.querySelector(".popup__close");
    closeButtonPopup.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) this.close();
    });
  }
}

export default Popup;

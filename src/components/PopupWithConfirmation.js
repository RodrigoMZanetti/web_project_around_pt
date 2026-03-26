import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this._deleteButton = this._popup.querySelector(".popup__delete-button");
    this._handleConfirmation = handleConfirmation;
  }

  open(id, card) {
    this._id = id;
    this._card = card;
    super.open();
  }

  submitNewConfirmation() {
    this._deleteButton.addEventListener("click", () => {
      this._handleConfirmation(this._id, this._card);
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.submitNewConfirmation();
  }
}

export default PopupWithConfirmation;

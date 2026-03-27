import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this._deleteButton = this._popup.querySelector(".popup__delete-button");
    this._handleConfirmation = handleConfirmation;
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  open(id, card) {
    this._id = id;
    this._card = card;
    super.open();
  }

  _handleDeleteClick() {
    this._handleConfirmation(this._id, this._card);
  }

  setEventListeners() {
    this._deleteButton.addEventListener("click", this._handleDeleteClick);
    super.setEventListeners();
  }
}

export default PopupWithConfirmation;

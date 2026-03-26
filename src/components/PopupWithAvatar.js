import Popup from "./Popup.js";

class PopupWithAvatar extends Popup {
  constructor(popupSelector, handleNewAvatar) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
    this._input = this._form.querySelector("input");
    this._handleNewAvatar = handleNewAvatar;
  }

  getInput() {
    return { avatar: this._input.value };
  }

  setEventListeners() {
    super.setEventListeners();
    this.submitNewAvatar();
  }

  submitNewAvatar() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleNewAvatar(this.getInput());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithAvatar;

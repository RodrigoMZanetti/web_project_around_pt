import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector("img");
    this._imageText = this._popup.querySelector(".popup__caption");
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._imageText.textContent = name;
    super.open();
  }
}

export default PopupWithImage;

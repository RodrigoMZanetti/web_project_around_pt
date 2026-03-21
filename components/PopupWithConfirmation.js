import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = this._popup.querySelector(".button__delete-card");
  }

  open(id, card) {
    this._id = id;
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener("click", () => {
      fetch(
        `https://around-api.pt-br.tripleten-services.com/v1/cards/${this._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: "1ea7b6ca-ac6f-43e4-9d93-04922f8ad215",
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(`ERROR: ${res.status}`);
          }
          return res.json();
        })
        .then((result) => {
          super.close();
          return this._card.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}

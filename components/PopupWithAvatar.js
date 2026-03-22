import Popup from "./Popup.js";

class PopupWithAvatar extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector("form");
  }

  submitNewAvatar() {
    fetch(
      `https://around-api.pt-br.tripleten-services.com/v1/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: "1ea7b6ca-ac6f-43e4-9d93-04922f8ad215",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: input.value,
        }),
      },
    )
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`ERROR: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        profileImage.src = data.avatar;
        super.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default PopupWithAvatar;

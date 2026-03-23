//Importações
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import API from "../components/API.js";

//DOM
const btnEditOpen = document.querySelector(".profile__edit-button");
const btnNewCardOpen = document.querySelector(".profile__add-button");
const formNewCard = document.querySelector("#new-card-form");
const formEditProfile = document.querySelector("#edit-profile-form");
const cardsContainer = document.querySelector(".cards__list");
const validationConfig = {
  input: ".popup__input",
  button: ".popup__button",
};

//Funções
function handleOpenCardPopup(text, image) {
  popupWithImage.open({ link: image, name: text });
}

function fillProfileForm(formElement) {
  const nameElement = document.querySelector(".profile__title");
  const aboutElement = document.querySelector(".profile__description");

  formElement.querySelector(".popup__input_type_name").value =
    nameElement.textContent;

  formElement.querySelector(".popup__input_type_description").value =
    aboutElement.textContent;
}

//Instâncias

//PopupWithImage.js
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();
btnNewCardOpen.addEventListener("click", () => {
  popupAddCard.open();
});

//PopupWithForm.js
const popupAddCard = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
popupAddCard.setEventListeners();

//PopupWithForm.js
const popupEditProfileForm = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit,
);
popupEditProfileForm.setEventListeners();
btnEditOpen.addEventListener("click", () => {
  fillProfileForm(formEditProfile);
  popupEditProfileForm.open();
});

//FormValidator.js
new FormValidator(validationConfig, formEditProfile).setEventListeners();
new FormValidator(validationConfig, formNewCard).setEventListeners();

//UserInfo.js
const userInfo = new UserInfo({
  inputNameSelector: ".profile__title",
  inputJobSelector: ".profile__description",
});

//PoupWithConfirmation.js
const newPopupWithConfirmation = new PopupWithConfirmation(
  "#popup__delete-card",
);
newPopupWithConfirmation.setEventListeners();

function handleDeleteButton(id, element) {
  newPopupWithConfirmation.open(id, element);
}

//PopupWithAvatar.js
import PopupWithAvatar from "../components/PopupWithAvatar.js";
const imageAvatarElement = document.querySelector(".profile__image");
const popupWithAvatar = new PopupWithAvatar(
  "#popup__avatar",
  imageAvatarElement,
);
popupWithAvatar.setEventListeners();

const popupAvatarImage = document.querySelector(".profile__avatar-container");

popupAvatarImage.addEventListener("click", () => {
  popupWithAvatar.open();
});

//APIs

//Api Renderizando Cards
let userId = "";
const api = new API({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "1ea7b6ca-ac6f-43e4-9d93-04922f8ad215",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((user) => {
    userId = user._id;
    return api.getInitialCards();
  })
  .then((results) => {
    results.forEach((result) => {
      const newCard = new Card(
        result,
        "#template_model",
        handleOpenCardPopup,
        userId,
        handleLikeButton,
        handleDeleteButton,
      ).getView();
      cardsContainer.prepend(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Api like e remover o like
function handleLikeButton(card) {
  if (card._isLiked) {
    api
      .deleteLike(card._id)
      .then((result) => {
        console.log(result);
        card.updateLikes(result.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addLike(card._id)
      .then((result) => card.updateLikes(result.likes))
      .catch((err) => {
        console.log(err);
      });
  }
}

/*Api submiter o novo perfil*/

const buttonSubmit =
  popupEditProfileForm._popup.querySelector(".popup__button");
const buttonMessage = buttonSubmit.textContent;
buttonSubmit.textContent = "Saving...";
api
  .updateUserInfo(name, description)
  .then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      job: result.about,
    });
    popupEditProfileForm.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    buttonSubmit.textContent = buttonMessage;
  });

/*API de submiter o novo card*/
function handleAddCardSubmit(data) {
  buttonSubmit.textContent = "Saving...";
  api
    .cardFormSubmit(data)
    .then((result) => {
      const cardElement = new Card(
        result,
        "#template_model",
        handleOpenCardPopup,
        userId,
        handleLikeButton,
        handleDeleteButton,
      ).getView();
      cardsContainer.prepend(cardElement);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmit.textContent = buttonMessage;
    });
}

//API PopupWithAvatar

function handleNewAvatar(data) {
  buttonSubmit.textContent = "Saving...";
  api
    .submitNewAvatar(data)
    .then((result) => {
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmit.textContent = buttonMessage;
    });
}

//API PopupWithConfirmation
function handleConfirmation(cardId, card) {
  buttonSubmit.textContent = "Saving...";
  api
    .submitNewConfirmation(cardId)
    .then(() => {
      return card.remove();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmit.textContent = buttonMessage;
    });
}

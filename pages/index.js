import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

//DOM
const btnEditOpen = document.querySelector(".profile__edit-button");
const btnNewCardOpen = document.querySelector(".profile__add-button");
const formNewCard = document.querySelector("#new-card-form");
const formEditProfile = document.querySelector("#edit-profile-form");
const containerItem = document.querySelector(".cards__list");
const validationConfig = {
  input: ".popup__input",
  button: ".popup__button",
};

//Functions
function handleImageClick(text, image) {
  popupImageClass.open({ link: image, name: text });
}

function fillProfileForm(formElement) {
  const nameElement = document.querySelector(".profile__title");
  const aboutElement = document.querySelector(".profile__description");

  formElement.querySelector(".popup__input_type_name").value =
    nameElement.textContent;

  formElement.querySelector(".popup__input_type_description").value =
    aboutElement.textContent;
}

function handleProfileFormSubmit({ name, description }) {
  fetch("https://around-api.pt-br.tripleten-services.com/v1/users/me", {
    method: "PATCH",
    headers: {
      authorization: "1ea7b6ca-ac6f-43e4-9d93-04922f8ad215",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      } else {
        return res.json();
      }
    })
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        job: result.about,
      });
      popupFormSubmitClass.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleCardFormSubmit(values) {
  fetch("https://around-api.pt-br.tripleten-services.com/v1/cards/", {
    method: "POST",
    headers: {
      authorization: "1ea7b6ca-ac6f-43e4-9d93-04922f8ad215",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: values["place-name"],
      link: values.link,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      const cardElement = new Card(
        result,
        "#template_model",
        handleImageClick,
        userId,
        handleDeleteClick,
      ).getView();
      containerItem.prepend(cardElement);
      popImageClass.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Instances

const userInfo = new UserInfo({
  inputNameSelector: ".profile__title",
  inputJobSelector: ".profile__description",
});

const popupImageClass = new PopupWithImage("#image-popup");
const popImageClass = new PopupWithForm(
  "#new-card-popup",
  handleCardFormSubmit,
);

const popupFormSubmitClass = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit,
);

//Listeners

popupImageClass.setEventListeners();
popImageClass.setEventListeners();
popupFormSubmitClass.setEventListeners();

new FormValidator(validationConfig, formEditProfile).setEventListeners();
new FormValidator(validationConfig, formNewCard).setEventListeners();

btnEditOpen.addEventListener("click", () => {
  fillProfileForm(formEditProfile);
  popupFormSubmitClass.open();
});

btnNewCardOpen.addEventListener("click", () => {
  popImageClass.open();
});

//sprint 12
let userId = "";

fetch("https://around-api.pt-br.tripleten-services.com/v1/users/me", {
  headers: {
    authorization: "1ea7b6ca-ac6f-43e4-9d93-04922f8ad215",
  },
})
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  })
  .then((result) => {
    userId = result._id;
    return fetch("https://around-api.pt-br.tripleten-services.com/v1/cards/", {
      headers: {
        authorization: "1ea7b6ca-ac6f-43e4-9d93-04922f8ad215",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        } else {
          return res.json();
        }
      })
      .then((results) => {
        results.forEach((result) => {
          const newCard = new Card(
            result,
            "#template_model",
            handleImageClick,
            userId,
            handleDeleteClick,
          ).getView();
          containerItem.prepend(newCard);
        });
      });
  })
  .catch((error) => {
    console.log(error);
  });

//delete card
const newPopupWithConfirmation = new PopupWithConfirmation(
  "#popup__delete-card",
);
newPopupWithConfirmation.setEventListeners();

function handleDeleteClick(id, element) {
  newPopupWithConfirmation.open(id, element);
}

//9. Atualização de foto do perfil
import PopupWithAvatar from "../components/PopupWithAvatar.js";
const popupWithAvatar = new PopupWithAvatar("#popup__avatar");
popupWithAvatar.setEventListeners();

const popupAvatarImage = document.querySelector(".profile__avatar-container");

popupAvatarImage.addEventListener("click", () => {
  popupWithAvatar.open();
});

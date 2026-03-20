import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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
  userInfo.setUserInfo({
    name: name,
    job: description,
  });
  popupFormSubmitClass.close();
}

function handleCardFormSubmit(values) {
  const cardElement = new Card(
    {
      name: values["place-name"],
      link: values.link,
    },
    "#template_model",
    handleImageClick,
  ).getView();

  containerItem.prepend(cardElement);
  popImageClass.close();
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

fetch("https://around-api.pt-br.tripleten-services.com/v1/users/me", {
  headers: {
    authorization: "1ea7b6ca-ac6f-43e4-9d93-04922f8ad215",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  })
  .then((result) => {
    return {
      name: result.name,
      about: result.about,
      avatar: result.avatar,
      _id: result._id,
    };
  })
  .catch((error) => {
    console.log(error);
  });

fetch("https://around-api.pt-br.tripleten-services.com/v1/cards/", {
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
      ).getView();
      containerItem.prepend(newCard);
    });
  });
/*
return {
      isLiked: result.isLiked,
      _id: result._id,
      name: result.name,
      link: result.link,
      owner: result.owner,
      createdAt: result.createdAt,
    }; */

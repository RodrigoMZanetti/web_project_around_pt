import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

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

initialCards.forEach((obj) => {
  const cardElement = new Card(
    obj,
    "#template_model",
    handleImageClick,
  ).getView();
  containerItem.prepend(cardElement);
});

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

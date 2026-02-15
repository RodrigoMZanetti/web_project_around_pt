import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, setPopupCloseListeners } from "./utils.js";

/////INITIAL CARDS

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

///DOM
const popupNewCard = document.querySelector("#new-card-popup");
const popupEditProfile = document.querySelector("#edit-popup");
const popupImage = document.getElementById("image-popup");
const formNewCard = document.querySelector("#new-card-form");
const formEditProfile = document.querySelector("#edit-profile-form");
const containerItem = document.querySelector(".cards__list");
const btnEditOpen = document.querySelector(".profile__edit-button");
const btnNewCardOpen = document.querySelector(".profile__add-button");
const imagePreview = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");

///// POPUP CLOSE LISTENERS (X + overlay + ESC)
setPopupCloseListeners(popupEditProfile);
setPopupCloseListeners(popupNewCard);
setPopupCloseListeners(popupImage);

///// IMAGE POPUP
function handleImageClick(text, image) {
  openPopup(popupImage);
  imagePreview.src = image;
  imagePreview.alt = text;
  imageCaption.textContent = text;
}

///// RENDER INITIAL CARDS
initialCards.forEach((obj) => {
  const cardElement = new Card(
    obj,
    "#template_model",
    handleImageClick,
  ).getView();
  containerItem.prepend(cardElement);
});

///// VALIDATION
const validationConfig = {
  input: ".popup__input",
  button: ".popup__button",
};

new FormValidator(validationConfig, formEditProfile).setEventListeners();
new FormValidator(validationConfig, formNewCard).setEventListeners();

///// OPEN POPUPS (EDIT PROFILE)
function fillProfileForm(modalGeral) {
  const nameElement = document.querySelector(".profile__title");
  const aboutElement = document.querySelector(".profile__description");

  modalGeral.querySelector(".popup__input_type_name").value =
    nameElement.textContent;

  modalGeral.querySelector(".popup__input_type_description").value =
    aboutElement.textContent;
}

btnEditOpen.addEventListener("click", () => {
  fillProfileForm(popupEditProfile);
  openPopup(popupEditProfile);
});

///// OPEN POPUP (NEW CARD)
btnNewCardOpen.addEventListener("click", () => {
  openPopup(popupNewCard);
});

///// SUBMIT EDIT PROFILE
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  document.querySelector(".profile__title").textContent =
    formEditProfile.querySelector(".popup__input_type_name").value;

  document.querySelector(".profile__description").textContent =
    formEditProfile.querySelector(".popup__input_type_description").value;

  closePopup(popupEditProfile);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

///// SUBMIT NEW CARD
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const inputCompletObject = {
    name: formNewCard.querySelector(".popup__input_type_card-name").value,
    link: formNewCard.querySelector(".popup__input_type_url").value,
  };

  const cardElement = new Card(
    inputCompletObject,
    "#template_model",
    handleImageClick,
  ).getView();

  containerItem.prepend(cardElement);
  closePopup(popupNewCard);
}

formNewCard.addEventListener("submit", handleCardFormSubmit);

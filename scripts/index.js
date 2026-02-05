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

/////COLECTING ELEMENTS FROM HTML

//POPUPs
const popupNewCard = document.querySelector("#new-card-popup"); // OK
const popupEditProfile = document.querySelector("#edit-popup"); //OK
const popupImage = document.getElementById("image-popup"); // OK
const imagePreview = popupImage.querySelector(".popup__image"); // OK
const imageCaption = popupImage.querySelector(".popup__caption"); // OK

//TEMPLATES
const cardTemplate = document.getElementById("template_model").content; // OK
const formNewCard = document.querySelector("#new-card-form"); // OK

//FORMs
const formEditProfile = document.querySelector("#edit-profile-form"); // OK

//BUTTONS
const btnEditOpen = document.querySelector(".profile__edit-button"); // OK
const btnNewCardOpen = document.querySelector(".profile__add-button"); // OK
const btnSubmitNewCard = formNewCard.querySelector(".popup__button"); // OK
const btnSubmitEdit = formEditProfile.querySelector("#edit__button-submit"); // OK

//INPUTS
const inputCardTitle = formNewCard.querySelector(
  ".popup__input_type_card-name",
); // OK
const inputCardLink = formNewCard.querySelector(".popup__input_type_url"); // OK
const inputProfileName = formEditProfile.querySelector(
  ".popup__input_type_name", // OK
);
const inputProfileAbout = formEditProfile.querySelector(
  ".popup__input_type_description", // OK
);

/////INITIAL CARDS MODEL
initialCards.forEach(function (item) {
  let nameCardItem = item.name;
  let nameCardImage = item.link;
  let containerItem = document.querySelector(".cards__list");
  renderCard(nameCardItem, nameCardImage, containerItem);
});

/////OPENING POPUPs

//OPENING FUNCTION
function handleOpenEditModal(modalGeral) {
  fillProfileForm(modalGeral);
  openModal(modalGeral);
  resetForm(formEditProfile, btnSubmitEdit);
}

//OPENING NEW CARD BUTTON
btnNewCardOpen.addEventListener("click", function () {
  resetForm(formNewCard, btnSubmitNewCard);
  openModal(popupNewCard);
});

//OPENING NEW PROFILE BUTTON
btnEditOpen.addEventListener("click", function () {
  handleOpenEditModal(popupEditProfile);
});

//OPENING MODAL FUNCTION
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

/////NEW INPUTS

//NEW NAME AND EXPERIENCE INPUT
function fillProfileForm(modalGeral) {
  const nameElement = document.querySelector(".profile__title");
  const nameElementInput = modalGeral.querySelector(".popup__input_type_name");
  const nameElementText = nameElement.textContent;
  nameElementInput.value = nameElementText;

  const experienceElement = document.querySelector(".profile__description");
  const experienceText = experienceElement.textContent;
  const experienceInput = modalGeral.querySelector(
    ".popup__input_type_description",
  );
  experienceInput.value = experienceText;
}

//NEW NAME AND JOB INPUT
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = popupEditProfile.querySelector(".popup__input_type_name");
  const nameInputValue = nameInput.value;
  const nameElement = document.querySelector(".profile__title");
  nameElement.textContent = nameInputValue;

  let jobInput = popupEditProfile.querySelector(
    ".popup__input_type_description",
  );
  const jobInputValue = jobInput.value;
  const experienceElement = document.querySelector(".profile__description");
  experienceElement.textContent = jobInputValue;

  closeModal(popupEditProfile);
}

//NEW NAME AND LOCAL INPUT
function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  const likeButtonItem = cardElement.querySelector(".card__like-button");
  likeButtonItem.addEventListener("click", function () {
    likeButtonItem.classList.toggle("card__like-button_is-active");
  });

  const deleteButtonItem = cardElement.querySelector(".card__delete-button");
  deleteButtonItem.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    openModal(popupImage);
    imagePreview.src = link;
    imagePreview.alt = name;
    imageCaption.textContent = name;
  });

  return cardElement;
}

//CREATING NEW CARD FUNCTION
function renderCard(name, link, container) {
  let newCard = getCardElement(name, link);
  return container.prepend(newCard);
}

//SUBMITING NEW PROFILE
formEditProfile.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
});

//SUBMITING NEW CARD
formNewCard.addEventListener("submit", function (evt) {
  handleCardFormSubmit(evt);
});

//NEW CARD FUNCTION
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = popupNewCard.querySelector(".popup__input_type_card-name");
  const nameInputValue = nameInput.value;

  let imageInput = popupNewCard.querySelector(".popup__input_type_url");
  const imageInputValue = imageInput.value;

  const newCardComplete = document.querySelector(".cards__list");

  renderCard(nameInputValue, imageInputValue, newCardComplete);

  closeModal(popupNewCard);
}

/////CLOSING POPUPs

//CLOSING POPUP CLICKING OUTSIDE
function closePopUps(popUp) {
  const closePopUpButton = popUp.querySelector(".popup__close");
  popUp.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeModal(popUp);
    }
  });

  //CLOSING BUTTON
  closePopUpButton.addEventListener("click", () => {
    closeModal(popUp);
  });
}

//CLOSING MODAL FUNCTION
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

//CLOSE USING ESCAPE KEY
function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup.popup_is-opened");
    closeModal(openedPopup);
  }
}

//RESET FUNCTION
function resetForm(form, button) {
  const allSpans = form.querySelectorAll("span");
  allSpans.forEach((span) => {
    span.textContent = "";
  });
  button.disabled = true;
}

//CALLING THE FUNCTIONs
closePopUps(popupEditProfile);
closePopUps(popupNewCard);
closePopUps(popupImage);

/////SPAN MESSAGES

//NAME INPUT SPAN
let newElementMessage = document.createElement("span");
inputProfileName.after(newElementMessage);

inputProfileName.addEventListener("input", () => {
  const checkName = inputProfileName.checkValidity();

  if (!checkName) {
    newElementMessage.textContent = inputProfileName.validationMessage;
    newElementMessage.classList.add("span-message");
  } else {
    newElementMessage.textContent = "";
    newElementMessage.classList.remove("span-message");
  }
  validationButton(formEditProfile, btnSubmitEdit);
});

//DESCRIPTION INPUT SPAN
let newDescriptionMessage = document.createElement("span");
inputProfileAbout.after(newDescriptionMessage);

inputProfileAbout.addEventListener("input", () => {
  const checkDescription = inputProfileAbout.checkValidity();

  if (!checkDescription) {
    newDescriptionMessage.textContent = inputProfileAbout.validationMessage;
    newDescriptionMessage.classList.add("span-message");
  } else {
    newDescriptionMessage.textContent = "";
    newDescriptionMessage.classList.remove("span-message");
  }
  validationButton(formEditProfile, btnSubmitEdit);
});

//VALIDATION BUTTON
function validationButton(form, button) {
  const verificationForm = form.checkValidity();
  if (verificationForm) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

//NAME AND LOCAL VALIDATION
let inputCardTitleMessage = document.createElement("span");
inputCardTitle.after(inputCardTitleMessage);

inputCardTitle.addEventListener("input", () => {
  const cardNameValidation = inputCardTitle.checkValidity();
  if (!cardNameValidation) {
    inputCardTitleMessage.textContent = inputCardTitle.validationMessage;
    inputCardTitleMessage.classList.add("span-message");
  } else {
    inputCardTitleMessage.textContent = "";
    inputCardTitleMessage.classList.remove("span-message");
  }
  validationButton(formNewCard, btnSubmitNewCard);
});

//LINK VALIDATION
let inputCardLinkMessage = document.createElement("span");
inputCardLink.after(inputCardLinkMessage);

inputCardLink.addEventListener("input", () => {
  const validationUrl = inputCardLink.checkValidity();

  if (!validationUrl) {
    inputCardLinkMessage.textContent = inputCardLink.validationMessage;
    inputCardLinkMessage.classList.add("span-message");
  } else {
    inputCardLinkMessage.textContent = "";
    inputCardLinkMessage.classList.remove("span-message");
  }
  validationButton(formNewCard, btnSubmitNewCard);
});

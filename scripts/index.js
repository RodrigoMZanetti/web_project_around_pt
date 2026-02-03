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

let formElement = document.querySelector("#edit-profile-form");
formElement.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
});

const modalGeral = document.querySelector("#edit-popup");
let formNewCard = document.querySelector("#new-card-form");
const buttonPopUpLocal = formNewCard.querySelector(".popup__button");

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function () {
  handleOpenEditModal(modalGeral);
});

function handleOpenEditModal(modalGeral) {
  fillProfileForm(modalGeral);
  openModal(modalGeral);
  validationButton(formElement, buttonSubmitForm);
}

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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = modalGeral.querySelector(".popup__input_type_name");
  const nameInputValue = nameInput.value;
  const nameElement = document.querySelector(".profile__title");
  nameElement.textContent = nameInputValue;

  let jobInput = modalGeral.querySelector(".popup__input_type_description");
  const jobInputValue = jobInput.value;
  const experienceElement = document.querySelector(".profile__description");
  experienceElement.textContent = jobInputValue;

  closeModal(modalGeral);
}

const closeButton = modalGeral.querySelector(".popup__close");
closeButton.addEventListener("click", function () {
  closeModal(modalGeral);
});

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

const modelTemplate = document.getElementById("template_model").content;

const modalImage = document.getElementById("image-popup");
const popupImage = modalImage.querySelector(".popup__image");
const imageLegend = modalImage.querySelector(".popup__caption");
const imageClose = modalImage.querySelector(".popup__close");
imageClose.addEventListener("click", function () {
  closeModal(modalImage);
});

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
  const cardElement = modelTemplate.querySelector(".card").cloneNode(true);
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
    openModal(modalImage);
    popupImage.src = link;
    popupImage.alt = name;
    imageLegend.textContent = name;
  });

  return cardElement;
}

function renderCard(name, link, container) {
  let newCard = getCardElement(name, link);
  return container.prepend(newCard);
}

initialCards.forEach(function (item) {
  let nameCardItem = item.name;
  let nameCardImage = item.link;
  let containerItem = document.querySelector(".cards__list");
  renderCard(nameCardItem, nameCardImage, containerItem);
});

const modalNewCard = document.querySelector("#new-card-popup");
const buttonOpenNewCard = document.querySelector(".profile__add-button");
const buttonCloseNewCard = modalNewCard.querySelector(".popup__close");

buttonOpenNewCard.addEventListener("click", function () {
  openModal(modalNewCard);
  validationButton(formNewCard, buttonPopUpLocal);
});

buttonCloseNewCard.addEventListener("click", function () {
  closeModal(modalNewCard);
});

formNewCard.addEventListener("submit", function (evt) {
  handleCardFormSubmit(evt);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = modalNewCard.querySelector(".popup__input_type_card-name");
  const nameInputValue = nameInput.value;

  let imageInput = modalNewCard.querySelector(".popup__input_type_url");
  const imageInputValue = imageInput.value;

  const newCardComplete = document.querySelector(".cards__list");

  renderCard(nameInputValue, imageInputValue, newCardComplete);

  closeModal(modalNewCard);
}

///////////////////// sprint 9 TASK 1

////// PEGANDO OS ELEMENTOS
const idName = formElement.querySelector(".popup__input_type_name");
const idDescription = formElement.querySelector(
  ".popup__input_type_description",
);
const buttonSubmitForm = formElement.querySelector("#edit__button-submit");

////// SPAN PARA O NAME
let newElementMessage = document.createElement("span");
idName.after(newElementMessage);

idName.addEventListener("input", () => {
  const checkName = idName.checkValidity();

  if (!checkName) {
    newElementMessage.textContent = idName.validationMessage;
    newElementMessage.classList.add("span-message");
  } else {
    newElementMessage.textContent = "";
    newElementMessage.classList.remove("span-message");
  }
  validationButton(formElement, buttonSubmitForm);
});

////// SPAN PARA O DESCRIPTION
let newDescriptionMessage = document.createElement("span");
idDescription.after(newDescriptionMessage);

idDescription.addEventListener("input", () => {
  const checkDescription = idDescription.checkValidity();

  if (!checkDescription) {
    newDescriptionMessage.textContent = idDescription.validationMessage;
    newDescriptionMessage.classList.add("span-message");
  } else {
    newDescriptionMessage.textContent = "";
    newDescriptionMessage.classList.remove("span-message");
  }
  validationButton(formElement, buttonSubmitForm);
});

////// VALIDAÇÃO DO BOTÃO

function validationButton(form, button) {
  const verificationForm = form.checkValidity();
  if (verificationForm) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

/////TASK 2 - SPRINT 9

const newCardName = formNewCard.querySelector(".popup__input_type_card-name");
const newLocalUrl = formNewCard.querySelector(".popup__input_type_url");

/////VALIDAÇÃO DO NOME DO LOCAL
let newCardNameMessage = document.createElement("span");
newCardName.after(newCardNameMessage);

newCardName.addEventListener("input", () => {
  const cardNameValidation = newCardName.checkValidity();
  if (!cardNameValidation) {
    newCardNameMessage.textContent = newCardName.validationMessage;
    newCardNameMessage.classList.add("span-message");
  } else {
    newCardNameMessage.textContent = "";
    newCardNameMessage.classList.remove("span-message");
  }
  validationButton(formNewCard, buttonPopUpLocal);
});

/////VALIDAÇÃO DA NOVA URL DO LOCAL
let newUrlMessage = document.createElement("span");
newLocalUrl.after(newUrlMessage);

newLocalUrl.addEventListener("input", () => {
  const validationUrl = newLocalUrl.checkValidity();

  if (!validationUrl) {
    newUrlMessage.textContent = newLocalUrl.validationMessage;
    newUrlMessage.classList.add("span-message");
  } else {
    newUrlMessage.textContent = "";
    newUrlMessage.classList.remove("span-message");
  }
  validationButton(formNewCard, buttonPopUpLocal);
});

/////TASK 3 SPRINT 9 - FECHAR POPUP CLICANDO FORA
const allPopUps = document.querySelectorAll(".popup");

allPopUps.forEach((popUp) => {
  popUp.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeModal(popUp);
    }
  });
});

/////TASK 4 SPRINT 9 - FECHAR POPUP CLICANDO ESC

document.addEventListener("keydown", (event) => {
  const modalAberto = document.querySelector(".popup.popup_is-opened");
  if (event.key === "Escape" && modalAberto) {
    closeModal(modalAberto);
  }
});

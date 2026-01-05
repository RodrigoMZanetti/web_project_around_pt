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

initialCards.forEach(function (item) {
  console.log(item.name);
});

const modalGeral = document.querySelector("#edit-popup");

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", function () {
  handleOpenEditModal(modalGeral);
});

function handleOpenEditModal(modalGeral) {
  fillProfileForm(modalGeral);
  openModal(modalGeral);
}

function fillProfileForm(modalGeral) {
  const nameElement = document.querySelector(".profile__title");
  const nameElementInput = modalGeral.querySelector(".popup__input_type_name");
  const nameElementText = nameElement.textContent;
  nameElementInput.value = nameElementText;

  const experienceElement = document.querySelector(".profile__description");
  const experienceText = experienceElement.textContent;
  const experienceInput = modalGeral.querySelector(
    ".popup__input_type_description"
  );
  experienceInput.value = experienceText;
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

let formElement = document.querySelector("#edit-profile-form");
formElement.addEventListener("submit", function (evt) {
  handleProfileFormSubmit(evt);
});

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

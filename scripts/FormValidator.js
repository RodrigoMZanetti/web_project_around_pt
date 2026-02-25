class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.input));
    this._buttonElement = formElement.querySelector(config.button);
  }

  /////verificar a validade do campo

  #verification(element) {
    const isValid = element.checkValidity();
    const spanElement = element.nextElementSibling;

    if (!isValid) {
      spanElement.textContent = element.validationMessage;
      spanElement.classList.add("span-message");
    } else {
      spanElement.textContent = "";
      spanElement.classList.remove("span-message");
    }
  }

  /////alterar o estado do botão Submit

  #subButtonAlteration() {
    const verificationInput = this._inputList.some(
      (input) => input.checkValidity() === false,
    );
    if (verificationInput) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }

  /////adicionar todos os manipuladores necessários.

  #addManipulators() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this.#verification(input);
        this.#subButtonAlteration();
      });
    });
  }

  /////habilita a validação do formulário.

  setEventListeners() {
    this.#subButtonAlteration();
    this.#addManipulators();
  }
}

/////SPRINT 11

//CLASS SECTION CREATION

class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  render() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    const container = document.querySelector(this._selector);
    container.append(element);
  }
}

//CLASS Popup CREATION

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    const closeButtonPopup = this._popup.querySelector(".popup__close");
    closeButtonPopup.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) this.close();
    });
  }
}

//CLASS PopupWithImage CREATION

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector("img");
    this._imageText = this._popup.querySelector(".popup__caption");
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._imageText.textContent = name;
    super.open();
  }
}

//Criação da classe PopupWithForm
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
  }

  _getInputValues() {
    const allInputs = this._popup.querySelectorAll(".popup__input");
    let inputArray = {};
    allInputs.forEach((input) => {
      inputArray[input.name] = input.value;
    });
    return inputArray;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}

const popupImageClass = new PopupWithImage("#image-popup");
const popupFormSubmitClass = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit,
);
const popImageClass = new PopupWithForm(
  "#new-card-popup",
  handleCardFormSubmit,
);

//Criação da classe UserInfo
class UserInfo {
  constructor({ inputNameSelector, inputJobSelector }) {
    this._inputName = document.querySelector(inputNameSelector);
    this._inputJob = document.querySelector(inputJobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._inputName.textContent,
      job: this._inputJob.textContent,
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._inputName.textContent = userInfo.name;
    this._inputJob.textContent = userInfo.job;
  }
}

/////////////
export default FormValidator;

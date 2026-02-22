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

/////SPRINT 11 - CLASS SECTION CREATION

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

export default FormValidator;

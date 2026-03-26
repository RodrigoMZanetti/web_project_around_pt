class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.input));
    this._buttonElement = formElement.querySelector(config.button);
  }

  #validate(element) {
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

  #updateSubmitButtonState() {
    const verificationInput = this._inputList.some(
      (input) => input.checkValidity() === false,
    );
    if (verificationInput) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }

  #setInputEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this.#validate(input);
        this.#updateSubmitButtonState();
      });
    });
  }

  setEventListeners() {
    this.#updateSubmitButtonState();
    this.#setInputEventListeners();
  }
}

export default FormValidator;

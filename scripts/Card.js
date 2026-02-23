class Card {
  constructor(data, elementSelector) {
    this._text = data.name;
    this._image = data.link;
    this._elementSelector = elementSelector;
    this._handleImageClick = handleImageClick;
  }

  /////PEGA OS ELEMENTOS DO TEMPLATE
  #getTemplate() {
    //CLONA O TEMPLATE
    const cardTemplate = document
      .querySelector(this._elementSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    //ARMAZENA EM UM ELEMENTO
    this._element = cardTemplate;

    //PEGA O BOTÃO DE LIKE
    const likeButton = this._element.querySelector(".card__like-button");
    this._likeButton = likeButton;

    //PEGA O BOTÃO DE DELETE
    const delButton = this._element.querySelector(".card__delete-button");
    this._delButton = delButton;

    //PEGA IMAGE
    const imageTemplate = this._element.querySelector(".card__image");
    this._imageElement = imageTemplate;

    //PEGA TITLE
    const titleTemplate = this._element.querySelector(".card__title");
    this._textElement = titleTemplate;

    return this._element;
  }

  /////CRIA MÉTODO DE EVENTOS
  //LIKE
  #createListeners() {
    this._likeButton.addEventListener("click", () => {
      this.#handleLikeClick();
    });

    //DELETE
    this._delButton.addEventListener("click", () => {
      this.#handleDeleteClick();
    });

    //ABRIR POPUP QUANDO CLICA NA IMAGE
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._text, this._image);
    });
  }

  /////CRIA MÉTODOS DE MUDANÇAS
  #handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  #handleDeleteClick() {
    this._element.remove();
  }

  /////CRIANDO O TEMPLATE VISÍVEL
  getView() {
    this.#getTemplate();
    this.#showTemplate();
    this.#createListeners();
    return this._element;
  }

  /////MOSTRAR O NOVO CARD
  #showTemplate() {
    this._textElement.textContent = this._text;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._text;
  }
}

export default Card;

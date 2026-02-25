class Card {
  constructor(data, elementSelector, handleImageClick) {
    this._text = data.name;
    this._image = data.link;
    this._elementSelector = elementSelector;
    this._handleImageClick = handleImageClick;
  }

  // Get elements from the template
  #getTemplate() {
    //Clone the template
    const cardTemplate = document
      .querySelector(this._elementSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // Store it in a variable
    this._element = cardTemplate;

    //Like button
    const likeButton = this._element.querySelector(".card__like-button");
    this._likeButton = likeButton;

    //Delete button
    const delButton = this._element.querySelector(".card__delete-button");
    this._delButton = delButton;

    //Image
    const imageTemplate = this._element.querySelector(".card__image");
    this._imageElement = imageTemplate;

    //Title
    const titleTemplate = this._element.querySelector(".card__title");
    this._textElement = titleTemplate;

    return this._element;
  }

  //Event listeners
  //Like
  #createListeners() {
    this._likeButton.addEventListener("click", () => {
      this.#handleLikeClick();
    });

    //Delete
    this._delButton.addEventListener("click", () => {
      this.#handleDeleteClick();
    });

    //Open image popup on click
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._text, this._image);
    });
  }

  //Handler methods
  #handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  #handleDeleteClick() {
    this._element.remove();
  }

  //Public method: returns the card element
  getView() {
    this.#getTemplate();
    this.#showTemplate();
    this.#createListeners();
    return this._element;
  }

  //Show new card
  #showTemplate() {
    this._textElement.textContent = this._text;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._text;
  }
}

export default Card;

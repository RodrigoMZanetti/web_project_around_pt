class Card {
  constructor(
    data,
    elementSelector,
    handleImageClick,
    userId,
    handleLikeButton,
    handleDeleteButton,
  ) {
    this._text = data.name;
    this._image = data.link;
    this._id = data._id;

    this._elementSelector = elementSelector;
    this._handleImageClick = handleImageClick;
    this._userId = userId;

    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;

    this._isLiked = data.isLiked;
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
      this.#handleLikeButton();
    });

    this._delButton.addEventListener("click", () => {
      this._handleDeleteButton(this._id, this._element);
    });

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._text, this._image);
    });
  }

  //Handler methods
  #handleLikeButton() {
    this._handleLikeButton(this);
  }

  //like e remover likes

  updateLikes(isLiked) {
    this._isLiked = isLiked;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  getView() {
    this.#getTemplate();
    this.#showTemplate();
    this.#createListeners();
    this.updateLikes(this._isLiked);
    return this._element;
  }

  #showTemplate() {
    this._textElement.textContent = this._text;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._text;
  }
}

export default Card;

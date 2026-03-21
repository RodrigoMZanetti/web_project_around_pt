class Card {
  constructor(
    data,
    elementSelector,
    handleImageClick,
    userId,
    handleDeleteClick,
  ) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes || [];
    this._id = data._id;

    this._elementSelector = elementSelector;
    this._handleImageClick = handleImageClick;
    this._userId = userId;

    this._isLiked = this._likes.some((like) => {
      return like._id === this._userId;
    });

    this._handleDeleteClick = handleDeleteClick;
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

    this._delButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this._element);
    });

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._text, this._image);
    });
  }

  //Handler methods
  #handleLikeClick() {
    if (!this._isLiked) {
      fetch(
        `https://around-api.pt-br.tripleten-services.com/v1/cards/${this._id}/likes`,
        {
          method: "PUT",
          headers: {
            authorization: "1ea7b6ca-ac6f-43e4-9d93-04922f8ad215",
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
          }
          return res.json();
        })
        .then((result) => {
          this._likes = result.likes;
          this._isLiked = true;
          this._likeButton.classList.add("card__like-button_is-active");
        })
        .catch((err) => console.log(err));
    } else {
      fetch(
        `https://around-api.pt-br.tripleten-services.com/v1/cards/${this._id}/likes`,
        {
          method: "DELETE",
          headers: {
            authorization: "1ea7b6ca-ac6f-43e4-9d93-04922f8ad215",
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
          }
          return res.json();
        })
        .then((result) => {
          this._likes = result.likes;
          this._isLiked = false;
          this._likeButton.classList.remove("card__like-button_is-active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getView() {
    this.#getTemplate();
    this.#showTemplate();
    this.#createListeners();
    return this._element;
  }

  #showTemplate() {
    this._textElement.textContent = this._text;
    this._imageElement.src = this._image;
    this._imageElement.alt = this._text;
  }
}

export default Card;

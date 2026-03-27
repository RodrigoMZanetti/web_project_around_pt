class API {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest(URL, method, body) {
    return fetch(`${this._baseUrl}/${URL}`, {
      method: method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }

  getUserInfo() {
    return this._makeRequest("users/me", "GET");
  }

  getInitialCards() {
    return this._makeRequest("cards", "GET");
  }

  addLike(cardId) {
    return this._makeRequest(`cards/${cardId}/likes`, "PUT");
  }

  deleteLike(cardId) {
    return this._makeRequest(`cards/${cardId}/likes`, "DELETE");
  }

  updateUserInfo(data) {
    return this._makeRequest(`users/me`, "PATCH", {
      name: data.name,
      about: data.description,
    });
  }

  createCard({ name, link }) {
    return this._makeRequest(`cards`, "POST", { name, link });
  }

  createNewAvatar(data) {
    return this._makeRequest(`users/me/avatar`, "PATCH", {
      avatar: data.avatar,
    });
  }

  createNewConfirmation(cardId) {
    return this._makeRequest(`cards/${cardId}`, "DELETE");
  }
}

export default API;

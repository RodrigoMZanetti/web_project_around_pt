class API {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      } else {
        return res.json();
      }
    });
  }
}
export default API;

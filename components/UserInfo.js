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

export default UserInfo;

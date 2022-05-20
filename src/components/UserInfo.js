export default class UserInfo {
  
  constructor(accountName, accountJob, accountAvatar, userId) {
    this._nameElem = accountName;
    this._jobElem = accountJob;
    this._avatarElem = accountAvatar;
    this._userId = userId;
    this._job = "";
    this._name = "";
    this._avatar = "";

  }

  updateUserInfo() {
    this._nameElem.textContent = this._name;
    this._jobElem.textContent = this._job;
    this._avatarElem.style.backgroundImage = `url(${this._avatar})`;
  }

  setUserInfo(newName, newJob, newAvatar, userId) {
    this._name = newName;
    this._job = newJob;
    this._avatar = newAvatar;
    this._userId = userId;
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job,
      avatar: this._avatar,
      userId: this._userId,
    };
  }
}

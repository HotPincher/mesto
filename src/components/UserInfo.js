export default class UserInfo {
constructor(accountName, accountJob, accountAvatar) {
        this._nameElem = accountName;
        this._jobElem = accountJob;
        this._avatarElem = accountAvatar;
        this._job = '';
        this._name = '';
        this._avatar = '';
    }

    updateUserInfo() {
        this._nameElem.textContent = this._name;
        this._jobElem.textContent = this._job;
        this._avatarElem.style.backgroundImage = `url(${this._avatar})`;
    }

    setUserInfo(newName, newJob, newAvatar) {
        this._name = newName;
        this._job = newJob;
        this._avatar = newAvatar
    }

    getUserInfo() {
        return {
            name: this._name,
            job: this._job,
            avatar: this._avatar,
        }
    }
}
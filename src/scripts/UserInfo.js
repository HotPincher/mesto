export default class UserInfo {
    constructor (accountName, accountJob) {
        this._nameElem = accountName;
        this._jobElem = accountJob;
        this._job = '';
        this._name = '';
    }

    updateUserInfo () {
        this._nameElem.textContent = this._name;
        this._jobElem.textContent = this._job;
    }

    setUserInfo (newName, newJob) {
        this._name = newName;
        this._job = newJob;
    }

    getUserInfo () {
        return {
            name: this._name,
            job: this._job
        }
    }
}
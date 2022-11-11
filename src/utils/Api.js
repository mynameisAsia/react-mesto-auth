class Api {
    constructor() {
      
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json(); 
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch ('https://nomoreparties.co/v1/cohort-50/users/me', {
            method: 'GET',
            headers: {
                authorization: 'd4f68056-59ea-430a-8f1d-8d7b59fc70d1',
                'Content-Type': 'application/json'
            }
        })
            .then (this._getResponseData)
    }
  
    getInitialCards() {
        return fetch ('https://mesto.nomoreparties.co/v1/cohort-50/cards', {
            method: 'GET',
            headers: {
                authorization: 'd4f68056-59ea-430a-8f1d-8d7b59fc70d1'
            }
        })
            .then (this._getResponseData)
    }

    updateUserInfo(data) {
        return fetch ('https://nomoreparties.co/v1/cohort-50/users/me', {
            method: 'PATCH',
            headers: {
                authorization: 'd4f68056-59ea-430a-8f1d-8d7b59fc70d1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then (this._getResponseData)
    }

    addNewCard(data) {
        return fetch ('https://mesto.nomoreparties.co/v1/cohort-50/cards', {
            method: 'POST',
            headers: {
                authorization: 'd4f68056-59ea-430a-8f1d-8d7b59fc70d1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then (this._getResponseData)
    }

    likeCards(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-50/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: 'd4f68056-59ea-430a-8f1d-8d7b59fc70d1',
                'Content-Type': 'application/json'
            }
        })
            .then (this._getResponseData)
    }

    removeLike(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-50/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: 'd4f68056-59ea-430a-8f1d-8d7b59fc70d1',
                'Content-Type': 'application/json'
            },
        })
            .then (this._getResponseData)
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-50/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: 'd4f68056-59ea-430a-8f1d-8d7b59fc70d1',
                'Content-Type': 'application/json'
            },
        })
            .then (this._getResponseData)
    }

    changeAvatar(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-50/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: 'd4f68056-59ea-430a-8f1d-8d7b59fc70d1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then (this._getResponseData)
    }
  }

export const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
      authorization: 'd4f68056-59ea-430a-8f1d-8d7b59fc70d1',
      'Content-Type': 'application/json'
    }
  })

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  // обработчик ответа
  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Произошла ошибка: ${res.status}`)
  }

  // получение карточек
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  // добавление карточки
  addCard(dataCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(dataCard),
    }).then(this._handleResponse)
  }

  // получение информации о профиле
  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  // Исправление информации пользователя
  addProfile(dataNewAuthor) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(dataNewAuthor),
    }).then(this._handleResponse)
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  // удаление лайка
  // deleteLike(cardId) {
  //   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //   }).then(this._handleResponse)
  // }

  // // добавление лайка
  // addLike(cardId) {
  //   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //     method: 'PUT',
  //     headers: this._headers,
  //   }).then(this._handleResponse)
  // }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers,
    }).then(this._handleResponse)
  }

  // обновление аватарки
  updateAvatar(avatar) {
    console.log(avatar)
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._handleResponse)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: 'ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef',
    'Content-Type': 'application/json',
  },
})

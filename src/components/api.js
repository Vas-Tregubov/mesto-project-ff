const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-19",
  headers: {
    authorization: "a8fbcde7-37e5-4c27-96cb-428c4a4c4a64",
    "Content-Type": "application/json",
  },
};

const handleResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
};

export const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export const getAllCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export const setProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
};

export const setProfileAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleResponse);
};

export const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const likeCardWithSaveOnServer = (cardId, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  }).then(handleResponse);
};

// export const validateImageUrl = function (url) {
//   return new Promise((resolve, reject) => {
//     fetch(url, { method: "HEAD" })
//       .then((response) => {
//         if (!response.ok) {
//           return reject("Неправильно указан URL или сервер вернул ошибку.");
//         }

//         const contentType = response.headers.get("Content-Type");
//         if (contentType && contentType.startsWith("image/")) {
//           resolve();
//         } else {
//           reject("URL не является изображением.");
//         }
//       })
//       .catch((error) => {
//         reject(error.message || "Произошла ошибка при проверке URL.");
//       });
//   });
// };

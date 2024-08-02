const PATH = "https://nomoreparties.co/v1/wff-cohort-19/";
const TOKEN = "a8fbcde7-37e5-4c27-96cb-428c4a4c4a64";

const handleResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
};

function getUserInformation() {
  return fetch(PATH + "users/me", {
    method: "GET",
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
}

function getAllCards() {
  return fetch(PATH + "cards", {
    method: "GET",
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
}

function setProfileInfo(name, about) {
  return fetch(PATH + "users/me", {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
}

function postNewCard(name, link) {
  return fetch(PATH + "cards", {
    method: "POST",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
}

function deleteCardFromServer(cardId) {
  return fetch(`${PATH}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
  }).then(handleResponse);
}

export { getUserInformation, getAllCards, setProfileInfo, postNewCard, deleteCardFromServer };

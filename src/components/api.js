const PATH = "https://nomoreparties.co/v1/wff-cohort-19/";
const TOKEN = "a8fbcde7-37e5-4c27-96cb-428c4a4c4a64";

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
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

export { getUserInformation, getAllCards };

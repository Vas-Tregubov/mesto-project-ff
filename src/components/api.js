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

// function getCardsFromServer() {
//   return fetch("https://nomoreparties.co/v1/wff-cohort-19/cards", {
//     method: "GET",
//     headers: {
//       authorization: "a8fbcde7-37e5-4c27-96cb-428c4a4c4a64",
//     },
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Что-то пошло не так: ${res.status}`);
//     })

//     .catch((err) => {
//       console.log(`${err} Ошибка. Запрос не выполнен`);
//     });
// }

export { getUserInformation };

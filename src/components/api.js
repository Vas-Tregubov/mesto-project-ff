import { profileTitle, profileDescription, profileImage } from "../index";

function getUserInformation() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-19/users/me", {
    method: "GET",
    headers: {
      authorization: "a8fbcde7-37e5-4c27-96cb-428c4a4c4a64",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      profileImage.style.backgroundImage = `url('${user.avatar}')`;
    })
    .catch((err) => {
      console.log(`${err} Ошибка. Запрос не выполнен`);
    });
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

export { getUserInformation }
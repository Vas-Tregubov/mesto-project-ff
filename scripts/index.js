const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function addCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode('true');
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  return cardElement;
}

function deleteCard (evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function renderInitialCards () {
  initialCards.forEach((elem) => placesList.append(addCard(elem, deleteCard)));
}

renderInitialCards();  
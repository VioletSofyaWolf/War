'use strict';

let deckId;

const newDeck = document.getElementById('new-deck');
const drawCards = document.getElementById('draw-cards');

const getNewDeck = () => {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      console.log(deckId);
    });
};

const getCards = () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      const cardOne = data.cards[0].image;
      const cardTwo = data.cards[1].image;
      document.getElementById('cards').innerHTML = `
        <img src=${cardOne} />
        <img src=${cardTwo} />
      `;
    });
};

newDeck.addEventListener('click', getNewDeck);
drawCards.addEventListener('click', getCards);

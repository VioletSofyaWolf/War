'use strict';

let deckId;
const newDeck = document.getElementById('new-deck');
const drawCards = document.getElementById('draw-cards');
const cardSlots = document.getElementById('cards');
const winner = document.getElementById('winner');
const remaining = document.getElementById('cards-remaining');

const getNewDeck = () => {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      cardsRemaining(data);
    });
};

const getCards = () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      cardsRemaining(data);
      const cardOne = data.cards[0].image;
      const cardTwo = data.cards[1].image;

      cardSlots.children[0].innerHTML = `
        <img class="card" src=${cardOne} />
      `;

      cardSlots.children[1].innerHTML = `
        <img class="card" src=${cardTwo} />      
      `;

      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
      winner.textContent = winnerText;
    });
};

const determineCardWinner = (card1, card2) => {
  const valueOptions = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];

  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    return 'Computer Wins!';
  } else if (card1ValueIndex < card2ValueIndex) {
    return 'You win!';
  } else {
    return 'War!';
  }
};

const cardsRemaining = (data) => {
  remaining.textContent = `
    Cards Remaining: ${data.remaining}
    `;
  data.remaining === 0 ? (drawCards.disabled = true) : '';
};

newDeck.addEventListener('click', getNewDeck);
drawCards.addEventListener('click', getCards);

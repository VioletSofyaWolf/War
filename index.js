'use strict';

let deckId;
const newDeck = document.getElementById('new-deck');
const drawCards = document.getElementById('draw-cards');
const cardSlots = document.getElementById('cards');
const winner = document.getElementById('winner');
const remaining = document.getElementById('cards-remaining');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
let playerScore = 0;
let computerScore = 0;

const getNewDeck = async () => {
  const response = await fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/');
  const data = await response.json();
  deckId = data.deck_id;
  cardsRemaining(data);
};

const getCards = async () => {
  const response = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`);
  const data = await response.json();
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
  gameWinner(data);
};

const determineCardWinner = (card1, card2) => {
  const valueOptions = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];

  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreEl.textContent = `Computer Score: ${computerScore}`;
    return 'Computer Wins!';
  } else if (card1ValueIndex < card2ValueIndex) {
    playerScore++;
    playerScoreEl.textContent = `Player Score: ${playerScore}`;
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

const gameWinner = (data) => {
  if (data.remaining === 0 && computerScore > playerScore) {
    winner.textContent = `Computer won the game!`;
  } else if (data.remaining === 0 && playerScore > computerScore) {
    winner.textContent = `Player won the game!`;
  }
};

newDeck.addEventListener('click', getNewDeck);
drawCards.addEventListener('click', getCards);

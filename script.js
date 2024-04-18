'use strict';

// SELECTING ELEMENTS
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const currentScoreEl = document.querySelector('.current-score');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

// STARTING CONDITIONS
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. GENERATING A RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. DISPLAY DICE

    //// MY WAY!!!!
    diceEl.classList.remove('hidden');
    // if (dice === 2) {
    //   diceEl.src = 'dice-2.png';
    // }
    // if (dice === 3) {
    //   diceEl.src = 'dice-3.png';
    // }
    // if (dice === 4) {
    //   diceEl.src = 'dice-4.png';
    // }
    // if (dice === 5) {
    //   diceEl.src = 'dice-5.png';
    // }
    // if (dice === 6) {
    //   diceEl.src = 'dice-6.png';
    // }

    ///// BEST WAY
    diceEl.src = `dice-${dice}.png`;

    // 3. CHECK FOR ROLLED 1: IF TRUE, SWITCH TO NEXT PLAYER
    if (dice !== 1) {
      // ADD CURRENT DICE TO THE CURRENT SCORE
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. ADD CURRENT SCORE TO THE ACTIVE PLAYER'S SCORE
    scores[activePlayer] += currentScore;

    // score[1] = score[1] + currentScore //
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. CHECK IF PLAYER'S SCORE IS >= 100
    if (scores[activePlayer] >= 100) {
      // 3. FINISH THE GAME
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // btnRoll.classList.add('hidden');
      if (playing) {
        document.querySelector(`#name--${activePlayer}`).textContent =
          '🏆 WINNER';
      } else {
      }
    } else {
      switchPlayer();
    }

    // (IF NOT!) SWITCH TO THE NEXT PLAYERS
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

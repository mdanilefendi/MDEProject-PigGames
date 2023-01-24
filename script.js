'use strict';

// MEMILIH ELEMEN
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// KONDISI AWAL

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

// MEMBUAT FUNGSI DADU
btnRoll.addEventListener('click', function () {
  if (playing) {
    // MENGHASILKAN ANGKA
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    //MENAMPILKAN DADU
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // MENGECEK ANGKA DADU
    if (dice !== 1) {
      // TAMBAH JUMLAH DADU KE NILAI
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // GANTI PEMAIN
      currentScore += dice;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // MENAMBAHKAN NILAI SEBELUMNYA KE SKOR
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    //   scores[1] = scores += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // CEK JIKA NILAI >= 100
    if (scores[activePlayer] >= 10) {
      // SELESAI PERMAINAN
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // GANTI PEMAIN
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

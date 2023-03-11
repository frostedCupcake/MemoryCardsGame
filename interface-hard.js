'use strict';

const cards = document.querySelectorAll('.card');
const modal = document.getElementsByClassName('modal')[0];
const heart = document.querySelectorAll('.heart');
const timer = document.querySelector('.timer__time');

let cardOne, cardTwo;
let disableDeck = false;
let matchCardNumber = 0;
let playerLives = 6;
let totalMoves = 0;
let difference = 45;

const gameOver = () => {
  disableDeck = true;
  modal.classList.remove('hide');
  if (playerLives > 0 || matchCardNumber === 10) {
    let modalImg = modal.querySelector('img');
    modalImg.src = 'https://media.giphy.com/media/bXvisWXnktdV5hKRmV/giphy.gif';
    let modalH3 = modal.querySelector('h3');
    modalH3.innerHTML = `Congratulations, You Win in ${totalMoves} moves within ${
      45 - difference
    } seconds!`;
  }

  if (playerLives === 0 || matchCardNumber < 10) {
    let modalImg = modal.querySelector('img');
    modalImg.src = 'https://media.giphy.com/media/fdGbhuUQpGQkkuuzIr/giphy.gif';
    let modalH3 = modal.querySelector('h3');
    modalH3.innerHTML = 'You Lose, Try again!';
  }

  setTimeout(() => {
    window.location.replace('/');
  }, 5000);
};

const matchCards = (img1, img2) => {
  if (img1 === img2) {
    matchCardNumber += 1;
    totalMoves += 1;
    setTimeout(() => {
      cardOne.classList.add('disappear');
      cardTwo.classList.add('disappear');
      cardOne.removeEventListener('click', flipCard);
      cardTwo.removeEventListener('click', flipCard);
      if (matchCardNumber === 10) {
        console.log('done');
        return gameOver();
      }
      cardOne = cardTwo = '';
    }, 200);

    disableDeck = false;
  } else {
    totalMoves += 1;
    playerLives -= 1;
    heart[playerLives].classList.add('hide');
    setTimeout(() => {
      cardOne.classList.add('shake');
      cardTwo.classList.add('shake');
    }, 200);
    setTimeout(() => {
      cardOne.classList.remove('shake', 'flip');
      cardTwo.classList.remove('shake', 'flip');
      cardOne = cardTwo = '';
      disableDeck = false;

      if (playerLives === 0) {
        return gameOver();
      }
    }, 800);
  }
};

const flipCard = (e) => {
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add('flip');
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;

    let imgOne = cardOne.querySelector('img').src;
    let imgTwo = cardTwo.querySelector('img').src;
    disableDeck = true;
    matchCards(imgOne, imgTwo);
  }
};

const shuffleCard = () => {
  matchCardNumber = 0;
  cardOne = cardTwo = '';
  disableDeck = true;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  console.log(arr);
  cards.forEach((card, i) => {
    card.classList.add('flip');
    let imgTag = card.querySelector('img');
    imgTag.src = `../assets/images/img-${arr[i]}.png`;
    card.classList.remove('disappear');
    card.addEventListener('click', flipCard);
  });
  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove('flip');
    });
    disableDeck = false;
  }, 2000);
};

setTimeout(() => {
  let interval = setInterval(() => {
    difference -= 1;
    timer.innerHTML = difference;
    if (difference === 0) {
      clearInterval(interval);
      timer.classList.add('hide');
      gameOver();
    }
  }, 1000);
}, 400);

shuffleCard();

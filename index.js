const cards = document.querySelectorAll('.card');

let cardOne, cardTwo;
let disableDeck = false;
let matchCardNumber = 0;

// const shuffleCard = () => {
//   matchCardNumber = 0;
//   cardOne = cardTwo = '';
//   cards.forEach((card) => {
//     card.addEventListener('click', flipCard);
//   });
// };

const matchCards = (img1, img2) => {
  if (img1 === img2) {
    matchCardNumber += 1;
    // if (matchCardNumber == 10) {
    //   return shuffleCard();
    // }
    setTimeout(() => {
      cardOne.classList.add('hide');
      cardTwo.classList.add('hide');
      cardOne.removeEventListener('click', flipCard);
      cardTwo.removeEventListener('click', flipCard);
      cardOne = cardTwo = '';
    }, 200);

    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add('shake');
      cardTwo.classList.add('shake');
    }, 200);
    setTimeout(() => {
      cardOne.classList.remove('shake', 'flip');
      cardTwo.classList.remove('shake', 'flip');
      cardOne = cardTwo = '';
      disableDeck = false;
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

cards.forEach((card) => {
  card.addEventListener('click', flipCard);
});

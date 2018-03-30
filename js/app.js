// DOM elements

const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const moves = document.querySelector(".moves");
const winner = document.querySelector(".winner");

// Variables

let list = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-anchor",
  "fa-leaf",
  "fa-bicycle",
  "fa-diamond",
  "fa-bomb",
  "fa-leaf",
  "fa-bomb",
  "fa-bolt",
  "fa-bicycle",
  "fa-paper-plane-o",
  "fa-cube"
]; // the list of cards
let firstCard; // variable for first opened card
let secondCard; // variable for second opened card
let movesNumber; // number of card moves
let matchCardNumber; // number of match cards
let stars; // variable for number of stars
let begin; // variable for checking of game begining
let finish; // variable for checking of game finishing
let totalSeconds; // number of game time in seconds
let timer; // variable for setInterval function for timer

// Functions

/**
 * Shuffling of cards in deck
 * @param {array} array
 */
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/**
 * Changing the number of moves
 * @param {number} number
 */
function writeMoves(number) {
  moves.innerHTML = `${number}`;
}

/**
 * Playing again and reseting variables
 */
function refreshDeck() {
  let deckList = "";

  firstCard = "";
  secondCard = "";
  movesNumber = 0;
  matchCardNumber = 0;
  totalSeconds = 0;
  stars = 3;
  begin = false;
  finish = false;
  deck.innerHTML = "";

  writeMoves(movesNumber);
  showStars(stars);
  zeroTime();
  shuffle(list);

  for (const card of list) {
    deckList += `   <li class="card">
            <i class="fa ${card}"></i>
        </li>`;
  }

  deck.insertAdjacentHTML("beforeend", deckList);
}

/* First deck refreshing */
refreshDeck();

/**
 * Changing card to matching mode
 * @param {DOM node} node
 */
function matchCard(node) {
  node.classList.add("match");
}

/**
 * Changing card to hidden mode
 * @param {DOM node} node
 */
function hideCard(node) {
  node.classList.add("notmatch");
  setTimeout(function hide() {
    node.classList.remove("open", "show", "notmatch");
  }, 1000);
}

/**
 * Changing card to opened mode
 * @param {DOM node} node
 */
function openCard(node) {
  node.classList.add("open", "show");
}

/**
 * Changing the number of stars
 * @param {number} number
 */
function showStars(numberStar) {
  if (numberStar == 1) {
    document.getElementById("star3").classList.remove("star");
    document.getElementById("star2").classList.remove("star");
  } else if (numberStar == 2) {
    document.getElementById("star3").classList.remove("star");
  } else if (numberStar == 3) {
    document.getElementById("star3").classList.add("star");
    document.getElementById("star2").classList.add("star");
  }
}

/**
 * Showing card
 * @param {DOM node} node
 */
function showCard(node) {
  /* Opening of first card */
  if (firstCard == "") {
    firstCard = node;
    openCard(firstCard);
  } else {
    /* Opening of second card */
    secondCard = node;
    openCard(secondCard);

    /* Delay for comparing cards*/
    setTimeout(function compare() {
      const firstCardName = firstCard.getElementsByTagName("i")[0].className;
      const secondCardName = secondCard.getElementsByTagName("i")[0].className;

      movesNumber++;
      writeMoves(movesNumber);

      if (movesNumber > 12) {
        stars = 1;
        showStars(1);
      } else if (movesNumber > 9) {
        stars = 2;
        showStars(2);
      }

      /* Matching of first and second opened cards */
      if (firstCardName === secondCardName) {
        matchCard(firstCard);
        matchCard(secondCard);
        matchCardNumber++;

        /* Check for game finishing */
        if (matchCardNumber == 8) {
          finish = true;
          stopTimer();
          popWinner();
        }
      } else {
        hideCard(firstCard);
        hideCard(secondCard);
      }

      firstCard = "";
      secondCard = "";
    }, 1000);
  }
}

/**
 *  Pop-up window in the case of game finishing
 */
function popWinner() {
  winner.classList.add("open"); // Opening of finishing pop-up window
  winner.innerHTML = "";
  let deck = "";

  deck = `<i class="check fa fa-check"></i>
  <p>Congratulations! You Won!<br>
  With ${movesNumber} Moves and ${stars} Stars.<br>Your time is ${pad(
    parseInt(totalSeconds / 60)
  )}:${pad(totalSeconds % 60)}. <br>
  Woooooo!<br>
  <button class="button" onclick="playAgain()">Play again!</button></p>`;

  winner.insertAdjacentHTML("beforeend", deck);
}

/**
 * Playing new game
 */
function playAgain() {
  winner.classList.remove("open"); // Closing of finishing pop-up window
  refreshDeck();
}

/**
 * Paddind 0 to seconds and minutes
 * @param {any} val
 */
function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

/**
 * Setting time
 */
function setTime(minutesLabel, secondsLabel) {
  totalSeconds++;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

/**
 * Reset time
 */
function zeroTime() {
  totalSeconds = 0;
  document.getElementById("minutes").innerHTML = pad(0);
  document.getElementById("seconds").innerHTML = pad(0);
}

/**
 * Setting timer
 */
function setTimer() {
  minutesLabel = document.getElementById("minutes");
  secondsLabel = document.getElementById("seconds");
  timer = setInterval(function() {
    setTime(minutesLabel, secondsLabel);
  }, 1000);
}

/**
 * Stopping timer
 */
function stopTimer() {
  clearInterval(timer);
}

// Event Listeners

/**
 * Listener for clicking cards
 */
deck.addEventListener("click", function(event) {
  /* Enabling of timer after first card showing */
  if (!begin) {
    setTimer();
  }

  let target = event.target;
  if (secondCard == "" && target.tagName == "LI" && !finish) {
    begin = true;
    showCard(target);
  }
});

/**
 * Listener for clicking restart button
 */
restart.addEventListener("click", function(event) {
  stopTimer();
  refreshDeck();
});
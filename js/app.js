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
];

const decklist = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const moves = document.querySelector(".moves");

function refreshDeck() {
  shuffle(list);

  decklist.innerHTML = "";

  let deck = "";

  for (const card of list) {
    deck += `   <li class="card">
            <i class="fa ${card}"></i>
        </li>`;
  }

  decklist.insertAdjacentHTML("beforeend", deck);
}

function writeMoves(number) {
  moves.innerHTML = `${number}`;
}

function shuffle(array) {
  var currentIndex = array.length,
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

refreshDeck();
writeMoves(0);

let firstCard = "";
let secondCard = "";
let movesNumber = 0;
let matchCardNumber = 0;
let stars = 3;
let begin = false;

decklist.addEventListener("click", function(event) {
  if (!begin) {
    set_timer();
  }
  let target = event.target;
  if (secondCard === "" && target.tagName == "LI") {
    begin = true;
    showCard(target);
  }
});

restart.addEventListener("click", function(event) {
  refreshDeck();
  writeMoves(0);
  if (begin) {
    stop_timer();
  }
  zero_timer();
  begin = false;
});

function matchCard(node) {
  node.classList.add("match");
}

function hideCard(node) {
  node.classList.add("notmatch");
  setTimeout(function hide() {
    node.classList.remove("open", "show", "notmatch");
  }, 1000);
}

function openCard(node) {
  node.classList.add("open", "show");
}

function showStars(numberStar) {
  if (numberStar == 0) {
    document.getElementById("star3").classList.remove("star");
    document.getElementById("star2").classList.remove("star");
    document.getElementById("star1").classList.remove("star");
  }
  if (numberStar == 1) {
    document.getElementById("star3").classList.remove("star");
    document.getElementById("star2").classList.remove("star");
  }
  if (numberStar == 2) {
    document.getElementById("star3").classList.remove("star");
  }
}

function showCard(node) {
  if (firstCard == "") {
    firstCard = node;
    openCard(firstCard);
  } else {
    secondCard = node;
    openCard(secondCard);
    setTimeout(function compare() {
      const firstCardName = firstCard.getElementsByTagName("i")[0].className;
      const secondCardName = secondCard.getElementsByTagName("i")[0].className;
      if (firstCardName === secondCardName) {
        matchCard(firstCard);
        matchCard(secondCard);
        matchCardNumber++;
        if (matchCardNumber === 8) {
          popWinner();
          stop_timer();
        }
      } else {
        hideCard(firstCard);
        hideCard(secondCard);
      }
      firstCard = "";
      secondCard = "";
      movesNumber++;
      if (movesNumber > 15) {
        showStars(0);
      } else if (movesNumber > 12) {
        showStars(1);
      } else if (movesNumber > 9) {
        showStars(2);
      }
      writeMoves(movesNumber);
    }, 1000);
  }
}

function popWinner() {
  const winner = document.querySelector(".winner");
  winner.classList.add("open");
  winner.innerHTML = "";
  let deck = "";

  deck = `<p align=center>Congratulations! You Won!<br>
  With ${movesNumber} Moves and ${stars} Stars.<br>Your time is ${pad(
    parseInt(totalSeconds / 60)
  )}:${pad(totalSeconds % 60)}. <br>
  Woooooo!<br>
  <button onclick="again()">Play again!</button></p>`;

  winner.insertAdjacentHTML("beforeend", deck);
}

function again() {
  const winner = document.querySelector(".winner");
  winner.classList.remove("open");
  refreshDeck();
  writeMoves(0);
  stop_timer();
  zero_timer();
  begin = false;
}

function pad(val) {
  valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

let totalSeconds = 0;
function setTime(minutesLabel, secondsLabel) {
  totalSeconds++;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function zero_timer() {
  totalSeconds = 0;
  document.getElementById("minutes").innerHTML = pad(0);
  document.getElementById("seconds").innerHTML = pad(0);
}

function set_timer() {
  minutesLabel = document.getElementById("minutes");
  secondsLabel = document.getElementById("seconds");
  my_int = setInterval(function() {
    setTime(minutesLabel, secondsLabel);
  }, 1000);
}

function stop_timer() {
  clearInterval(my_int);
}

/*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

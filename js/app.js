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

decklist.addEventListener("click", function(event) {
  if (secondCard === "") {
    let target = event.target;

    if (target.tagName == "LI") {
      showCard(target);
    }
  }
});

restart.addEventListener("click", function(event) {
  refreshDeck();
  writeMoves(0);
});

function matchCard(node) {
  node.classList.add("match");
}

function hideCard(node) {
  node.classList.remove("open", "show");
}

function openCard(node) {
  node.classList.add("open", "show");
}

function showCard(node) {
  if (firstCard == "") {
    firstCard = node;
    openCard(firstCard);
  } else {
    secondCard = node;
    openCard(secondCard);
    setTimeout(compare, 1000);

    function compare() {
      const firstCardName = firstCard.getElementsByTagName("i")[0].className;
      const secondCardName = secondCard.getElementsByTagName("i")[0].className;
      if (firstCardName === secondCardName) {
        matchCard(firstCard);
        matchCard(secondCard);
        matchCardNumber++;
        if (matchCardNumber === 8) {
          alert("You are win!");
        }
      } else {
        hideCard(firstCard);
        hideCard(secondCard);
      }
      firstCard = "";
      secondCard = "";
      movesNumber++;
      writeMoves(movesNumber);
    }
  }
}

/*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

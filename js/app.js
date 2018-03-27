/*
 * Create a list that holds all of your cards
 */
let list = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const decklist = document.querySelector(".deck");
const restart = document.querySelector(".restart");

function refreshDeck () {
    shuffle(list);

    decklist.innerHTML = "";
    
    let deck = "";
    
    for (const card of list) {
    deck += `   <li class="card">
            <i class="fa ${card}"></i>
        </li>`;
    }
    
    decklist.insertAdjacentHTML('beforeend', deck);
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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

let selectedCard;
let firstCard = '';
let secondCard = '';

decklist.addEventListener("click", function(event) {
if (secondCard === '') {
    let target = event.target;

    if (target.tagName == 'LI') {
        showCard(target);
    }
}
  
});

function matchCard (node) {
    node.classList.add('match');   
}

function hideCard (node) {
    node.classList.remove('open', 'show')
}

function openCard (node) {
    node.classList.add('open', 'show');
}

function showCard(node) {
    if (firstCard == '') {
     firstCard = node;
     openCard(firstCard);
 } else {
       secondCard = node
       openCard(secondCard);
       setTimeout(compare, 1000);
       function compare () {
           const firstCardName = firstCard.getElementsByTagName("i")[0].className;
           const secondCardName = secondCard.getElementsByTagName("i")[0].className;
         if (firstCardName === secondCardName) {
               matchCard(firstCard);
               matchCard(secondCard);
           } else {
             hideCard(firstCard);
             hideCard(secondCard);
           }
           firstCard = '';
           secondCard = '';
       }
   }     
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


3 challenges

1. Player looses his entire score when he rolls two 6 in a row. After that, its the next players turn. (hint: always save the previous dice roll in a separate variable)

2. add an input field that lets the players change the winning score. (hint: you can read that value with the .value property in JS. use google)

3. add another dice to the game, so that there are two dice now. the player looses his current score when one of them is a 1. ( hint: you will need CSS to position the second dice so take a look at the css code)
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

//document.querySelector('#current-' + activePlayer).textContent = dice;
/*document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
/* innerHTML allows you to change HTML elements rather than textcontent that only changes plain text aka no HTML,
HTML tags must be placed in '' as a string, otherwise the text editor will inteperet it as javascript
*/


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {

      // 1. random number generator
      var dice = Math.floor(Math.random() * 6) + 1;

      //2. display scores
      var diceDOM =document.querySelector('.dice')
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png';

      //3. update the roudn score IF dice roll is more than 1
      if (dice !== 1) { //!== is "different", if dice is different from one then add score up
        //add the score up for corresponding player
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        //change player
        nextPlayer();
      }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    //add current score to GLOBAL
    scores[activePlayer] += roundScore; //scores[activePlayer] + roundscore

    //update UI
    document.querySelector('#score-' + activePlayer).textContent =   scores[activePlayer];

    //check if player won the game
    var defaultScore = 20;
    if (scores[activePlayer] >= defaultScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('Winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // ternary operator, acts like an if else statement, ? = "then", functions like {}.\, : = else
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  /*
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.add('active');
  */

  document.querySelector('.dice').style.display = "none";
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('Winner');
  document.querySelector('.player-1-panel').classList.remove('Winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
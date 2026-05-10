// ADDITIONAL NOTES

  // I just want to say I am actually so happy with how this is coming together so far
  // this feels like one of my first more 'properly' coded things
  // I have made a handful of crappy JS games for codeJams lately but this feels much more polished

  // heres a link to a 'skip ad' game I made for a Kitboga codeJam (the code is attrocious 
  // (see submission.html), but its cool to see where im improving) - https://swangmane.github.io/BogaJam-2026/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ALL IMPORTS LISTED BELOW

import { gameVariables } from './variables.js';
import { updatePlayer } from './player.js';
import { updateEnemy } from './enemy.js';
import { getGrade, updateLogs } from './functions.js';
import { popUp } from './popup.js';

///////////////////////////////////////////////////
///                                             ///
///                POPUP.JS                     ///
///                                             ///
///     - SETS ALL POPUP SCREEN VARIABLES       ///
///     - HEADS OR TAILS                        ///
///     - END GAME                              ///
///                                             ///
///                                             ///
///////////////////////////////////////////////////

// if startBtn is null - set it using the given ID
if (!gameVariables.startBtn) gameVariables.startBtn = document.getElementById(gameVariables.startBtnId); 
else console.log("error finding start button"); // error logger - should never trigger

// link the start button to startGame
gameVariables.startBtn.addEventListener('click', () => {
  gameVariables.startBtn.style.display = 'none';
  setupGame();
})


// game setup | gets everything setup and variables set
export async function setupGame() {

  // initial log
  updateLogs("Starting game", 0, "gameLogs");
  // initial updates
  updatePlayer();
  updateEnemy();

  // to detect who goes first | user plays a coinflip game
  const initialPopup = await popUp("headsOrTails", gameVariables.sayings.coinFlipInitial ,3000);

  // set the current turn number to 1
  gameVariables.turnNumber = 1;

  // run the first gameLoop
  gameLoop();
}

// runs everytime the player uses a button
export async function gameLoop() {
  // grab each of the players buttons for detection
  const buttons = gameVariables.actionBtsArray;

  // keeps the players/enemies stats updating
  updateEnemy("stats");
  updatePlayer("stats");

  // if its not the users turn
  if (!gameVariables.userTurn) {
    // disable the players action buttons
    buttons.forEach((button) => { button.disabled = true; });
    // take the enemies turn and await the results
    await updateEnemy();
  }
  // if it is the users turn, enable their buttons 
  else if (gameVariables.userTurn) {
    // disable the buttons
    buttons.forEach((button) => { button.disabled = false; });
    await updatePlayer();
    console.log("player done | main loop");
  }
  
  // increase the turn number each turn
  gameVariables.turnNumber++;
  console.log('current turn: ' + gameVariables.turnNumber);

  // run gameLoop each time everything is finished
  gameLoop();
}


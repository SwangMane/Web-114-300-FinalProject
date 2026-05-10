// ADDITIONAL NOTES

  // 
  // 
  // 
  //  
  // 

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

// on initial load
// if startBtn is undefined - set it using the given ID
if (!gameVariables.startBtn) gameVariables.startBtn = document.getElementById(gameVariables.startBtnId); 
else console.log("error finding start button"); // error logger - should never trigger | page will not work on this failing

// link the start button to startGame
gameVariables.startBtn.addEventListener('click', () => {
  // hide the start button once clicked | Not used again
  gameVariables.startBtn.style.display = 'none';
  setupGame();
})

/////////////////////////////////////////////////////////
//
//
//
// game setup | gets everything setup and variables set
export async function setupGame() {

  // initial log
  updateLogs("Starting game", 0, "gameLogs");
  // initial updates to set variables before actual game starts
  updatePlayer();
  updateEnemy();

  // to detect who goes first | user plays a coinflip game
  const initialPopup = await popUp("headsOrTails", gameVariables.sayings.coinFlipInitial ,3000);

  // set the current turn number to 1
  gameVariables.turnNumber = 1;

  // run the first gameLoop
  gameLoop();
}
/////////////////////////////////////////////////////
//
//
// main logic of the game
export async function gameLoop() {
  // grab each of the players buttons for detection
  const buttons = gameVariables.actionBtsArray;

  // keeps the players/enemies stats updating
  updateEnemy("stats");
  updatePlayer("stats");

  // if the game is over, leave the function after updating players
  if (gameVariables.gameOver) {
    popUp("gameOver");
    return;
  }; 

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
    // wait for updatePlayer | (users turn)
    await updatePlayer();
  }
  
  // increase the turn number each turn
  gameVariables.turnNumber++;
  console.log('current turn: ' + gameVariables.turnNumber);

  // run gameLoop each time everything is finished
  gameLoop();
}


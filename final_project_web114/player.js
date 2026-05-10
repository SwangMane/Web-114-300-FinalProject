// ALL IMPORTS LISTED BELOW

import { gameVariables } from './variables.js';
import { getGrade, updateLogs, randomNumber } from './functions.js'
import { updateEnemy } from './enemy.js'; 

///////////////////////////////////////////////////
///                                             ///
///                PLAYER.JS                    ///
///                                             ///
///     - SETS ALL PLAYER VARIABLES             ///
///     - HANDLES PLAYER STAT UPDATES           ///
///     - PLAYER TURN EVENT HANDLERS            ///
///                                             ///
///////////////////////////////////////////////////

// handles all player things
export function updatePlayer(type) {

  // logging player update
  // console.log("player updated");

  // set the player icon variable - once
  if (!gameVariables.playerStats.iconDiv) gameVariables.playerStats.iconDiv = document.getElementById(gameVariables.playerStats.iconDivID); 
  // ask the user for a name | names their character - once
  // loop stays active until a valid username is chosen | valid = anything 1 character+
  while (!gameVariables.playerStats.name) {
    // ask the user for a name
    let playerName = prompt("Hello student, what's your name? ");
    // check for blank or invalid entry
    if (playerName === null || playerName === "") {
      playerName = prompt("You need to enter a valid name: ");
    }
    // set players name permenantly
    gameVariables.playerStats.name = playerName;
  }
  
  // set the players name variable - once
  if (!gameVariables.playerStats.nameDiv) {
    gameVariables.playerStats.nameDiv = document.getElementById(gameVariables.playerStats.nameDivID);
    // set the divs inner html to the players name
    gameVariables.playerStats.nameDiv.innerHTML = `<h1 id="${gameVariables.playerStats.name}">${gameVariables.playerStats.name}</h1>`;
  }
  // set all the buttons - once
  if (!gameVariables.actionBtns) {
    // set the damageBtn stuff
    gameVariables.playerStats.damageBtn = document.getElementById(gameVariables.playerStats.damageBtnID);
    gameVariables.playerStats.damageNumDiv = document.getElementById(gameVariables.playerStats.damageNumDivID);

    // set the blockBtn stuff
    gameVariables.playerStats.blockBtn = document.getElementById(gameVariables.playerStats.blockBtnID);
    gameVariables.playerStats.blockNumDiv = document.getElementById(gameVariables.playerStats.blockNumDivID);

    // set the healBtn stuff
    gameVariables.playerStats.healBtn = document.getElementById(gameVariables.playerStats.healBtnID);
    gameVariables.playerStats.healNumDiv = document.getElementById(gameVariables.playerStats.healNumDivID);

    // add each of the buttons to an array for easier access
    gameVariables.actionBtsArray.push(gameVariables.playerStats.damageBtn, gameVariables.playerStats.healBtn, gameVariables.playerStats.blockBtn); 

    gameVariables.actionBtns = true;
    //console.log("player buttons set");
  }

  //always update on turn 0
  if (gameVariables.turnNumber === 0) updateStats();

  // update just the stats if wanted
  if (type === "stats") { 
    updateStats()
    return;
  }

  // if first turn has been decided & its players turn
  if (gameVariables.userTurn && gameVariables.coinFlip) {


    // indicate its the players turn
    const nameH1 = document.getElementById(gameVariables.playerStats.name);
    nameH1.style.background = 'rgb(0,128,0,0.5)';

    // return promist based on button click later on | resolved in finishTurn()
    return new Promise(async (resolve) => {
      // grab the buttons array
      const buttons = gameVariables.actionBtsArray;

      // add the detectButton function to each button. Each button has a unique ID
       buttons.forEach((button) => {
          button.addEventListener('click', detectButton);
       })

      // to detect which button is clicked (each has unique ID) | event passes the entire button element through for checks
      function detectButton(event) {
        // disable the buttons after click to prevent spam
        disableBtns();
        // holds the button pressed as currButton to call associated function
        const currButton = event.currentTarget;
        // listen for each button and determine the players move
        if (currButton.id === "player_dmgBtn") damageEnemy();  // update player with current action and disable buttons
        else if (currButton.id === "player_blockBtn") playerBlock();
        else if (currButton.id === "player_healBtn") healPlayer();
      }

      // damage the enemy X amount
      function damageEnemy() {
        // grab the amount of damage being done to the enemy
        let dmg = Math.floor(Math.random() * (gameVariables.playerStats.damageMax - gameVariables.playerStats.damageMin) + gameVariables.playerStats.damageMin);

        // set blocked to false initially
        let blocked = false

        // save the initial amout of damage done
        const initDmg = dmg;

        // do damage, but check if the enemy has any block first
        if (gameVariables.enemyStats.currBlock > 0) {
          // set blocked to true
          blocked = true;
          // correct the enemies block value | block 'used'
          // 
          // enemyBlock >= damage
          if (gameVariables.enemyStats.currBlock >= dmg) {
            // subract the amount of dmage done from enemies current block
            gameVariables.enemyStats.currBlock -= dmg;
            // update logs with amount of damage blocked 
            updateLogs(gameVariables.enemyStats.name + ' blocked ' + dmg + ' damage', 0, "enemySaying");
            // zero out damage amount
            dmg = 0;
          }
          // enemyBlock < damage
          else if (gameVariables.enemyStats.currBlock < dmg) {
            // subtract the amount of block from damage
            dmg = dmg - gameVariables.enemyStats.currBlock;
            // update logs with amount of damage blocked 
            updateLogs(gameVariables.enemyStats.name + ' blocked ' + gameVariables.enemyStats.currBlock + ' damage', 0, "enemySaying");
            // zero out the enemues currBlock
            gameVariables.enemyStats.currBlock = 0;
          }
        }
        // deal the damage to the enemy
        gameVariables.enemyStats.health -= dmg;

        // if block occured | outut this
        if (blocked) updateLogs(gameVariables.playerStats.name + ' did ' + dmg + ' damage!' + ` (${initDmg} total)`, 0, "playerSaying");
        // if no blocking occured
        else updateLogs(gameVariables.playerStats.name + ' did ' + dmg + ' damage!', 0, "playerSaying");

        //finish layers turn
        finishTurn();
      }

      // apply block to your character | blocks the enemies next attack X amount
      function playerBlock() {
        // grab the players block value
        const block = gameVariables.playerStats.block;
        // log the block amount
        updateLogs(gameVariables.playerStats.name + ' added ' + block + ' block', 0, "playerSaying");
        // add the block amount to the players currBlock
        gameVariables.playerStats.currBlock += block;
        // finish players turn
        finishTurn();
      }

      // heal the player X amount if called
      function healPlayer() {
        // heal amount 
        const heal = Math.floor(Math.random() * (gameVariables.playerStats.healMax - gameVariables.playerStats.healMin) + gameVariables.playerStats.healMin);
        // log the heal amount
        updateLogs(gameVariables.playerStats.name + ' healed for ' + heal + ' health', 0, "playerSaying");
        // add the heal amount to the players health
        gameVariables.playerStats.health += heal;
        // finish the players turn
        finishTurn();
      }

      // to call once a button is pressed | prevents the user from spamming
      function disableBtns(name) {

        // grab the buttons array
        const buttons = gameVariables.actionBtsArray;

        buttons.forEach((button) => { 
          button.disabled = true; 
          button.removeEventListener('click', detectButton);
        });
      }

      function finishTurn() {

        // update players stats immediately
        updatePlayer("stats");
        // same with enemy
        updateEnemy("stats");

        setTimeout(() => {
          // change to the enemies turn
          gameVariables.userTurn = false;
          // reset background color
          nameH1.style.background = 'transparent';

          console.log("player ended turn");
          resolve();
        }, gameVariables.sayings.delay);
      }
    })
  }

  function updateStats() {
    // updates the players grade and health
    gameVariables.playerStats.iconDiv.innerHTML = getGrade(gameVariables.playerStats.health, gameVariables.playerStats.name) + `<div class="currCharNumbersWrap flexed"><h6 class="currCharNumber">Health: ${gameVariables.playerStats.health} | Block: ${gameVariables.playerStats.currBlock}</h6></div>`;
    // updates the players damage variance amount
    gameVariables.playerStats.damageNumDiv.textContent = `(${gameVariables.playerStats.damageMin} - ${gameVariables.playerStats.damageMax})`;
    // update the players block amount
    gameVariables.playerStats.blockNumDiv.textContent = `(${gameVariables.playerStats.block})`;
    // update the players heal variance amount
    gameVariables.playerStats.healNumDiv.textContent = `(${gameVariables.playerStats.healMin} - ${gameVariables.playerStats.healMax})`;
  }
}
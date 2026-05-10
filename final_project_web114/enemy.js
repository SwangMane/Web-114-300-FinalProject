// ALL IMPORTS LISTED BELOW

import { gameVariables } from './variables.js';
import { nameEnemy, getGrade, updateLogs, randomNumber } from './functions.js';
import { updatePlayer } from './player.js';

///////////////////////////////////////////////////
///                                             ///
///                PLAYER.JS                    ///
///                                             ///
///     - SETS ALL ENEMY VARIABLES              ///
///     - HANDLES ENEMY STAT UPDATES            ///
///     - ENEMY TURN EVENT HANDLERS             ///
///     - ENEMY AI                              ///
///                                             ///
///////////////////////////////////////////////////

// updates the enemies div
// in retospect I should have utilized the (type) assigment more and parted out functions better in this
export async function updateEnemy(type) {

  // log the enemy update
  // console.log("Enemy updated");

  // set the enemy icon variable
  if (!gameVariables.enemyStats.iconDiv) gameVariables.enemyStats.iconDiv = document.getElementById(gameVariables.enemyStats.iconDivID);

  // set the enemies name variable
  if (!gameVariables.enemyStats.nameDiv) {
    gameVariables.enemyStats.nameDiv = document.getElementById(gameVariables.enemyStats.nameDivID);

    // enemy needs a name first - keeping it interesting by 'generating' one
    await nameEnemy(true);

    // set the divs inner html to the players name
    gameVariables.enemyStats.nameDiv.innerHTML = `<h1 id="${gameVariables.enemyStats.name}">${gameVariables.enemyStats.name}</h1>`;
  }

  // set all the buttons - once
  if (!gameVariables.enemyStats.btnDivsSet) {
    // set the damageBtn stuff
    gameVariables.enemyStats.damageNumDiv = document.getElementById(gameVariables.enemyStats.damageNumDivID);

    // set the blockBtn stuff
    gameVariables.enemyStats.blockNumDiv = document.getElementById(gameVariables.enemyStats.blockNumDivID);

    // set the healBtn stuff
    gameVariables.enemyStats.healNumDiv = document.getElementById(gameVariables.enemyStats.healNumDivID);

    gameVariables.enemyStats.btnDivsSet = true;
    //console.log("Enemy divs set");
  }

  // update just the stat if wanted
  // call with updatePlayer("stats");
  if (type === "stats") {
    updateStats();
    return;
  }

  // grab bots name H1
  const nameH1 = document.getElementById(gameVariables.enemyStats.name);

  // bots turn
  return new Promise(async (resolve) => {
    // if its not the users turn and initial setup complete => update logs => usually something is done here
    if (!gameVariables.userTurn && gameVariables.turnNumber > 0 && gameVariables.coinFlip) {

      // indicate its the enemies turn
      nameH1.style.background = 'rgb(0,128,0,0.5)';

      // grab a random number for a random saying
      const randNum = Math.floor(Math.random() * gameVariables.sayings.enemyTurn.length);
      // update the logs with that saying | no delay
      updateLogs(gameVariables.sayings.enemyTurn[randNum], 0, "enemySaying");

      // the bots 'AI' to decide what their turn willbe
      await enemyAI();
      // update the players stats
      updatePlayer("stats");
      // update the enemies stats
      updateStats();
      // change to the users turn
      gameVariables.userTurn = true;
      // finish enemies turn
      enemyDone();
    }
    // If its not the enemies turn
    else {
        // update the enemies stats
        updateStats();
        // finish enemies turn
        enemyDone(); 
    }

    // call to resolve enemies turn
    function enemyDone() {
      // add a little delay is resolving
        setTimeout(() => {
        // reset background color
        nameH1.style.background = 'transparent';
        resolve();
      }, gameVariables.sayings.delay)

    }
  })

  // 'AI' function for the enemy | Not sure of the best way to do this. 
  // Just using branching logic to determine turn type
  async function enemyAI() {
    console.log("Enemy AI running");
    // wait for decision
    return new Promise(resolve => {
      setTimeout(() => {

        // call to resolve enemies turn
        function enemyDone2() {

          // update players stats immediately
          updatePlayer("stats");
          // same with enemy
          updateEnemy("stats");

          resolve();
        }

        // always grab a block number to use later if needed
        const block = gameVariables.enemyStats.block; 
        // always grab a heal number to use later if needed
        const heal = Math.floor(Math.random() * (gameVariables.enemyStats.healMax - gameVariables.enemyStats.healMin) + gameVariables.enemyStats.healMin);
        // all %'s are chance levels
        //
        // enemyHealth >= enemyHealthMax | (100%) deal damage
        if (gameVariables.enemyStats.health >= gameVariables.enemyStats.healthMax) {
          damagePlayer();
        }
        // enemmyHealth >= 9/10 enemyHealthMax | (70%) deal damage, (15%) heal, (15%) block 
        else if (gameVariables.enemyStats.health >= (gameVariables.enemyStats.healthMax * 0.9)) {
          const randNum = randomNumber(0, 100);
          // 70% damage chance
          if (randNum <= 70) {
            // damage player
            damagePlayer();
          }
          // 15% block chance
          else if (70 < randNum && randNum < 85) {
            // generate block
            enemyBlock();
          }
          // 15% heal chance
          else {
            // heal enemy
            enemyHeal();
          }
        }
        // 9/10 enemyHealthMax > enemmyHealth >= 8/10 enemyHealthMax | (50%) deal damage, (25%) heal, (25%) block 
        else if (gameVariables.enemyStats.health < (gameVariables.enemyStats.healthMax * 0.9) && (gameVariables.enemyStats.health >= (gameVariables.enemyStats.healthMax * 0.8))) {
          const randNum = randomNumber(0, 100);
          // 50% damage chance
          if (randNum <= 50) {
            // damage player
            damagePlayer();
          }
          // 25% block chance
          else if (50 < randNum && randNum < 75) {
            // generate block
            enemyBlock();
          }
          // 25% heal chance
          else {
            // heal enemy
            enemyHeal();
          }
        }
        // 8/10 enemyHealthMax > enemmyHealth >= 7/10 enemyHealthMax | (30%) deal damage, (35%) heal, (35%) block 
        else if (gameVariables.enemyStats.health < (gameVariables.enemyStats.healthMax * 0.8) && (gameVariables.enemyStats.health >= (gameVariables.enemyStats.healthMax * 0.7))) {
          const randNum = randomNumber(0, 100);
          // 30% damage chance
          if (randNum <= 30) {
            // damage player
            damagePlayer();
          }
          // 35% block chance
          else if (30 < randNum && randNum < 65) {
            // generate block
            enemyBlock();
          }
          // 35% heal chance
          else {
            // heal enemy
            enemyHeal();
          }
        }
        // 7/10 enemyHealthMax > enemmyHealth >= 6/10 enemyHealthMax | (20%) deal damage, (50%) heal, (30%) block 
        else if (gameVariables.enemyStats.health < (gameVariables.enemyStats.healthMax * 0.7) && (gameVariables.enemyStats.health >= (gameVariables.enemyStats.healthMax * 0.6))) {
          const randNum = randomNumber(0, 100);
          // 30% damage chance
          if (randNum <= 20) {
            // damage player
            damagePlayer();
          }
          // 35% block chance
          else if (20 < randNum && randNum < 50) {
            // generate block
            enemyBlock();
          }
          // 35% heal chance
          else {
            // heal enemy
            enemyHeal();
          }
        }

        // damage function 
        function damagePlayer() {

          // always grab a damage number to use later if needed
          let dmg = Math.floor(Math.random() * (gameVariables.enemyStats.damageMax - gameVariables.enemyStats.damageMin) + gameVariables.enemyStats.damageMin);

          // save the initial amout of damage done
          const initDmg = dmg;
          // blocked initially false
          let blocked = false;

          // do damage, but check if the player has any block first
          if (gameVariables.playerStats.currBlock > 0) {
            // set blocked to true
            blocked = true;

            // correct the players block value | block 'used'
            // 
            // playerBlock >= damage
            if (gameVariables.playerStats.currBlock >= dmg) {
              // subract the amount of dmage done from players current block
              gameVariables.playerStats.currBlock -= dmg;
               // update logs with amount of damage blocked 
              updateLogs(gameVariables.playerStats.name + ' blocked ' + dmg + ' damage', 0, "playerSaying");
              // zero out damage amount
              dmg = 0;
            }
            // playerBlock < damage
            else if (gameVariables.playerStats.currBlock < dmg) {
              // subtract the amount of block from damage
              dmg = dmg - gameVariables.playerStats.currBlock;
              // update logs with amount of damage blocked 
              updateLogs(gameVariables.playerStats.name + ' blocked ' + gameVariables.playerStats.currBlock + ' damage', 0, "playerSaying");
              // zero out the players currBlock
              gameVariables.playerStats.currBlock = 0;
            }
          }

          // deal damage to the player
          gameVariables.playerStats.health -= dmg;
          // if block occured | outut this
          if (blocked) updateLogs(gameVariables.enemyStats.name + ' did ' + dmg + ' damage!' + ` (${initDmg} total)`, 0, "enemySaying");
          // if no blocking occured
          else updateLogs(gameVariables.enemyStats.name + ' did ' + dmg + ' damage!', 0, "enemySaying");
          // call to resolve
          enemyDone2() 
        }

        // block function 
        function enemyBlock() {
          gameVariables.enemyStats.currBlock += block; // enemy applies block
          updateLogs(gameVariables.enemyStats.name + ' added ' + block + ' block', 0, "enemySaying");
          // call to resolve
          enemyDone2() 
        }

        // heal function
        function enemyHeal() {
          gameVariables.enemyStats.health += heal; // applies the heal to the enemy
          updateLogs(gameVariables.enemyStats.name + ' healed for ' + heal + ' health', 0, "enemySaying");
          // call to resolve
          enemyDone2()
        }

      }, gameVariables.sayings.delay)
    })
  }

  // call to update the enemies stats 
  function updateStats() {
    // updates the enemies grade and health
    gameVariables.enemyStats.iconDiv.innerHTML = getGrade(gameVariables.enemyStats.health, gameVariables.enemyStats.name) + `<div class="currCharNumbersWrap flexed"><h6 class="currCharNumber">Health: ${gameVariables.enemyStats.health} | Block: ${gameVariables.enemyStats.currBlock}</h6></div>`;
    // updates the players damage variance amount
    gameVariables.enemyStats.damageNumDiv.textContent = `(${gameVariables.enemyStats.damageMin} - ${gameVariables.enemyStats.damageMax})`;
    // update the players block amount
    gameVariables.enemyStats.blockNumDiv.textContent = `(${gameVariables.enemyStats.block})`;
    // update the players heal variance amount
    gameVariables.enemyStats.healNumDiv.textContent = `(${gameVariables.enemyStats.healMin} - ${gameVariables.enemyStats.healMax})`;
  }

}
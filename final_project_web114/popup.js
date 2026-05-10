// ALL IMPORTS LISTED BELOW

import { gameVariables } from './variables.js';
import { updateLogs } from './functions.js';

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

// popup menu manager | to call (example) => popUp("headsOrTails", "Example phrase for h1", 2000) (2s | 1000 = 1s | not going to convert)
export async function popUp(popup, phrase, delay) {
  return new Promise(resolve => {
    // set the popup wrap div if not set yet
    if (!gameVariables.popupWrapDiv) gameVariables.popupWrapDiv = document.getElementById("popupWrapper");

    // nested function to open the popup menu
    // placing it inside because it will not be used anywhere else
    function openPopup() {

      // if popup is open, close it. if its open, close it
      if (gameVariables.popupOpen) {
        gameVariables.popupWrapDiv.style.display = 'none';
        gameVariables.popupOpen = false
      }
      else {
        gameVariables.popupWrapDiv.style.display = 'flex';
        gameVariables.popupOpen = true;
      }
    }

    // switch function to give outputs based on popup wanted
    // call with (ex.) openPopup("example");
    switch(popup) {
      case "headsOrTails":  // gives the user the decision between heads or tails
        // give a delay if wanted
        setTimeout(() => {

          // log the start of the menu
          console.log("opening coinFlip menu");

          // call to open the popup menu
          openPopup();

          // grabs the heads or tails wrap and displays it
          const hortWrap = document.getElementById("headsOrTailsWrap");
          hortWrap.style.display = 'flex';

          // grab the h1 element in the hortwrap to change it
          const hortTitle = document.getElementById("hortSaying");
          hortTitle.textContent = phrase; // change the text to the phrase given

          // grab both of the buttons and place them in this array
          const buttons = [
            document.getElementById("headsBtn"),  // heads
            document.getElementById("tailsBtn"),  // tails
          ];

          // set the coinDiv 
          if (!gameVariables.popupCoinDiv) gameVariables.popupCoinDiv = document.getElementById("coinDiv");
          gameVariables.popupCoinDiv.innerHTML = `<h1 class="actualCoin">Flip Me</h1>`

          // for each of the buttons add an event listener
          buttons.forEach((button) => {
            // on beach button check for its ID | Im realizing after writing this, this block was probably a bad approach
            button.addEventListener('click', () => {
              // If its the heads button
              if (button.id === "headsBtn") {
                // add the active button class to make it look selected
                button.classList.add('buttonActive');
                console.log("User clicked heads");
                // Flip function
                flipCoin(1);
                return;
              }
              // if its the tails button
              else if (button.id === "tailsBtn") {
                // add the active button class to make it look selected
                button.classList.add('buttonActive');
                console.log("User clicked tails");
                // Flip function
                flipCoin(2);
                return;
              }
              // error returner | Should never fire..
              else {
                console.log("Error: Buttons => heads or tails");
              }
            })
          });

          // 'flip' the coin } random number generator | takes in the users choice | 1 = heads | 2 = tails
          // still don't understand if I TECHNICALLY need async here, but works without it so..
          function flipCoin(value) {
            buttons.forEach((button) => { button.disabled = true; });// disable the buttons from future use
            // change the title text to the 'coinFlip text
            hortTitle.textContent = gameVariables.sayings.coinFlip;

            // something to detect the state of the coin flip
            let coinDecided = false;
            // to use in the function below
            let i = 0;
            // start the 'animation'
            coinFlipAnimation();

            // a visualization of the 'coinflip'
            function coinFlipAnimation() {
              // show coin div | heads/tails
              if (coinDecided) {
                const heads = 1;  // these match below
                const tails = 2;
                if (randNum === heads) gameVariables.popupCoinDiv.innerHTML = `<h1 class="actualCoin">Heads</h1>`;
                else if (randNum === tails) gameVariables.popupCoinDiv.innerHTML = `<h1 class="actualCoin">Tails</h1>`;
              }
              if (!coinDecided) {
                // if i is even 
                if (i % 2 === 0) {
                  gameVariables.popupCoinDiv.innerHTML = `<h1 class="actualCoin">Heads</h1>`;
                }
                // if i is odd
                else {
                  gameVariables.popupCoinDiv.innerHTML = `<h1 class="actualCoin">Tails</h1>`;
                }
                i++
                setTimeout(() => {
                  requestAnimationFrame(coinFlipAnimation);
                }, 100);
              }
            }

            // grab a random number between 1 and 2 | keeping whole numbers
            let randNum = Math.floor(Math.random() * (3 - 1) + 1);

            // change to ' ... ' saying for a little
            setTimeout(() => {
              hortTitle.textContent = gameVariables.sayings.intermission;

              // if randNum = 1/heads | randnum = 2/tails
              if (randNum === 1) console.log("Bot flipped a Heads");
              if (randNum === 2) console.log("Bot flipped a Tails");

              // stop the coin flip
              coinDecided = true;

            }, gameVariables.sayings.delay);

            // after (a little x 2) change 
            setTimeout(() => {
              if (randNum === value) {
                // chang saying to 'won'
                hortTitle.textContent = gameVariables.sayings.coinFlipWon;
                // change first turn value to true 
                gameVariables.userTurn = true;
                console.log("User won coinflip");
              }
              else if (randNum !== value) {
                // change saying to 'lost'
                hortTitle.textContent = gameVariables.sayings.coinFlipLost;
                // keeping first turn value false if user loses
                console.log("Bot won coinflip");
              }
            }, (gameVariables.sayings.delay * 2));

            // delay
            setTimeout(() => {
              openPopup(); // close the popup menu after we're finished
              // if the player won the coinflip
              if (gameVariables.userTurn) updateLogs(`(${gameVariables.playerStats.name} won the coinflip)` + gameVariables.sayings.userFirst, 1000, "enemySaying");
              // if the enemy won the coinflip
              else updateLogs(`(${gameVariables.enemyStats.name} won the coinflip)` + gameVariables.sayings.botFirst, 1000, "enemySaying");

              setTimeout(() => {
                // finish the await sync here for heads or tails 
                resolve();
              }, gameVariables.sayings.delay);

              // set the coinflip value to true
              gameVariables.coinFlip = true;
            
            },gameVariables.sayings.delay * 3);
          }
        },delay);
        break;
      case "gameOver":
        // log the start of the menu
        console.log("opening game over menu");

        // call to open the popup menu
        openPopup();




        break;
      case "example":
        console.log("example");
        break;
    }
  })
}
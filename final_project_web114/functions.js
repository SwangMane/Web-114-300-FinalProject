// ALL IMPORTS LISTED BELOW

import { gameVariables } from './variables.js';

///////////////////////////////////////////////////
///                                             ///
///                FUNCTIONS.JS                 ///
///                                             ///
///     - NAME ENEMY                            ///
///     - RANDOM NUMBER                         ///
///     - GET GRADE                             ///
///     - UPDATE LOGS                           ///
///                                             ///
///////////////////////////////////////////////////

// asyncing to prevent errors | name needed to further progress 
export async function nameEnemy() {
  // grabs each of the name array for simplicity
  const firstNameArray = gameVariables.enemyStats.firstName; 
  const middleNameArray = gameVariables.enemyStats.middleName;
  const lastNameArray = gameVariables.enemyStats.lastName;

  // random numbers to randomly grab each name (first, middle, last)
  const firstName = firstNameArray[randomNumber(0, firstNameArray.length - 1)];
  const middleName = middleNameArray[randomNumber(0, middleNameArray.length - 1)];
  const lastName = lastNameArray[randomNumber(0, lastNameArray.length - 1)];
  
  // store enemies name
  gameVariables.enemyStats.name = firstName + " " + middleName + " " + lastName;

  // console log enemies full combined name
  // console.log("Enemies name is: " + gameVariables.enemyStats.name);
  // send a log message
  updateLogs(gameVariables.enemyStats.name + " has entered the arena!", 1000, "gameLogs");                 

  return true;
}

// random number function, mas using for nameEnemy - realized I can random off itself instead
// this will come in handy
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min); 
}

// to grab the health of the player/enemy | returns a letter grade | getGrade(number, "name");
export function getGrade(number, name) {
  console.log(name + ' current health: ' + number); // logs either player or enemy health
  switch(true) {
    // greater then 100 health | A++
    case number > 100:
      return "A++";
      break;
    // less then or equal to 100 = greater or qual then 95 health | A+
    case number >= 95 && number <= 100:
      return "A+";
      break;
    // less then 95 = greater or euqual then 90 health | A+
    case number >= 90 && number < 95:
      return "A";
      break;
    // less then 90 = greater or euqual then 85 health | A+
    case number >= 85 && number < 90:
      return "B+";
      break;
    // less then 85 = greater or euqual then 80 health | A+
    case number >= 80 && number < 85:
      return "B";
      break;
    // less then 80 = greater or euqual then 75 health | A+
    case number >= 75 && number < 80:
      return "C+";
      break;
    // less then 75 = greater or euqual then 70 health | A+
    case number >= 70 && number < 75:
      return "C";
      break;
    // less then 70 = greater or euqual then 65 health | A+
    case number >= 65 && number < 70:
      return "D+";
      break;
    // less then 70 = greater or euqual then 65 health | A+
    case number >= 60 && number < 65:
      return "D";
      break;
    // less then 70 = greater or euqual then 65 health | A+
    case number < 60:
      console.log("Failed");
      return "Failed";
      break;
  }
}

// updates the logs div | call with updateLogs("ex", time, playerSaying)
export function updateLogs(text, delay, type) {
  if (!gameVariables.logsDiv) gameVariables.logsDiv = document.getElementById("logs"); // set the logs div

  // to use later
  let backgroundColor;
    // change the background color based on the type of log
  if (type === "playerSaying") backgroundColor = 'rgb(0, 255, 0, 0.25)';
  else if (type === "enemySaying") backgroundColor = 'rgb(255, 0, 0, 0.25)';
  else if (type === "gameLogs") backgroundColor = 'rgb(192, 192, 192, 0.25)';

  // adds a little buffer of time if wanted
  setTimeout(() => {

    // grabs how many logs there are and assigns a new number to each log
    const LogLength = gameVariables.logs.length + 1;
    // setting for easier access
    const logsArray = gameVariables.logs;

    // add the new log to the array
    logsArray.push(text);

    // HTML formatting for each log | #logWrap p
    const newLog = document.createElement("p");
    newLog.textContent = `(${LogLength}) ${text}`;
    // change the background color based on the type
    newLog.style.background = backgroundColor;

    // append the new log to the top of the top
    gameVariables.logsDiv.prepend(newLog);
  },delay);
}
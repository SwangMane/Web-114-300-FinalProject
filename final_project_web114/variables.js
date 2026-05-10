///////////////////////////////////////////////////
///                                             ///
///                VARIABLES.JS                 ///
///                                             ///
///     - ALL GAME VARIABLES / SAYINGS          ///
///     - BUTTONS / PLAYER STATS / ENEMY STATS  ///
///     - COINFLIP STATS / LOGS ARRAY / ETC.    ///
///                                             ///
///////////////////////////////////////////////////

// placing all variables here for future use
export const gameVariables = {

  coinFlip: false,
  // if there is something being performed, change to true | will disable all usable buttons
  takingTurn: false,
  // whether or not the user goes first | false = no | true = first
  userTurn: false,
  // the current turn number
  turnNumber: 0,
  // start button things
  startBtn: null,
  startBtnId: "startGame",  // #startGame div btn

  // action button things | orinally going to use this further. But I can't figure out how to properly loop through an array looking for certain ID's
  // and changing buttons per ID - Now just setting to True / false reading for them being 'set'
  actionBtns: false,
  actionBtsArray: [],
  actionBtnsClass: "playerBtns",
  actionBtnListeners: false,

  // logs area things
  logsDiv: null,
  logs: [], // array of all logs kept

  // the popup 
  popupWrapDiv: null,
  popupOpen: false,

  // the coin in the popup (heads/tails)
  popupCoinDiv: null,

  // all phrases to be called later
  sayings: {
    // std delay time
    delay: 2000, // 2 seconds

    // user first or second sayings 
    userFirst: " Well.. I'm waiting.. Do your worst!",
    botFirst: " Looks like i'm going first. I'm going to enjoy this..",

    // enemy turn sayings
    enemyTurn: ["Mhmm.. let me think..", "Alright, get ready!", "Here comes the pain!", "Hey, whats that over there?!", "You're really not going to like this..", "I'll show you something to be scared of!", "Uh-oh"],

    // something for filler
    intermission: " ... ",

    // all coin flip sayings
    coinFlipInitial: "We need to decide who goes first.. Since you're the guest, i'll let you choose! Which will it be.. Heads or Tails?",  // the turn detection saying
    coinFlip: "flipping a coin now.. Fairly.. Of course.",  // saying before coin is 'flipped'
    coinFlipLost: "Yikes.. You chose wrong! I go first!",   // saying for if the user loses coinflip
    coinFlipWon: "... Okay whatever, I guess you go first.",  // saying for if the user wins coinflip
  },

  // all player stats
  playerStats: {

    iconDiv: null, // the player 'icon'
    iconDivID: "playerIcon",

    name: null, // players name is asked for 
    nameDiv: null,  
    nameDivID: "playerName", // id name of the div to assign

    // all values are initial - They will change upon user interaction on the site
    health: 100,
    healthMax: 100,
    damageMax: 10,
    damageMin: 5,
    block: 5,
    currBlock: 0,
    healMax: 5,
    healMin: 3,

    // damage button / div things
    damageBtn: null,
    damageBtnID: "player_dmgBtn",
    damageNumDiv: null,
    damageNumDivID: "player_dmgNmbr", 

    // block button / div thins
    blockBtn: null,
    blockBtnID: "player_blockBtn",
    blockNumDiv: null,
    blockNumDivID: "player_blkNmbr",

    // heal button / div things
    healBtn: null,
    healBtnID: "player_healBtn",
    healNumDiv: null,
    healNumDivID: "player_healNmbr",
  },

  // all enemy stats
  enemyStats: {

    iconDiv: null,  // the enemy 'icon'
    iconDivID: "enemyIcon",

    name: null, // enemies name is generated
    nameDiv: null,
    nameDivID: "enemyName", // id name of the div to assign

    // all values are initial - They will change upon user interaction on the site
    health: 100,
    healthMax: 100,
    damageMax: 10,
    damageMin: 5,
    block: 5,
    currBlock: 0,
    healMax: 5,
    healMin: 3,

    btnDivsSet: false,

    // damage div things
    damageNumDiv: null,
    damageNumDivID: "enemy_dmgNmbr", 

    // block div thins
    blockNumDiv: null,
    blockNumDivID: "enemy_blkNmbr",

    // heal div things
    healNumDiv: null,
    healNumDivID: "enemy_healNmbr",

    firstName: ["Bob", "Tony", "Phil", "Potato", "Donkey", "Stinky", "Goober", "Paul", ""], // Random list of first names
    middleName: ["The", "GOAT", "M", "Lee", "tootie", "golly", "Blart", ""],                  // Random list of middle names
    lastName: ["willikers", "The III", "McDingus", "Bob", "007", "Random", "Mallcop", ""],  // Random list of Last names
  },
}
// funtion to return a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// console.log (enemyNames);
// var enemyHealth = 50;
// var enemyAttack = 12;

// // You can also log multiple values at once like this
// console.log(playerInfo.name, playerInfo.attack, playerInfo.health);
// console.log(enemyNames);
// console.log(enemyInfo.length);
// console.log(enemyNames[0]);
// // console.log(enemyNames[3]); // will give undefined

// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// fight or skip recursive function
var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // Enter the conditional recursive funtion call here!
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    /* alternative: 
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    } */

    // if player picks "skip" confirm and then stop the loop
    // make sure that prompt entry is always turned into lower case so we do not have to worry about case errors
    promptFight = promptFight.toLocaleLowerCase();

    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
            // subtract money from playerInfo.money for skipping
            playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);

            // return true if player wants to leave
            return true;
        }
    }
    return false;
};

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
    
    // randomly change turn order 
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask player if they want to fight or skip using fightOrSkip function
            if (fightOrSkip()) {
                // if true leave fight by breaking loop
                break;
            }
            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            // generate random value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
            );
    
            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + ' has died!');
    
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;
    
                // leave while() loop since enemy is dead
                break;
            }   else {
                window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
            }
    
            // remove players's health by subtracting the amount set in the enemy.attack variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
    
            playerInfo.health = Math.max(0, playerInfo.health - damage);
    
            console.log(
                enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
            );
    
            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + ' has died!');
                // leave while() loop if player is dead
                break;
            }   else {
                window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
            }
        }
        // switch turn order for next round
        // use the not operator ("!") to switch operations to reassign the isPlayerTurn
        isPlayerTurn = !isPlayerTurn;
    } // end of while loop
}; // end of fight function

// function to start a new game
var startGame = function(){
    // debugger;
    // reset player stats
   playerInfo.reset();

    // run fight function to start game
    // the for loop helps to pass each Robot's name into the fight function
    for (var i = 0; i < enemyInfo.length; i++){
          // if player is still alive, keep fighting
        if (playerInfo.health > 0) {
            // let player now what round they are in, remember that arrays start at 0 so 1 need to be added to it
            window.alert("Welcome to Robot Gladiators! Round" + ( i + 1 ) );
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];
    
            // reset enemy health to 50 before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            // use debugger to pause the script from running and check what's going on at that moment in the code
            //debugger;
    
            // pass the pickedEnemyObj variable's value into the fight function,  where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            // add shop function; ask to refill health, upgrade attack or leave; substract money; adjust stats; if invalid option, call shop function() again
            // if were not at last enemy in game
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
                // ask if player wants to be taken to the store before next round
                var storeConfirm = window.confirm("The fight is over, would you like to visit the store before the next round?");

                // if yes take them to the store function
                if (storeConfirm) {
                    shop();
                }
            }
        } 
        // if platyer isn't alive, stop game
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            // add if to restart or end game
            break;
        }
    }
  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

// might want to be placed within playGame fct
// function to end the entire game
var endGame = function() {
    window.alert("The game has ended. Let's see how you did!")

    // check local storage for highscore, if not available yet, set to 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    } // we could also use a short circuit conditional statement
        // highScore = highScore || 0;
        // So, our code means that if the highScore value is falsy (for example, null), then assign zero to highScore. If not, retain whatever value is currently stored in highScore.

    // if player has more money than high score , player has new highscore
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);
        alert(playerInfo.name + " now has the highscore of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " has not beaten the highscore of " + highscore + " Maybe next time!");
    }

    // if player is still alive, player wins!
    if(playerInfo.health > 0) {
        window.alert("Great job you have survived the Game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle!");
    }

    // ask player if they would like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if(playAgainConfirm) {
        //restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// create shop function()
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
        playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
        default:
            window.alert("You dind't pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// funtion to set name
var getPlayerName = function() {
    var name = "";
    
while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
}

    console.log("Your robot's name is " + name);
    return name
};


/* Game Information / Variables */
// player Information
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, //comma!!
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!")
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto", 
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
     },
     {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
     } 
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

/* END GAME INFORMATION / VARIABLES */

// start game when the page loads
startGame();
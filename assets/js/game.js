var playerName = window.prompt("What is your Robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
// console.log (enemyNames);
var enemyHealth = 50;
var enemyAttack = 12;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);
console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
// console.log(enemyNames[3]); // will give undefined

// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
        // ask player if they'd like to fight or run
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + ' has decided to skip this fight. Goodbye!');
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney)
                break;
            }
        }

        // remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + ' has died!');

            // award player money for winning
            playerMoney = playerMoney + 20;
            // leave while() loop since enemy is dead
            break;
        }   else {
            window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
        }

        // remove players's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + ' has died!');
            // leave while() loop if player is dead
            break;
        } else {
            window.alert(playerName + ' still has ' + playerHealth + ' health left.');
        }
    } // end of while loop
}; // end of fight function

// function to start a new game
var startGame = function(){
    // debugger;
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // run fight function to start game
    // the for loop helps to pass each Robot's name into the fight function
    for (var i = 0; i < enemyNames.length; i++){
          // if player is still alive, keep fighting
        if (playerHealth > 0) {
            // let player now what round they are in, remember that arrays start at 0 so 1 need to be added to it
            window.alert("Welcome to Robot Gladiators! Round" + ( i + 1 ) );
    
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];
    
            // reset enemy health to 50 before starting new fight
            enemyHealth = 50;
    
            // use debugger to pause the script from running and check what's going on at that moment in the code
            //debugger;
    
            // pass the pickedEnemyName variable's value into the fight function,  where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            // add shop function; ask to refill health, upgrade attack or leave; substract money; adjust stats; if invalid option, call shop function() again
            // if were not at last enemy in game
            if (playerHealth > 0 && i < enemyNames.length -1) {
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
    // if player is still alive, player wins!
    if(playerHealth > 0) {
        window.alert("Great job you have survived the Game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("The game has ended. Let's see how you did!")
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
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling players health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
                console.log(playerHealth);
            } else {
                window.alert("You don't have enough money!");
            }

            break;
        case "UPGRADE":   
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                //increase player attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }

            break;
        case "LEAVE":
        case "leave":
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

// start game when the page loads
startGame();
var playerName = window.prompt("What is your Robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
// console.log (enemyNames);
var enemyHealth = 50;
var enemyAttack = 12;

// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var fight = function(enemyName) {
    // Alert players that they are starting the round
    // window.alert("Welcome to Robot Gladiators!");

     // repeat and execute as long as the enemy-robot is alive 
    while(playerHealth > 0 && enemyHealth > 0) {
        // ask player if they want to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose");
        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight ===    "SKIP") {
            // confirm if player wants to skip the battle
            var confirmSkip = window.confirm(playerName + ", do you choose to skip this battle?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip this fight. Goodbye!");
                // substract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
                // if no (false), ask question again by running fight() again
            // } else{
            //     fight();
            }
        }
        // console.log(promptFight);   
        //     // if player choses to fight, then fight        
        // if (promptFight === "fight" || promptFight === "FIGHT") {
        //     //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
            enemyHealth = enemyHealth - playerAttack; 
            // Log a resulting message to the console so we know that it worked.
            console.log (
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            //check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                // award player money for winning
                playerMoney = playerMoney +20;
                // leave while() loop since enemy is dead
                break;

            }else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }

            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerHealth = playerHealth - enemyAttack;
            // Log a resulting message to the console so we know that it worked.
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );
            //check player's health
            if (playerHealth <= 0) {
            window.alert (playerName + " has died!");
            // leave while(loop) if player has died
            break;
            }else {
            window.alert(playerName + " still has " + playerHealth + " health remaining.");
            }  

            // If player chooses to skip
        } // end of while loop
    // }
}; // end of fight() function

// run fight function to start game
// the for loop helps to pass each Robot's name into the fight function
for (var i = 0; i < enemyNames.length; i++){
    // debugger;
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    //call fight function with enemy-robot
    fight(pickedEnemyName);
}
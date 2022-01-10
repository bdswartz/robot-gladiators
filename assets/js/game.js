// function to set name
var getPlayerName = function() {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
};
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (playerInfo.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      // increase health and decrease money
      this.health += 20;
      this.money -= 7;
      }
      else {
        window.alert("You don't have enough money!")
      }
    
  },
  upgradeAttack: function() {
    if (playerInfo.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      // increase attack and decrease money
      this.attack +=6;
      this.money -=7;
      }
      else {
        window.alert("You don't have enough money!")
      }
    
  }
};

console.log(playerInfo.name);

// function to generate a random numeric value
var randomNumber = function(min, max) {
var value = Math.floor(Math.random() * (max - min + 1) + min);
return value;
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

var fightOrSkip = function() {
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  promptFight = promptFight.toLowerCase();
  // check that the user input is valid
  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
   }
  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.money = playerInfo.money - 10;
      return true;
      }
    }
    return false;
};
var fight = function(enemy) {
    while(playerInfo.health > 0 && enemy.health > 0) {
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }
      // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        
        // Log a resulting message to the console so we know that it worked.
        console.log (playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );
        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
            break;
        } 
            else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.

        // generate random damage value based on enemy's attack power
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log (enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );
        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        } 
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

var startGame = function() {
  // reset player stats
  playerInfo.reset();
  for (var i = 0; i < enemyInfo.length; i++) {
      if (playerInfo.health > 0) {
          window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
          var pickedEnemyObj = enemyInfo[i];
          pickedEnemyObj.health = randomNumber(40, 60);
          fight(pickedEnemyObj);
          if (playerInfo.health > 0 && i < enemyInfo.length - 1)
          shop();
        }
        else {
          window.alert("You have lost your robot in battle! Game Over!");
          break;
          }
    }
    endGame()
  };
    var endGame = function() {
      // window.alert("The game has ended.  Let's see how you did!")
      if (playerInfo.health > 0) {
        window.alert("Great job, you have survived the game! You now have a score of " + playerInfo.money + ".");
      }
      else {
        window.alert("You've lost your robot in battle.");
      }
      var playAgainConfirm = window.confirm("Would you like to play again?");
      if (playAgainConfirm) {
        startGame();
      }
      else {
        window.alert("Thank you for playing Robot Gladiators. Come back soon!");
      }
    };
    var shop = function() {
      var shopOptionPrompt = window.prompt("Would you like to REFILL (1) your health, UPGRADE (2) your attack, or LEAVE (3) the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
      shopOptionPrompt = parseInt(shopOptionPrompt);
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
          window.alert("You did not pick a valid option. Try again.");
          // call shop() again to force player to pick a valid option
          shop();
          break;
      }
    };
    startGame();

//require assets.
var inquirer = require("inquirer");
//declare global variables.
var name;
var playerClass;
var playerHP;
var enemyHP;
var weapon;
var typeHit;
var deco = "~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*~.,.~*`*";
var enemyArray = ["A_Moss_Snake", "Fippy Darkpaw", "Lord Doljonijiarnimorinar", "Lady Vox", "Lord Nagafen"]
var enemy;
console.log(deco);
//start of game.
function getReady() {

    console.log("");
    console.log("");
//define player character.
    inquirer.prompt([{
                type: "input",
                name: "name",
                message: "What is thy name?"
            },
            {
                type: "list",
                name: "playerClass",
                message: "What is your class?",
                choices: ["Bard", "Berzerker", "Cleric", "Wizard"],
            },
            {
                type: "confirm",
                name: "HP",
                message: "Randomize your encounter?",
                default: true
            }
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.playerClass === "Bard") {
                weapon = "Singing Short Sword";
                typeHit = "slash"
            }
            if (inquirerResponse.playerClass === "Berzerker") {
                weapon = "Great Axe";
                typeHit = "cleave";
            }
            if (inquirerResponse.playerClass === "Cleric") {
                weapon = "Mace";
                typeHit = "bash";
            }
            if (inquirerResponse.playerClass === "Wizard") {
                weapon = "Fireball";
                typeHit = "blast";
            }
            if (inquirerResponse.HP) {
                var x = Math.floor(Math.random() * 4);
                enemy = enemyArray[x];
                playerHP = Math.floor(Math.random() * 120) + 55;
                enemyHP = Math.floor(Math.random() * 220) + 40;
                playerDamage = Math.floor(Math.random() * 25) + 10;
                name = inquirerResponse.name;
                playerClass = inquirerResponse.playerClass;
                console.log(deco);
                console.log("Prepare your "+weapon+", "+name+", "+enemy+" approaches!");
                console.log(deco);
                gameStart();
            } else {
                playerHP = 100;
                enemyHP = 20;
                enemy = enemyArray[0];
                playerDamage = Math.floor(Math.random() * 5) + 1;
                name = inquirerResponse.name;
                playerClass = inquirerResponse.playerClass;
                console.log(deco);
                console.log("Prepare your "+weapon+", "+name+", "+enemy+" approaches!");
                console.log(deco);
                simpleGameStart();
            }
        })
}

function gameStart() {
    if (playerHP <= 0) {
        console.log("");
        console.log(deco);
        console.log("");
        console.log("YOU have been defeated by " + enemy + "!");
        console.log(name + " the " + playerClass + " is no more!");
        console.log("");
        console.log(deco);
        process.exit();
    } else if (enemyHP <= 0) {
        console.log("");
        console.log(deco);
        console.log("");
        console.log(enemy + " has taken it's final breath!");
        console.log(name + " the " + playerClass + " is victorious!");
        console.log("");
        console.log(deco);
        process.exit();
    } else {
        attack();
    }
}

function simpleGameStart() {
    if (playerHP <= 0) {
        console.log("");
        console.log(deco);
        console.log("");
        console.log("YOU have been defeated by " + enemy + "!");
        console.log(name + " the " + playerClass + " is no more!");
        console.log("");
        console.log(deco);
        process.exit();
    } else if (enemyHP <= 0) {
        console.log("");
        console.log(deco);
        console.log("");
        console.log(enemy + " has taken it's final breath!");
        console.log(name + " the " + playerClass + " is victorious!");
        console.log("");
        console.log(deco);
        process.exit();
    } else {
        simpleAttack();
    }
}

function attack() {
    inquirer.prompt([{
            type: "list",
            name: "playerGuess",
            message: "Try to stay alive! Guess a number between [1-5]",
            choices: ["1", "2", "3", "4", "5"]
        }

    ]).then(function (guess) {

        if (playerHP > 0 || enemyHP > 0) {
            var playerDamage = Math.floor(Math.random() * 25) + 10;
            var enemyDamage = Math.floor(Math.random() * 5) + 1;
            var enemyNum = Math.floor((Math.random() * 5)) + 1;
            console.log("");
            console.log("");
            console.log(enemy + " rolled " + enemyNum);

            if (enemyNum === parseInt(guess.playerGuess)) {
                enemyHP -= playerDamage;
                console.log("YOU "+typeHit+" " + enemy + " FOR " + playerDamage + " damage");
                console.log("You have " + playerHP + " health left. " + enemy + " has " + enemyHP + " health left.");

                gameStart();
            } else {
                playerHP -= enemyDamage;
                console.log("OH NO! " + enemy + " slashed you with " + enemyDamage + " damage");
                console.log("You have " + playerHP + " health left. " + enemy + " has " + enemyHP + " health left.");

                gameStart();

            }
        }
    });
}

function simpleAttack() {
    inquirer.prompt([{
            type: "list",
            name: "playerGuess",
            message: "Try to stay alive! Guess a number between [1-5]",
            choices: ["1", "2", "3", "4", "5"]
        }

    ]).then(function (guess) {

        if (playerHP > 0 || enemyHP > 0) {
            var playerDamage = Math.floor(Math.random()*5)+1;
            var enemyDamage = Math.floor(Math.random() * 5) + 1;
            var enemyNum = Math.floor((Math.random() * 5)) + 1;
            console.log("");
            console.log("");
            console.log(enemy + " rolled " + enemyNum);

            if (enemyNum === parseInt(guess.playerGuess)) {
                enemyHP -= playerDamage;
                console.log("YOU HIT " + enemy + " FOR " + playerDamage + " damage");
                console.log("You have " + playerHP + " health left. " + enemy + " has " + enemyHP + " health left.");

                simpleGameStart();
            } else {
                playerHP -= enemyDamage;
                console.log("OH NO! " + enemy + " slashed you with " + enemyDamage + " damage");
                console.log("You have " + playerHP + " health left. " + enemy + " has " + enemyHP + " health left.");

                simpleGameStart();

            }
        }
    });
}

getReady();
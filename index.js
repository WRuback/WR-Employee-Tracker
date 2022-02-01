const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const loopQuestions = require("./questions.js");

async function questionLoop() {
    while (true) {
        const action = await inquirer.prompt(loopQuestions)
            .then(({ userChoice }) => {
                return userChoice;
            });
        switch (action) {
            case "end this program.":
                console.log("Ending program now.");
                return;
            default:
                console.log(action);
        };
    }
}

async function init() {
    questionLoop();
}

init();
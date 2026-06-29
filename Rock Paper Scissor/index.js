let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const msg = document.querySelector("#msg");

const genComChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const rndIdx = Math.floor(Math.random() * 3);
    return options[rndIdx];
};

const drawGame = () => {
    msg.innerText = "Game was a Draw!";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;

        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;

        msg.innerText = `You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const playGame = (userChoice) => {
    const compChoice = genComChoice();

    console.log("User:", userChoice);
    console.log("Computer:", compChoice);

    if (userChoice === compChoice) {
        drawGame();
        return;
    }

    let userWin;

    if (userChoice === "rock") {
        userWin = compChoice === "scissor";
    } else if (userChoice === "paper") {
        userWin = compChoice === "rock";
    } else {
        userWin = compChoice === "paper";
    }

    showWinner(userWin, userChoice, compChoice);
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id").toLowerCase();
        playGame(userChoice);
    });
});
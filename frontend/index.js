const BACKGROUND_COLOR = "#689DBD";
const PLAYER_ONE_COLOR = "#8D8741";
const PLAYER_TWO_COLOR = "#FC4445";
const FOOD_COLOR = "#FBEEC1";

const socket = io("http://localhost:3000", {
    extraHeaders: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:8000/"
    }
});

socket.on("init", handleInit);
socket.on("gameStart", handleGameStart);
socket.on("gameOver", handleGameOver);
socket.on("unknownCode", handleUnknownCode);
socket.on("toManyPlayers", handleTooManyPlayers);

const gameScreen = document.getElementById("gameScreen");
const initialScreen = document.getElementById("initialScreen");
const newGameBtn = document.getElementById("newGameButton");
const joinGameBtn = document.getElementById("joinGameButton");
const gameCodeInput = document.getElementById("gameCodeInput");
const gameCodeDisplay = document.getElementById("gameCodeDisplay");

newGameBtn.addEventListener("click", newGame);
joinGameBtn.addEventListener("click", joinGame);

function newGame(){
    socket.emit("newGame");
    startGame()
}

function joinGame(){
    const code = gameCodeInput.value;
    socket.emit("joinGame", code);
    startGame();
}

let canvas, canvasContext;
let playerNumber;
let gameActive = false;

function startGame(){
   initialScreen.style.display = "none";
   gameScreen.style.display = "block";

   canvas = document.getElementById("canvas");
   canvasContext = canvas.getContext("2d");

   canvas.width = canvas.height = 600;
   canvasContext.fillStyle = BACKGROUND_COLOR;
   canvasContext.fillRect(0, 0, canvas.width, canvas.height);
   document.addEventListener("keydown", keydown);
   gameActive = true;
}
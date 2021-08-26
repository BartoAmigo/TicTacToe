function switchPlayer(playerTurn)
{
    if(playerTurn=="X")
    {
        currentPlayer="X";
        statusDisplay.innerHTML=xPlayerTurn; 
    }
    else
    {
        currentPlayer="O"; 
        statusDisplay.innerHTML=oPlayerTurn;
    }
}



function handleCellClick(e){ 
    let cellIndex = parseInt(e.target.getAttribute("cell"));
    if(gameCells[cellIndex].innerHTML!="" || !gameActive)
    {
        return;
    }
    else
    {
        handleCellPlay(cellIndex);
        checkGame(); 
        if(gameActive)
        {
        currentPlayer == "X" ? switchPlayer("O") : switchPlayer("X");
        };
    }
}


function handleCellPlay(cellIndex)
{
    gameCells[cellIndex].innerHTML = currentPlayer; 
    currentGame[cellIndex] = currentPlayer; 
}

function checkGame()
{
    let roundWon = false; 
    for(let i = 0; i<=7;i++)
    {
        const winCondition = winningConditions[i]; 
        let a = currentGame[winCondition[0]]; 
        let b = currentGame[winCondition[1]]; 
        let c = currentGame[winCondition[2]]; 
        if(a === '' || b==='' || c==='')
        {
            continue
        }
        if(a===b && b===c){
            roundWon = true; 
            break; 
        }
    }

    if(roundWon)
    {
        statusDisplay.innerHTML=`${currentPlayer} Won!`;
        currentPlayer == "X" ? updateCounters("X") : updateCounters("O")
        gameActive=false; 
        return; 
    }

    if(!currentGame.includes(""))
    {
        statusDisplay.innerHTML="Draw!";
        gameActive = false; 
        updateCounters("DRAW");
        return;
    }
}

function handleRestartClick(){
    for(let i=0;i<gameCells.length;i++)
    {
        gameCells[i].innerHTML = "";
        currentGame[i]="";
    }
    switchPlayer("X");
    gameActive=true; 
}

function updateCounters(whoWon){
    switch(whoWon){
        case "X":
            winCounterX++;
            winCounterXHTML.innerHTML = winCounterX;
            break;  
        case "O": 
            winCounterO++; 
            winCounterOHTML.innerHTML = winCounterO; 
            break;
        default: 
            drawCounter++;
            drawCounterHTML.innerHTML = drawCounter;
            break; 
            
    } 
}

function handleResetCounters(){
    winCounterX = 0; 
    winCounterO = 0;
    drawCounter = 0; 
    winCounterXHTML.innerHTML = winCounterX; 
    winCounterOHTML.innerHTML = winCounterO; 
    drawCounterHTML.innerHTML = drawCounter; 
}



const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];



let gameActive = true; 
let currentPlayer="X"; 

const gameCells = document.querySelectorAll('.cell');
let currentGame = ["","","","","","","","",""];


const statusDisplay = document.querySelector('#status')
const xPlayerTurn = "X's Turn";
const oPlayerTurn = "O's Turn";
statusDisplay.innerHTML=xPlayerTurn;

const winCounterXHTML = document.querySelector('#winCounterX');
const drawCounterHTML = document.querySelector('#drawCounter');
const winCounterOHTML = document.querySelector('#winCounterO'); 

let winCounterX = 0; 
let winCounterO = 0; 
let drawCounter = 0; 

winCounterXHTML.innerHTML = winCounterX; 
winCounterOHTML.innerHTML = winCounterO; 
drawCounterHTML.innerHTML = drawCounter; 


document.querySelectorAll('.cell').forEach(
    cell => 
    {
        cell.innerHTML="";
        cell.addEventListener('click',handleCellClick)
    }
);

document.querySelector('#restartButton').addEventListener('click',handleRestartClick);
document.querySelector('#resetScoreBoard').addEventListener('click',handleResetCounters);
let onePlayer=document.getElementById('onePlayer');
let twoPlayer=document.getElementById('twoPlayer');
let currentPlayer='X';
let gameMode='';
let instruction=document.getElementById('instruction');
let reset = document.getElementById('reset');
let info=document.getElementById('info');
let close=document.getElementById('close');
const cells=document.querySelectorAll('[data-cell]');
let gameOver=false;
onePlayer.addEventListener("click",function(){
    onePlayer.classList.add('active');
    onePlayer.classList.remove('inactive');
    twoPlayer.classList.add('inactive');
    twoPlayer.classList.remove('active');
    gameMode = '1p';
    resetGame();
});
twoPlayer.addEventListener("click",function(){
    twoPlayer.classList.add('active');
    twoPlayer.classList.remove('inactive');
    onePlayer.classList.add('inactive');
    onePlayer.classList.remove('active');
    gameMode = '2p';
    resetGame();
});

function startGame(){
    if(onePlayer.className=="toggle-button active"){
        gameMode='1p';
    }else if(twoPlayer.className=="toggle-button active"){
        gameMode="2p"
    }
    cells.forEach(cell => {
        cell.addEventListener("click",handleClick,{once:true});
    });
    gameOver=false;
};
function handleClick(a){
    const cell=a.target;
    mark(cell,currentPlayer);
    if (gameOver){
        cells.forEach(cell => {
            cell.removeEventListener("click",handleClick,{once:true});
        });
        document.getElementById('instruction').innerHTML='Click Reset to play the Game Again.';
        return;
    } 
    if(checkWin(currentPlayer)){
        document.getElementById('instruction').innerHTML= currentPlayer+' Won the game.';
        gameOver=true;
        console.log(currentPlayer+ "wins");
    }else if(checkDraw()){
        document.getElementById('instruction').innerHTML='This Game is draw.';
        console.log("this game is draw");
    }else{
        swapTurns();
        if(gameMode==='1p' && currentPlayer==='O'){
            computerMove();
            document.getElementById('instruction').innerHTML='Computer\'s Turn';
        }else{
            document.getElementById('instruction').innerHTML=currentPlayer+' \'s Turn';
        }
    }
}

function mark(cell,player){
    cell.textContent=player;
}

function swapTurns(){
    if (currentPlayer==='X') {
        currentPlayer='O';
    }else if(currentPlayer==='O'){
        currentPlayer='X';
    }
}

function checkWin(player){
    const winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return winPatterns.some(pattern =>{
        return pattern.every(index=> {
            return cells[index].textContent === player;
        })
    });
}

function checkDraw(){
    return [...cells].every(cell => {
        return cell.textContent==='X' || cell.textContent==='O';
    });
}

reset.addEventListener("click",resetGame);
function resetGame(){
    currentPlayer='X';
    cells.forEach(cell => {
        cell.textContent='';
    });
    document.getElementById("instruction").innerHTML='X \'s turn';
    gameOver=false;
    startGame();
}

function computerMove(){
    let emptyCells = [];

    cells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCells.push(cell);
        }
    });

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const selectedCell = emptyCells[randomIndex];

    setTimeout(() => {
        mark(selectedCell, 'O');
        if (checkWin('O')) {
            document.getElementById('instruction').innerHTML= currentPlayer+' Won the game.';
            gameOver=true;
            console.log(currentPlayer+ "wins");
        } else if (checkDraw()) {
            document.getElementById('instruction').innerHTML='This Game is draw.';
            console.log("this game is draw");
        } else {
            swapTurns();
            document.getElementById('instruction').innerHTML=currentPlayer+' \'s Turn';
        }
        if (gameOver){
            cells.forEach(cell => {
                cell.removeEventListener("click",handleClick,{once:true});
            });
            document.getElementById('instruction').innerHTML='Click Reset to play the Game Again.';
            return;
        } 
    }, 500);
};
info.addEventListener("click",function(){
    document.getElementById('info-section').style.display='flex';
});
close.addEventListener("click",function(){
    document.getElementById('info-section').style.display='none';
});
startGame();
const board = document.querySelector(".board");
const playerOneSymbol = document.querySelector(".Player-one");
const playerTwoSymbol = document.querySelector(".Player-two");
const resetGameContuiner = document.querySelector(".reset-game")
const message = document.querySelector(".message");

const playerOneDiv = document.querySelector(".player-1");
const playerTwoDiv = document.querySelector(".player-2");

const playerOneScorepar = document.querySelector(".player-one-score");
const playerTwoScorepar = document.querySelector(".player-two-score");

const defuiltGame = document.querySelector(".defuilt");
const resetGameBtn = document.querySelector(".reset");

let playerOneScore = 0;
let playerTwoScore = 0;



let currentPlayer = playerOneSymbol.value.toUpperCase();

let gameOver = false;

defuiltGame.addEventListener(("click") , () =>{
    playerOneSymbol.value = "X";
    playerTwoSymbol.value = "O";
    currentPlayer = playerOneSymbol.value.toUpperCase();
})


playerOneSymbol.addEventListener('input', () => {
    currentPlayer = playerOneSymbol.value.toUpperCase();
    if(playerOneSymbol.value === playerTwoSymbol.value){
        alert("please change symbol, not can choose same symbol for two player");
        playerOneSymbol.value = "";
    }
    
});

let cells = Array.from({length:9}); // arrat.from used to create anew array 
playerTwoSymbol.addEventListener('input', () => {
    if(playerOneSymbol.value === playerTwoSymbol.value){
        alert("please change symbol, not can choose same symbol for two player");
        playerTwoSymbol.value = "";
    }
    playerOneSymbol.classList.add("active");
});
const handleClick = (e) =>{
    if (!playerOneSymbol.value || !playerTwoSymbol.value){
        alert("Enter Symbols Please");
        return;
    }
    localStorage.setItem(`score-one` ,playerOneScore);
    localStorage.setItem(`score-two` ,playerTwoScore);
    const cellIndex = e.target.dataset.index;
   
    //ceheck if cells i empty or no  if empty sit symcol else no do eny thing
    if(cells[cellIndex]) return; // check in array work with line 15 cells[index] = value
    if(gameOver) return;
    playerOneSymbol.setAttribute('disabled', 'true')
    playerTwoSymbol.setAttribute('disabled', 'true')

    updatCells(cellIndex, currentPlayer);
    const winner = checkWinner();
    if (winner){
        gameOver = true;
        setTimeout(() => {resetGameContuiner.style.display = "block";}, (100));
        message.innerHTML = `The player ${winner} Won`;
        (winner === playerOneSymbol.value.toUpperCase()) ? playerOneScore++ : playerTwoScore++ ;
        localStorage.setItem(`score-one` ,playerOneScore);
        localStorage.setItem(`score-two` ,playerTwoScore);
        playerOneScorepar.textContent = localStorage.getItem("score-one");
        playerTwoScorepar.textContent = localStorage.getItem("score-two");
     
    }else if(!cells.includes(undefined)){
        setTimeout(() => {resetGameContuiner.style.display = "block";}, (100));
        message.innerHTML = `Draw!`
        
    }  
}

const updatCells = (index , value) =>{
    // sit value for every index in array example => index 0 = "x"  and index4 = "Y"
    cells[index] = value;  
    const cell = board.querySelector(`.cell[data-index = "${index}"]`);
    // sit value in html 
    cell.textContent = value;
    // after then i will replace to player-one and player-two if i do player choose symbol
    cell.classList.add(value === playerOneSymbol.value.toUpperCase() ? "player-one" : "player-two") ;


    //switch Player symbol 
    // currentPlayer = (currentPlayer === playerOneSymbol.value.toUpperCase()) ? playerTwoSymbol.value.toUpperCase() : playerOneSymbol.value.toUpperCase();
    if(currentPlayer === playerOneSymbol.value.toUpperCase()){
        currentPlayer = playerTwoSymbol.value.toUpperCase();
        playerOneDiv.classList.remove("active")
        playerTwoDiv.classList.add("active");

    }else{
        currentPlayer = playerOneSymbol.value.toUpperCase();
        playerTwoDiv.classList.remove("active")
        playerOneDiv.classList.add("active");

    }


}

function checkWinner(){
    const winnigCombos = [
        [0 , 1 ,2],
        [3 , 4 ,5],
        [6 , 7 ,8],
        [0 , 3 ,6],
        [1 , 4 ,7],
        [2 , 5 ,8],
        [0 , 4 ,8],
        [2 , 4 ,6],
    ];
    for(const combo of winnigCombos){
        const [ a, b, c] = combo;
        if(cells[a] && cells[a] === cells[b] && cells[a] === cells[c]){
            board.querySelector(`.cell[data-index = "${a}"]`).style.backgroundColor = '#ff4726';
            board.querySelector(`.cell[data-index = "${b}"]`).style.backgroundColor = '#ff4726';
            board.querySelector(`.cell[data-index = "${c}"]`).style.backgroundColor = '#ff4726';
            return cells[a];
        }

    }
    return null;
}

function resetGame(){
    gameOver = false;
    cells = Array.from({ length : 9 });
    board.querySelectorAll(".cell").forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("player-one", "player-two");
        cell.style.backgroundColor = "#492412"
    })

    setTimeout(() => {resetGameContuiner.style.display = "none";}, (100));
}

document.querySelector(".close").addEventListener("click", () => {
    window.location.reload();
})


function newScore(){
    localStorage.setItem(`score-one` ,0);
    localStorage.setItem(`score-two` ,0);
    playerOneScorepar.textContent = localStorage.getItem("score-one");
    playerTwoScorepar.textContent = localStorage.getItem("score-two");
 
}

cells.forEach((cell,index) => {
    cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index; // this line create new attribute  name data-(index for example)=> we can replace this
    cell.addEventListener("click" , handleClick)
    board.appendChild(cell);

});

checkWinner();
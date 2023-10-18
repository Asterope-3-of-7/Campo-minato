/*
  FASE DI PREPARAZONE
*/

// recuperare dalla pagina, elementi di interesse
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

//preparo delle informazioni utili alla logica di gioco
const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;

//generare numero totale di bombe casuali
while (bombsList.length < totalBombs) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!bombsList.includes(number)) bombsList.push(number);
}

console.log(bombsList);

/* ===
GRIGLIA E LOGICA DI GIOCO
=== */
let isCellEven = false;
let isRowEven = false;

for (let i = 1; i <= totalCells; i++) {
    // creo un elemento e gli do la classe 'cell'
    const cell = document.createElement('div');
    cell.classList.add('cell');

    isCellEven = i % 2 === 0;

    // se la riga è pari e la cella è pari: casella grigia
    // se la riga è dispari e la cella è dispari: casella grigia
    if ((isRowEven && isCellEven) || (!isRowEven && !isCellEven)) cell.classList.add('cell-dark');

    //se sono alla fine della riga
    if (i % 10 === 0) isRowEven = !isRowEven;

    // gestiamo il click sulla cella
    cell.addEventListener('click', function () {
        //controllo che la cella non sia stata cliccata
        if (cell.classList.contains('cell-clicked')) return;

        //questo codice avviene quando viene eseguito l'evento
        if (bombsList.includes(i)) {
            // se è una bomba
            cell.classList.add('cell-bomb');
            endGame(false);
        } else {
            // se non è una bomba
            cell.classList.add('cell-clicked')
            updateScore();
        }
    })

    //lo inserisco nella griglia
    grid.appendChild(cell);
}

// function score
function updateScore() {
    // incremento lo score
    score++;

    // lo inserisco nel contatore
    scoreCounter.innerText = String(score).padStart(2, 0);

    // controllo se l'utente ha già vinto
    if (score === maxScore) endGame(true);
}

// function end game
function endGame(isVictory) {
    if (isVictory === true) {
        // coloriamo di verde e cambiamo il messaggio
        endGameScreen.classList.add('win');
        endGameText.innerHTML = 'YOU WIN'
    } else {
        // riveliamo tutte le bombe
        revealAllBombs();
    }
    // mostriamo la schermata di fine
    endGameScreen.classList.remove('hidden');
}

// function play again
function playAgain() {
    location.reload();
}

function revealAllBombs() {
    // selezioniamo tutte le celle
    const cells = document.querySelectorAll('.cell');
    for (let i = 1; i <= cells.length; i++) {
        // controllo se la cella è una bomba
        if (bombsList.includes(i)) {
            const cellToReveal = cells[i - 1];
            cellToReveal.classList.add('cell-bomb');
        }
    }
}

/* === EVENTI ===*/
// gestione bottone play again
playAgainButton.addEventListener('click', playAgain);
const cellElement = document.querySelectorAll('[data-cell]')
let circleTurn 
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const board = document.getElementById('board')
const winningMessageTextElement = document.querySelector('[data-winning-text-message]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restart-button')

startGame()

function startGame() {
    circleTurn = false
    
    cellElement.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass()
}

restartButton.addEventListener('click', function() {
    [...cellElement].forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
    })
    winningMessageElement.classList.remove('show')
    startGame()

})

function handleClick(e) {
    const cell = e.target 
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.textContent = `Draw!`
    } else {
        winningMessageTextElement.textContent = `${circleTurn ? "O's" : "X's"} Wins!`
    } 
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function hoverEffect() {
    console.log('passou aqui')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass(e) {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS) 
    } else {
        board.classList.add(X_CLASS) 
    }  
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass)
        })
    })    
}
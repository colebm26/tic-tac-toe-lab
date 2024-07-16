/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board, winner, turn, tie


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetBtnEl = document.getElementById('reset')



/*-------------------------------- Functions --------------------------------*/
init()
function init() {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  render()
}

function render() {
    updateBoard()
    updateMessage()
}

function updateBoard() {
    board.forEach((cell, idx) => {
        if (cell === 'X') {
            squareEls[idx].textContent = '👽'
            //squareEls[idx].style.backgroundColor = 'red'
        } else if (cell === 'O') {
            squareEls[idx].textContent = '🤠'
            //squareEls[idx].style.backgroundColor = 'blue'
        } else {
            squareEls[idx].textContent = ''
            //squareEls[idx].style.backgroundColor = 'white'
        }
    })
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It is ${turn === 'X' ? '👽' : '🤠'}'s turn`
    } else if (!winner && tie) {
        messageEl.textContent = "Cat's game. Meow!! 😼"
    } else {
        messageEl.textContent = `${turn === 'X' ? '👽' : '🤠'} wins the game!`
    }
}

function handleClick(evt) {
    const squareIndex = parseInt(evt.target.id)
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner) {
        return
    }
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

function placePiece(idx) {
    board[idx] = turn
    console.log(board);
}

function checkForWinner() {
    if (
        (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) ||
        (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) ||
        (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) ||
        (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) ||
        (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) ||
        (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) ||
        (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) ||
        (board[2] !== '' && board[2] === board[4] && board[2] === board[6])
    ) {
        winner = true
    }
}

function checkForTie() {
    if (winner) {
        return
    }
    if (!board.includes('')) {
        tie = true
    }
}

function switchPlayerTurn() {
    if (winner) {
        return
    }
    if (turn === 'X') {
        turn = 'O'
    } else {
        turn = 'X'
    }
}
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((squareEl) => {
    squareEl.addEventListener('click', handleClick)
})

resetBtnEl.addEventListener('click', init)
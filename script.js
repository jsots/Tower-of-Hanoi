let towers = document.querySelectorAll(".tower")
let blocks = document.querySelectorAll(".block")
let init = null
let destination = null
let c = 0
let counterText = document.querySelector(".counter")
let errorCText = document.querySelector(".errorC")
let winText = document.querySelector(".winText")
let eC = 0
startGame()

function startGame() {
    towers.forEach((tower) => {
        tower.addEventListener("click", firstMove)
    })
}

function firstMove(e) {
    if (init === null && (e.target === towers[0].firstElementChild || e.target === towers[1].firstElementChild || e.target === towers[2].firstElementChild)) {
        init = e.target
        init.style.border = "2px solid hotpink"
    } else {
        destination = e.target
        if (destination === towers[0] || destination === towers[1] || destination === towers[2]) {
            move()
            moveCounter()
            checkWinner()
        }
    }
}

function move() {
    if (destination.firstElementChild === null) {
        moveCheck() // need to reset all variables here
    } else {
        compareBlocks()
        // need to compare to the thing that currently exists
    }
}

function moveCheck() {
    if (init !== null) {
        destination.prepend(init)
        resetBlock()
    }
}

function resetBlock () {
    init.style.border = "none"
    init = null
    destination = null
}

function compareBlocks() {
    if (init.classList[0] < destination.firstElementChild.classList[0]) {
        moveCheck()
    } else {
        resetBlock()
        errorCounter()
    }
}

function moveCounter() {
    c ++
    counterText.innerText = c-eC
}

function errorCounter() {
    eC ++
    errorCText.innerText = eC
}

function checkWinner() {
    if (towers[2].childElementCount === 5) {
       winText.innerText = "You win!"
    }
}
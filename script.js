let towers = document.querySelectorAll(".tower")
let blocks = document.querySelectorAll(".block")
let init = null
let destination = null
let c = 0
let counterText = document.querySelector(".counter")
let errorCText = document.querySelector(".errorC")
let winText = document.querySelector(".winText")
let winC = document.querySelector(".winC")
let eC = 0
let wC = 0
let i = 0
let j = 0
let timerSec = document.querySelector(".timerSec")
let timerMin = document.querySelector(".timerMin")
let clock = false
let winState = false
let playAgain = document.querySelector(".playAgain")
let secondsInterval
let minutesInterval
let reset = document.querySelector(".reset")
startGame()

reset.addEventListener("click", resetBoard)

blocks.forEach((block) => {
    block.addEventListener("mouseover", () => {
        block.style.background = "hotpink"
    })
    block.addEventListener("mouseleave", () => {
        block.style.background = "white"
    })
})

function startGame() {
    towers.forEach((tower) => {
        tower.addEventListener("click", firstMove)
    })
}

function firstMove(e) {
    if(clock == false && winState === false) {
        timer()
        clock = true
    }    
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

    // if (init === null && e.target.ElementCount >= 1 && (e.target !== towers[0].firstElementChild || e.target !== towers[1].firstElementChild || e.target !== towers[2].firstElementChild)) {
    //     init = e.target
    //     errorCounter()
    //     shakes()
    //     init.style.border = "solid black"
    // }
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
    init.style.border = "solid black"
    init = null
    destination = null
}

function compareBlocks() {
    if (init.classList[0] < destination.firstElementChild.classList[0]) {
        moveCheck()
    } else {
        errorCounter()
        shakes()
        init.style.border = "solid black"
    }
}

function shakes() {
    init.classList.add("shake")
    init.style.background = "red"
    setTimeout(resetShakes, 500)
    setTimeout(resetBlock, 501)
}

function resetShakes() {
    init.classList.remove("shake")
    init.style.background = "white"
}

function moveCounter() {
    c ++
    counterText.innerText = `Moves: ${c-eC}`
}

function errorCounter() {
    eC ++
    errorCText.innerText = `Errors: ${eC}`
}

function checkWinner() {
    if (towers[2].childElementCount === 5) {
        clearInterval(secondsInterval)
        clearInterval(minutesInterval)
        winText.innerText = "You win!"
       wC++
       winC.innerText = `Wins: ${wC}`
       playAgain.innerText = "Play again?"
       playAgain.addEventListener("click", resetBoard)
       winState = true
    }
}

function resetBoard () {
    c = 0
    eC = 0
    i = 0
    j = 0
    if (towers[2].childElementCount !== 0) {
        towers[2].removeChild(towers[2].firstChild)
        for (let bi = 0; bi < 5; bi++) {
            towers[0].append(blocks[bi])
        }
        counterText.innerText = `Moves: ${c}`
        errorCText.innerText = `Errors: ${eC}`
        clearInterval(secondsInterval)
        clearInterval(minutesInterval)
        timerSec.innerText = "0" + `${i}`
        timerMin.innerText = "0" + `${j}` +  ":"
        clock = false
        playAgain.innerText = ""
        winText.innerText = ""
    }
    startGame()
}

function timer() {
   secondsInterval = setInterval(incrementI, 1000)
   minutesInterval = setInterval(incrementJ, 60000)
}

function incrementI () {
    if (i<59) {
        i++
        if (i<10) {
            timerSec.innerText = "0" + `${i}`
        } else {
            timerSec.innerText = `${i}`
        }
    } else {
        i = 0
        timerSec.innerText = "0" + `${i}`
    }
}

function incrementJ () {
    if (j<98) {
        j++
        if (j<10) {
            timerMin.innerText = "0" + `${j}` + ":"
        } else {
            timerMin.innerText = `${j}` + ":"
        }
    } else {
        j = 0
        timerMin.innerText = "0" + `${j}` + ":" 
    }
}
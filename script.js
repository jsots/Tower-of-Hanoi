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
let b1 = document.querySelector("#b1")
let b2 = document.querySelector("#b2")
let b3 = document.querySelector("#b3")
let b4 = document.querySelector("#b4")
let b5 = document.querySelector("#b5")
let easy = document.querySelector(".easy")
let medium = document.querySelector(".medium")
let hard = document.querySelector(".hard")
let easyMode = true
let mediumMode = false
let hardMode = false
let solved = false
let ol = document.querySelector("ol")
startGame()

// reset.addEventListener("click", resetBoard)

blocks.forEach((block) => {
    block.addEventListener("mouseover", () => {
        block.style.background = "hotpink"
    })
    block.addEventListener("mouseleave", () => {
        block.style.background = "white"
    })
})

if (winState === false) {
    easy.addEventListener("click", changeMode)
    medium.addEventListener("click", changeMode)
    hard.addEventListener("click", changeMode)
}

function startGame() {
    winState = false
    towers.forEach((tower) => {
        tower.addEventListener("click", firstMove)
    })
    mode()
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
    if (hardMode === true) {
        if (towers[2].childElementCount === 5) {
            clearInterval(secondsInterval)
            clearInterval(minutesInterval)
            winState = true
            winText.innerText = "You win!"
            wC++
            winC.innerText = `Wins: ${wC}`
            playAgain.innerText = "Play again?"
            playAgain.addEventListener("click", resetBoard)
            removeAllChildren(ol)
        }
    } else if (mediumMode === true) {
        if (towers[2].childElementCount === 4) {
            clearInterval(secondsInterval)
            clearInterval(minutesInterval)
            winState = true
            winText.innerText = "You win!"
            wC++
            winC.innerText = `Wins: ${wC}`
            playAgain.innerText = "Play again?"
            playAgain.addEventListener("click", resetBoard)
            removeAllChildren(ol)
        }
    } else if (easyMode === true) {
        if (towers[2].childElementCount === 3) {
            clearInterval(secondsInterval)
            clearInterval(minutesInterval)
            winState = true
            winText.innerText = "You win!"
            wC++
            winC.innerText = `Wins: ${wC}`
            playAgain.innerText = "Play again?"
            playAgain.addEventListener("click", resetBoard)
            removeAllChildren(ol)
        }
    }
}

function resetBoard () {
    c = 0
    eC = 0
    i = 0
    j = 0
    if (towers[2].childElementCount !== 0 || towers[1].childElementCount !==0) {
        // towers[2].removeChild(towers[2].firstChild)
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
        removeAllChildren(ol)
    }
    startGame()
}

function removeAllChildren (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function mode() {
    if (easyMode === true && towers[0].childElementCount > 3) {
        for (let mi = 0; mi < towers[0].childElementCount - 2; mi++) {
            towers[0].removeChild(towers[0].lastElementChild)
        }
    } else if (mediumMode === true && towers[0].childElementCount > 4) {
        for (let mi = 0; mi < towers[0].childElementCount - 3; mi++) {
            towers[0].removeChild(towers[0].lastElementChild)
        }
    } else if (winState === false && hardMode === true && towers[0].childElementCount < 5) {
        towers[0].append(b4, b5)
    } else if (mediumMode === true && towers[0].childElementCount === 3) {
        towers[0].append(b4)
    }
}

function changeMode(e) {
    let modeText = e.target.innerText.toLowerCase()
    if (modeText === "easy" && winState === false && easyMode === false) {
        easyMode = true
        mediumMode = false
        hardMode = false
        resetBoard()
        wC = 0
        winC.innerText = `Wins: ${wC}`
        removeAllChildren(ol)
    } else if (modeText === "medium" && winState === false && mediumMode === false) {
        easyMode = false
        mediumMode = true
        hardMode = false  
        resetBoard()
        wC = 0 
        winC.innerText = `Wins: ${wC}`
        removeAllChildren(ol)
    } else if (modeText === "hard" && winState === false && hardMode === false) {
        easyMode = false
        mediumMode = false
        hardMode = true
        resetBoard()
        wC = 0
        winC.innerText = `Wins: ${wC}`
        removeAllChildren(ol)
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

// Solve algorithm below:
let source = document.querySelector("#t1")
let aux = document.querySelector("#t2")
let dest = document.querySelector("#t3")
let solutionText = document.querySelector(".solution-container")

// Below defines the move function:

function moveBlockToSolve (b, source, dest) {
    source.removeChild(b);
    dest.prepend(b);
    moveCounter()
}

// Below defines the recursive function:
let stepCount = 0

function  solveTowersOfHanoi (n, source, dest, aux) {
    // The base condition, moving the very top block:
    if (n === 1) {
        stepCount++
        setTimeout(() => {moveBlockToSolve(b1, source, dest)}, 500*stepCount);
        let li = document.createElement("li")
        li.innerText = `Move disk ${n} from ${source.id} to ${dest.id}`
        setTimeout(() => {solutionText.append(li)}, 500*stepCount) // The stepCount will allow for this to happen step-by-step
        return;
    }
    // Recursive condition, what will happen to the other blocks
    solveTowersOfHanoi(n-1, source, aux, dest);
    let li = document.createElement("li")
    li.innerText = `Move disk ${n} from ${source.id} to ${dest.id}`
    stepCount++
    setTimeout(() => {solutionText.append(li)}, 500*stepCount)
    setTimeout(() => {moveBlockToSolve(window[`b${n}`], source, dest)}, 500*stepCount);
    solveTowersOfHanoi(n-1, aux, dest, source);
    solved = true
}

let solve = document.querySelector(".solve")

solve.addEventListener("click", function () {
    if (easyMode === true && ol.childElementCount === 0) {
        solveTowersOfHanoi(3, source, dest, aux)
    } else if (mediumMode === true && ol.childElementCount === 0) {
        solveTowersOfHanoi(4, source, dest, aux)
    } else if (hardMode === true && ol.childElementCount === 0) {
        solveTowersOfHanoi(5, source, dest, aux)
    }
})
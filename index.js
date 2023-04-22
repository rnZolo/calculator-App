const math = require('mathjs');

// elements in simple calculator
const inputs = document.querySelectorAll('.input'),
    devInfoBtn = document.querySelector('.info-btn'),
    delClrBtns = document.querySelectorAll('.erase'),
    dynamicDisplay = document.querySelectorAll('.dynamic'),
    equalBtn = document.querySelector('.equal')
// console.log(inputValue)

// display in simple calculator
const devInfoDisplay = document.querySelector('.info-display'),
    inputValue = document.querySelector('.val'),
    evaluatedExp = document.querySelector('.formula')

// //adding eventListener
devInfoBtn.addEventListener('click', onOffInfo)// del and clear
delClrBtns.forEach((element, index) => {
    if (index) {
        element.addEventListener('click', clear)
    } else {
        element.addEventListener('click', del)
    }
})

for (let input of inputs) { // digits 
    input.addEventListener('click', function () {
        let value = this.value
        pushInput(value);
    });
}

equalBtn.addEventListener('click', evaluate)

// other variables 
let infoShowed = false,
    inputAsArray = [],
    inputAsString,
    total

function evaluate() {
    try {
        total ?? 0
        console.log(total)
        const expWithUniqueChar = inputAsArray.map((ch) => {
            if (ch === "√") {
                return Math.sqrt();
            } else {
                return ch;
            }
        }).join("");
        total = math.evaluate(expWithUniqueChar)
        evaluatedExp.textContent = inputAsString
        inputValue.textContent = total
        return total;
    } catch (error) {
        inputValue.textContent = 'Invalid'
        inputAsArray = []
    }
}

function pushInput(value) {
    checkDevInfo()
    if (evaluatedExp.textContent) {
        inputAsArray = []
        inputAsString = ''
        evaluatedExp.textContent = ''
        totalAsArray = String(total).split()
        inputAsArray.push(...totalAsArray)
        inputAsArray.push(value)
        printInput(inputAsArray)
    } else {
        inputAsArray.push(value)
        printInput(inputAsArray)
    }
}

function del() { //delete the recent charachter input
    if (infoShowed) {
        checkDevInfo()
    } else {
        inputAsArray.pop()
        printInput(inputAsArray)
    }
}

function clear() { //clear all inputs
    if (infoShowed) {
        checkDevInfo()
    } else {
        inputAsArray = []
        inputAsString = ''
        for (let display of dynamicDisplay) {
            display.textContent = ""
        }
    }
}

function printInput(arr) {
    inputAsString = arr.join('')
    inputValue.textContent = ''
    inputValue.textContent = inputAsString
    console.log(inputAsString)
    console.log(inputAsArray)
}
function onOffInfo() { // show the dev info, creator and year
    if (!infoShowed) {
        devInfoDisplay.style.display = "grid"
        return infoShowed = true;
    } else {
        displayNone(devInfoDisplay)
        return infoShowed = false;
    }
}

function checkDevInfo() { //check if dev info is showed
    infoShowed ? onOffInfo() : infoShowed = false;
}

function offInfo() {  // close the dev info : usable by other buttons
    displayNone(devInfoDisplay)
    return infoShowed = false;
}

function displayNone(element) { //hide an element
    return element.style.display = "none"
}


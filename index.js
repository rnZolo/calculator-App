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
    equalOrErrorDisplay = document.querySelector('.eq-er'),
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
    total,
    equalIcon = ["fa-regular", "fa-equals", "fa-2xs"],
    invalidIcon = ["fa-solid", "fa-circle-xmark", "fa-fade", "fa-xs"],
    fadeAnimate = ["fa-fade"]

function evaluate() {
    try {
        total ?? 0
        let expWithUniqueChar = inputAsString,
            ithasPercent = true,
            percentPosition,
            operatorsValue = '+-*/()',
            value,
            newValue,
            percentValue
        do {
            if (expWithUniqueChar.includes('%')) {
                console.log(`there is %`)
                value = []
                //get the position of the % character
                percentPosition = expWithUniqueChar.indexOf('%')
                console.log(` position of % ${percentPosition}`)
                // use the % character to loop and get the values before that character
                for (let p = percentPosition - 1; p >= 0; p--) {
                    if (operatorsValue.includes(expWithUniqueChar.charAt([p]))) {
                        console.log(` aha an operator lets stop this`)
                        break;
                    } else {
                        value.unshift(expWithUniqueChar.charAt([p]))
                        console.log(`these are values before % ${value}`)
                    }
                }
                percentValue = `${value.join('')}%`
                console.log(` this is the percent value${percentValue}`)
                newValue = (Number(value.join('')) / 100)
                console.log(` percent value converted to decimal ${newValue}`)
                expWithUniqueChar = expWithUniqueChar.replace(percentValue, newValue)
                console.log(`replaced String ${expWithUniqueChar.replace(percentValue, newValue)}`)
            } else {
                console.log(` no more % yehey`)
                ithasPercent = false
            }
        } while (ithasPercent === true);
        console.log(` passed String ${expWithUniqueChar}`)
        total = math.evaluate(expWithUniqueChar)
        console.log(`evaluated ${total}`)
        evaluatedExp.textContent = inputAsString
        addIcon(equalOrErrorDisplay, equalIcon)
        inputValue.textContent = total
        return total;
    } catch (error) {
        addIcon(equalOrErrorDisplay, invalidIcon)
        inputValue.textContent = 'Invalid'
        addIcon(inputValue, fadeAnimate)
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
        removeIcon(equalOrErrorDisplay, invalidIcon)
        removeIcon(inputValue, fadeAnimate)
        for (let display of dynamicDisplay) {
            display.textContent = ""
        }
    }
}

function printInput(arr) {
    inputAsString = arr.join('')
    inputValue.textContent = ''
    removeIcon(equalOrErrorDisplay, equalIcon)
    removeIcon(equalOrErrorDisplay, invalidIcon)
    removeIcon(inputValue, fadeAnimate)
    inputValue.textContent = inputAsString
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
function addIcon(el, clss) {
    clss.forEach((cl) => {
        el.classList.add(cl)
    })
}
function removeIcon(el, clss) {
    clss.forEach((cl) => {
        el.classList.remove(cl)
    })
}
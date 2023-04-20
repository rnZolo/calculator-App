(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


// elements in simple calculator
const inputs = document.querySelectorAll('.input'),
    devInfoBtn = document.querySelector('.info-btn'),
    delClrBtns = document.querySelectorAll('.erase'),
    dynamicDisplay = document.querySelectorAll('.dynamic'),
    inputValue = document.querySelector('.val'),
    inputOperatorDisplay = document.querySelector('.operator'),
    changers = document.querySelectorAll('.change'),
    operators = document.querySelectorAll('.math-op')
// console.log(inputValue)

// other variables 
let infoShowed = false,
    inputAsArray = inputValue.textContent.split(''),
    editInput,
    mathInputs = [],
    maxOpDisplayLngth = 1

// display in simple calculator
const devInfoDisplay = document.querySelector('.info-display')

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
        pushInput(this.value);
    });
}

operators.forEach((op) => {
    op.addEventListener('click', function () {
        if (this.value === '*') {
            addOperator('x', this.value)
        } else if (this.value === '/') {
            addOperator('÷', this.value)
        } else {
            addOperator(this.value, this.value)
        }
    })
})

// changers.forEach((changer, index) => {
//     if (index === 0) {
//         console.log(changer.value)
//     } else if (index === 1) {
//         console.log(changer.value)
//     } else {
//         // percent()
//         console.log(changer.value)
//     }
// })


function equals() {
    let toBeCal = mathInputs
    console.log(toBeCal);
    toBeCal.pop()
    console.log(toBeCal);
    let output = toBeCal.join(' ');
    let result = math.eval(output);
    console.log(result);
    inputValue.textContent = result;
}


function addOperator(op, orig) {
    if (inputOperatorDisplay.length <= 1)
        inputOperatorDisplay.textContent = op
    let fval = inputAsArray.join('')
    if (inputValue.textContent) {
        addToExp(fval)
        addToExp(orig)
        inputAsArray = []
        inputValue.textContent = ''
        console.log(inputOperatorDisplay.length)
    } else {
        inputAsArray = []
        inputValue.textContent = ''
        console.log(mathInputs)
    }
    inputAsArray = []
    inputValue.textContent = ''
    console.log(mathInputs)
}

function addToExp(exp) {
    mathInputs.push(exp)
    console.log(mathInputs.length)
    if (mathInputs.length > 3) {
        equals()
    }
}

function pushInput(value) {
    checkDevInfo()
    inputValue.textContent += value
    inputAsArray.push(value)
}

function del() { //delete the recent charachter input
    if (infoShowed) {
        checkDevInfo()
    } else {
        inputValue.textContent ? withVal() : withoutVal()
    }
}

function clear() { //clear all inputs
    if (infoShowed) {
        checkDevInfo()
    } else {
        inputAsArray = []
        mathInputs = []
        for (let display of dynamicDisplay) {
            display.textContent = ""
        }
    }
}

function withVal() { //will del char intead of operator
    inputAsArray.pop()
    editInput = inputAsArray.join('')
    console.log(inputAsArray)
    console.log(mathInputs)
    return inputValue.textContent = editInput
}

function withoutVal() { // wukk dek operator if there's no char
    inputOperatorDisplay.textContent = ""
    console.log(inputAsArray)
    console.log(mathInputs)
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
    element.style.display = "none"
}


},{}]},{},[1]);

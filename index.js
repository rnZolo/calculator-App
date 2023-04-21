const math = require('mathjs');


// elements in simple calculator
const inputs = document.querySelectorAll('.input'),
    devInfoBtn = document.querySelector('.info-btn'),
    delClrBtns = document.querySelectorAll('.erase'),
    dynamicDisplay = document.querySelectorAll('.dynamic'),
    formulaDisplay = document.querySelector('.formula'),
    inputValue = document.querySelector('.val'),
    inputOperatorDisplay = document.querySelector('.operator'),
    changers = document.querySelectorAll('.change'),
    operators = document.querySelectorAll('.math-op')
// console.log(inputValue)

// other variables 
let infoShowed = false,
    inputAsArray = inputValue.textContent.split(''),
    editInput,
    staging = [],
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

function equals() {
    let staged = staging
    console.log(staged);
    let output = staged.join(' ');
    const parser = math.parser()
    let result = parser.evaluate(output);
    staging.push(result)
    inputValue.textContent = result;
}


function addOperator(op, orig) {
    //avoid adding operator if no initial value
    if (inputValue.textContent) { //true, if not empty 
        let fval = inputAsArray.join('') //pass the value of inputs as string

        console.log(`added to stage: ${staging}`)
        if (!inputOperatorDisplay.textContent) { //if there's no operator allow only one
            inputOperatorDisplay.textContent = op
            staged(fval) //add input into stage
            staged(orig) //add input into stage
        }
        formulaDisplay.textContent += `${staging} `
        inputAsArray = []
        inputValue.textContent = ''
        inputOperatorDisplay.textContent = ''
    }
}

function staged(exp) {
    staging.push(exp)
    formulaDisplay.textContent += exp
    console.log(staging.length)
    if (staging.length >= 3) {
        equals()
    }
}

function pushInput(value) {
    checkDevInfo()
    inputValue.textContent += value
    inputAsArray.push(value)
    console.log(`cliked: ${inputAsArray}`)
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
        staging = []
        console.log(`clrd: ${inputAsArray}`)
        console.log(`clrd: ${staging}`)
        for (let display of dynamicDisplay) {
            display.textContent = ""
        }
    }
}

function withVal() { //will del char intead of operator
    inputAsArray.pop()
    editInput = inputAsArray.join('')
    console.log(`not del: ${inputAsArray}`)
    console.log(`not del: ${staging}`)
    return inputValue.textContent = editInput
}

function withoutVal() { // will del operator if there's no char
    inputOperatorDisplay.textContent = ""
    console.log(inputAsArray)
    console.log(staging)
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
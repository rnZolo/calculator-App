

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
    let toBeCal = staging
    console.log(toBeCal);
    toBeCal.pop()
    console.log(toBeCal);
    let output = toBeCal.join(' ');
    let result = math.eval(output);
    console.log(result);
    inputValue.textContent = result;
}

function addOperator(op, orig) {
    if (!inputOperatorDisplay.textContent) { //if there's no operator allow only one
        inputOperatorDisplay.textContent = op
    }
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
        console.log(`staged: ${staging}`)
    }
    inputAsArray = []
    inputValue.textContent = ''
    console.log(`staged: ${staging}`)
}

function addToExp(exp) {
    staging.push(exp)
    console.log(staging.length)
    if (staging.length > 3) {
        equals()
    }
}

function pushInput(value) {
    checkDevInfo()
    // inputValue.textContent += value
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


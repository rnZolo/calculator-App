// buttons in simple calculator
const inputs = document.querySelectorAll('.input'),
    devInfoBtn = document.querySelector('.info-btn'),
    delClrBtns = document.querySelectorAll('.erase'),
    dynamicDisplay = document.querySelectorAll('.dynamic'),
    inputValue = document.querySelector('.val'),
    inputOperator = document.querySelector('.operator')
// console.log(inputValue)

// other variables 
let infoShowed = false,
    inputAsArray = inputValue.textContent.split(''),
    editInput,
    mathInputs = []

// display in simple calculator
const devInfoDisplay = document.querySelector('.info-display')

// //adding eventListener

devInfoBtn.addEventListener('click', onOffInfo)
delClrBtns.forEach((element, index) => {
    if (index) {
        element.addEventListener('click', clear)
    } else {
        element.addEventListener('click', del)
    }
})

for (let input of inputs) {
    input.addEventListener('click', function () {
        pushInput(this.value);
    });
}

//functions
function pushInput(value) {
    inputValue.textContent += value
    inputAsArray.push(value)
}

function del() { //delete the recent charachter input
    checkDevInfo()
    inputValue.textContent ? withVal() : withoutVal()
}

function clear() { //clear all inputs
    checkDevInfo()
    inputAsArray = []
    mathInputs = []
    for (let display of dynamicDisplay) {
        display.textContent = ""
    }
}

function withVal() {
    inputAsArray.pop()
    editInput = inputAsArray.join('')
    return inputValue.textContent = editInput
}

function withoutVal() {
    inputOperator.textContent = ""
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
// buttons in simple calculator
const digits = document.querySelectorAll('.digit'),
    devInfoBtn = document.querySelector('.info-btn'),
    delClrBtns = document.querySelectorAll('.erase'),
    dynamicDisplay = document.querySelectorAll('.dynamic'),
    inputValue = document.querySelector('.val'),
    inputOperator = document.querySelector('.operator')
// console.log(inputValue)

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

// // for (let digit of digits) {
// //     // digit.addEventListen
// // }

// other variables 
let infoShowed = false,
    inputAsArray = inputValue.textContent.split(''),
    editInput,
    mathInputs = []


//functions
function del() { //delete the recent charachter input
    console.log('del')
    checkDevInfo()
    inputValue.textContent ? withVal() : withoutVal()
}

function clear() { //clear all inputs
    console.log('clr')
    checkDevInfo()
    for (let display of dynamicDisplay) {
        display.textContent = ""
    }
}

function withVal() {
    inputAsArray.pop()
    editInput = inputAsArray.join('')
    console.log(inputAsArray)
    return inputValue.textContent = editInput
}

function withoutVal() {
    inputOperator.textContent = ""
}
function onOffInfo() { // show the dev info, creator and year
    if (!infoShowed) {
        devInfoDisplay.style.display = "grid"
        console.log("dev info is Showed")
        return infoShowed = true;
    } else {
        displayNone(devInfoDisplay)
        console.log("dev info is not Showed")
        return infoShowed = false;
    }
}

function checkDevInfo() { //check if dev info is showed
    console.log("dev info is not Showed")
    infoShowed ? onOffInfo() : infoShowed = false;
}

function offInfo() {  // close the dev info : usable by other buttons
    displayNone(devInfoDisplay)
    console.log("dev info is not Showed")
    return infoShowed = false;
}

function displayNone(element) { //hide an element
    element.style.display = "none"
}
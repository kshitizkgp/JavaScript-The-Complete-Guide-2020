const defaultResult = 0;
let currentResult = defaultResult;

function add(a, b) {
    const calcDescription = `${currentResult}  + ${parseInt(userInput.value)}`;
    currentResult = currentResult + parseInt(userInput.value);
    outputResult(currentResult, calcDescription);
}

function subtract(a, b) {
    const calcDescription = `${currentResult}  - ${parseInt(userInput.value)}`;
    currentResult = currentResult - parseInt(userInput.value);
    outputResult(currentResult, calcDescription);
}

function multiply(a, b) {
    const calcDescription = `${currentResult}  * ${parseInt(userInput.value)}`;
    currentResult = currentResult * parseInt(userInput.value);
    outputResult(currentResult, calcDescription);
}

function divide(a , b) {
    const calcDescription = `${currentResult}  / ${parseInt(userInput.value)}`;
    currentResult = currentResult / parseInt(userInput.value);
    outputResult(currentResult, calcDescription);
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);

outputResult(currentResult);


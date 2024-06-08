let previousOperand = '';
let currentOperand = '';
let operator;
renderResult();

function renderResult() {
    document.querySelector('.js-previous-operand').innerHTML = previousOperand;
    document.querySelector('.js-current-operand').innerHTML = currentOperand;
}

setInterval(function () {
    renderResult();
}, 100);

const AcElem = document.querySelector('.js-ac');
const DelElem = document.querySelector('.js-del');
const negPosElem = document.querySelector('.js-neg-pos');
const decimalElem = document.querySelector('.js-decimal');
const showResultElem = document.querySelector('.js-result');
const operatorElem = document.querySelectorAll('.js-operator');
const numberElem = document.querySelectorAll('.js-number');

AcElem.addEventListener("click", function () {
    previousOperand = '';
    currentOperand = '';
    renderResult();
});

DelElem.addEventListener('click', function () {
    if (previousOperand === '' && currentOperand === '') return;
    else if (currentOperand === '') {
        previousOperand = previousOperand.slice(0, previousOperand.length - 1);
        currentOperand = previousOperand;
        previousOperand = '';
    }
    else {
        currentOperand = currentOperand.slice(0, currentOperand.length - 1);
    }
    console.log(`${previousOperand} ${currentOperand}`);

    renderResult();
});

numberElem.forEach(button => {
    button.addEventListener('click', function () {
        let buttonNumber = button.innerText;
        currentOperand += buttonNumber;
        console.log(`${previousOperand} ${currentOperand}`)
    });
});

negPosElem.addEventListener('click', function () {
    if (previousOperand === '' && currentOperand === '') return;

    
    let var1 = parseFloat(previousOperand) || 0;
    let var2 = parseFloat(currentOperand) || 0;

    if (currentOperand === '') {
        previousOperand = String(-var1);
    } else {
        currentOperand = String(-var2);
    }

    console.log(`${previousOperand} ${currentOperand}`);
    renderResult();

});

operatorElem.forEach(button => {
    button.addEventListener('click', () => {

        const buttonData = button.innerText;

        if (previousOperand === '' && currentOperand === '') return;
        else if (previousOperand === '') {
            previousOperand = currentOperand + buttonData;
            currentOperand = '';
            operator = buttonData;
        }
        else {
            compute();
            previousOperand = currentOperand + buttonData;
            currentOperand = '';
            operator = buttonData;
        }
        renderResult();
    })
});

decimalElem.addEventListener('click', function () {
    if (currentOperand.includes('.')) return;
    if (currentOperand === '') {
        currentOperand = '0.';
    }
    else {
        currentOperand += '.';
    }
});

showResultElem.addEventListener('click', function () {
    compute();
});
function compute() {
    //take blank as zero in the compute method and save the result in currentOperand variable
    let var1 = parseFloat(previousOperand) || 0;
    let var2 = parseFloat(currentOperand) || 0;
    let result;
    switch (operator) {
        case '+':
            result = var1 + var2;
            break;

        case '-':
            result = var1 - var2;
            break;

        case 'X':
            result = var1 * var2;
            break;

        case '/':
            if (var2 === 0)
                result = 'Infinty Syntax Error';
            else
                result = var1 / var2;
            break;

        case '%':
            result = var1 % var2;
            break;
    }
    result = Math.round(result * 100) / 100;
    currentOperand = String(result);
    previousOperand = '';
    console.log(`${var1} ${operator} ${var2}= ${result}`);
}



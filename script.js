let currentInput = '';
let previousInput = '';
let operation = null;

const currentDisplay = document.getElementById('current-display');
const previousDisplay = document.getElementById('previous-display');

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput = currentInput.toString() + number.toString();
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clearScreen();
                return;
            }
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default: return;
    }
    
    currentInput = parseFloat(computation.toFixed(8)).toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

function clearScreen() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    if (currentDisplay) {
        currentDisplay.innerText = currentInput === '' ? '0' : currentInput;
    }
    if (previousDisplay) {
        if (operation != null) {
            previousDisplay.innerText = `${previousInput} ${operation}`;
        } else {
            previousDisplay.innerText = '';
        }
    }
}
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Round to avoid floating point precision issues
        computation = Math.round((computation + Number.EPSILON) * 100000000) / 100000000;
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        if (this.currentOperand === '') {
            this.currentOperandTextElement.innerText = '0';
        } else {
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        }
        
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    // Add visual feedback for button presses
    addButtonPressEffect(button) {
        button.classList.add('pressed');
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 100);
    }
}

// Initialize calculator
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers
    if (key >= '0' && key <= '9') {
        calculator.appendNumber(key);
        highlightButton(key);
    }
    
    // Decimal point
    if (key === '.') {
        calculator.appendNumber('.');
        highlightButton('.');
    }
    
    // Operations
    if (key === '+') {
        calculator.chooseOperation('+');
        highlightButtonByOperation('+');
    }
    if (key === '-') {
        calculator.chooseOperation('-');
        highlightButtonByOperation('-');
    }
    if (key === '*') {
        calculator.chooseOperation('×');
        highlightButtonByOperation('×');
    }
    if (key === '/') {
        event.preventDefault(); // Prevent default browser search
        calculator.chooseOperation('÷');
        highlightButtonByOperation('÷');
    }
    
    // Equals
    if (key === 'Enter' || key === '=') {
        calculator.compute();
        highlightButtonByClass('equals');
    }
    
    // Clear
    if (key === 'Escape' || key.toLowerCase() === 'c') {
        calculator.clear();
        highlightButtonByClass('clear');
    }
    
    // Delete/Backspace
    if (key === 'Backspace' || key === 'Delete') {
        calculator.delete();
        highlightButtonByClass('delete');
    }
});

// Helper functions for keyboard visual feedback
function highlightButton(text) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button.innerText === text) {
            calculator.addButtonPressEffect(button);
        }
    });
}

function highlightButtonByOperation(operation) {
    const buttons = document.querySelectorAll('.btn.operator');
    buttons.forEach(button => {
        if (button.innerText === operation) {
            calculator.addButtonPressEffect(button);
        }
    });
}

function highlightButtonByClass(className) {
    const button = document.querySelector(`.btn.${className}`);
    if (button) {
        calculator.addButtonPressEffect(button);
    }
}

// Add click effects to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        calculator.addButtonPressEffect(button);
    });
});

console.log('Calculator loaded successfully! You can use both mouse clicks and keyboard input.');
console.log('Keyboard shortcuts:');
console.log('- Numbers: 0-9');
console.log('- Operations: +, -, *, /');
console.log('- Equals: Enter or =');
console.log('- Clear: Escape or C');
console.log('- Delete: Backspace or Delete');
console.log('- Decimal: .');
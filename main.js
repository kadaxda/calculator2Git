// Math operations
let add = function(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let operate = function(num1, num2, cb) {
    if(num2 == 0 && cb == divide) {
        return "ERROR, dont divide by 0!"
    }
    console.log(num1, num2, cb)
    return Math.round(cb(Number(num1), Number(num2)) * 100) / 100

};

// Global variables
let num1 = "", num2 = "", operator = "";
let clearScreen = false; temp = "";
let dot1 = false; dot2 = false;
let displayArray = [];

// DOM - Display
const display = document.querySelector(".display p");


//DOM - Numbers
const btnNumbers = document.querySelectorAll(".numbers");
btnNumbers.forEach((button) => {
    button.addEventListener("click", (e) => {
        if(operator == "" && num2 == "" && clearScreen == false) {
            num1 += e.target.value;

            display.textContent = num1;
        }

        if(operator != "" && num1 != "") {
            num2 += e.target.value;

            display.textContent = `${num1} ${operator} ${num2}`
        }

        if(num1 != "" && num2 == "" && operator == "" && clearScreen == true) {
            num1 = e.target.value;
            display.textContent = num1;
            clearScreen = false;
            dot1 = false;
            dot2 = false;
        }
    })
})

// DOM - Operators
const btnOperators = document.querySelectorAll(".operators");
btnOperators.forEach((button) => {
    button.addEventListener("click", (e) => {
        if(num1 != "" && num2 == "") {
            operator = e.target.value;
            display.textContent += ` ${operator}`
        }
        if(num1 != "" && num2 != "" && operator != "") {
            console.log(num1, num2, getOperator());
            display.textContent = operate(num1, num2, getOperator());
            clearVariables();
            operator = e.target.value;
            num1 = display.textContent;

            if(num1 != "" && num2 == "" && operator != "") {
                display.textContent += ` ${operator}`;
            }
        }
        
    })
})

// DOM - Equals
const equalBtn = document.querySelector("#equals");
equalBtn.addEventListener("click", (e) => {
    console.log(num1, num2, getOperator());
    display.textContent = operate(num1, num2, getOperator());
    num1 = operate(num1, num2, getOperator());
    clearVariables();
    num1 = display.textContent;
    clearScreen = true;
    dot1 = false;
    dot2 = false;
})

// DOM - Clear
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener ("click", (e) => {
    clearVariables();
    clearScreen = false;
    display.textContent = "";
    dot1 = false;
    dot2 = false;
})

// DOM - Dot
const dotBtn = document.querySelector("#dot");
dotBtn.addEventListener("click", (e) => {
     if(operator == "" && dot1 == false) {   
        display.textContent += ".";
        num1 += ".";
        dot1 = true;
     } else if(operator != "" && dot2 == false) {
         display.textContent += ".";
         num2 += ".";
         dot2 = true;
     }
})

// DOM - Undo
const undoBtn = document.querySelector("#undo");
undoBtn.addEventListener("click", (e) => {
    if(num1 != "" && operator == "" && num2 == "") {
        displayArray = display.textContent.split("");
        displayArray.pop();
        display.textContent = displayArray.join("");
        num1 = display.textContent;
    } else if(num1 != "" && operator != "" && num2 == "") {
        displayArray = display.textContent.split("");
        displayArray.pop();
        display.textContent = displayArray.join("");
        
    } else if(num1 != "" && operator != "" && num2 != "") {
        displayArray = display.textContent.split("");
        displayArray.pop();
        display.textContent = displayArray.join("");
        displayArray = num2.split("");
        displayArray.pop();
        num2 = displayArray.join("");
    }

})

function getOperator() {
    if (operator == "+") {
        return add;
    } else if(operator == "-") {
        return subtract;
    } else if(operator == "*") {
        return multiply;
    } else if(operator == "/") {
        return divide;
    } else {
        return "";
    }
}

function clearVariables() {
    num1 = "";
    num2 = "";
    operator = "";
}
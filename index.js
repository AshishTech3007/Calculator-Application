
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        // removing a single number
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number) {
       if(number==='.'&& this.currentOperand.includes('.')) return;
       this.currentOperand =this.currentOperand.toString()+number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand==='') return;
        if(this.previousOperand!=''){
            this.compute();
        }
        this.previousOperand=this.currentOperand;
        this.operation=operation;
        this.currentOperand='';
    }

    compute() {
        let prev=parseFloat(this.previousOperand);
        let cur=parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(cur)) return;
        let result;
        switch(this.operation){
            case '+':
                result= prev+cur;
                break;
            case '-':
                result= prev-cur;
                break;
            case '*':
                result= prev*cur;
                break;
            case '÷':
                result= prev/cur;
                break;
            default:return;
        }
        this.operation=undefined;
        this.currentOperand=result;
        this.previousOperand='';
    }
    getDisplayNumberComma(number){
        let stringnumber=number.toString();
        let integerno=parseFloat(stringnumber.split('.')[0]);
        let decimalno=stringnumber.split('.')[1];
        let integerdisplay;
        if(isNaN(integerno)){
            integerdisplay='';
        }
        else{
            integerdisplay=integerno.toLocaleString('en',{maximumFractionDigits:0});
        }
        if(decimalno!=null){
            return `${integerdisplay}.${decimalno}`;
        }
        else{
            return `${integerdisplay}`;
        }
    }
    updateDisplay() {
        // Update the inner text of the current operand element
      this.currentTextElement.innerText=this.getDisplayNumberComma(this.currentOperand);
      if(this.operation!=null){
        this.previousTextElement.innerText=`${this.getDisplayNumberComma(this.previousOperand)} ${this.operation}`
      }
      else{
        this.previousTextElement.innerText=''
      }      
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(function (buttonele) {
    buttonele.addEventListener("click", function () {
        calculator.appendNumber(buttonele.innerText);
        calculator.updateDisplay();
    });
});
allClearButton.addEventListener("click", function () {
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton.addEventListener('click',function(){
    calculator.delete();
    calculator.updateDisplay();
});
operationButtons.forEach(function(ele){
    ele.addEventListener('click',function(){
        let operation = ele.innerText;
        calculator.chooseOperation(operation);
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener('click',function(){
    calculator.compute();
    calculator.updateDisplay();
});

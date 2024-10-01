class CustomCalculator {
    constructor(previousOperandDisplay, currentOperandDisplay) {
      // Assign DOM elements for the display
      this.previousOperandDisplay = previousOperandDisplay
      this.currentOperandDisplay = currentOperandDisplay
      this.resetCalculator()
    }
  
    // Reset calculator to its initial state
    resetCalculator() {
      this.currentValue = ''
      this.previousValue = ''
      this.activeOperation = null
    }
  
    // Remove last character (backspace)
    removeLastDigit() {
      this.currentValue = this.currentValue.toString().slice(0, -1)
    }
  
    // Add number to the current value being typed
    appendDigit(digit) {
      // Prevent multiple decimal points
      if (digit === '.' && this.currentValue.includes('.')) return
      this.currentValue = this.currentValue.toString() + digit.toString()
    }
  
    // Select the operation to perform (e.g., +, -, *, ÷)
    chooseOperator(operator) {
      if (this.currentValue === '') return
      if (this.previousValue !== '') {
        this.calculateResult()
      }
      this.activeOperation = operator
      this.previousValue = this.currentValue
      this.currentValue = ''
    }
  
    // Perform the calculation based on the chosen operator
    calculateResult() {
      let result
      const prevNum = parseFloat(this.previousValue)
      const currentNum = parseFloat(this.currentValue)
      if (isNaN(prevNum) || isNaN(currentNum)) return
      switch (this.activeOperation) {
        case '+':
          result = prevNum + currentNum
          break
        case '-':
          result = prevNum - currentNum
          break
        case '*':
          result = prevNum * currentNum
          break
        case '÷':
          result = prevNum / currentNum
          break
        default:
          return
      }
      this.currentValue = result
      this.activeOperation = null
      this.previousValue = ''
    }
  
    // Format number for better readability (e.g., with commas for thousands)
    formatNumberDisplay(number) {
      const stringNum = number.toString()
      const integerPart = parseFloat(stringNum.split('.')[0])
      const decimalPart = stringNum.split('.')[1]
      let formattedInteger
      if (isNaN(integerPart)) {
        formattedInteger = ''
      } else {
        formattedInteger = integerPart.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalPart != null) {
        return `${formattedInteger}.${decimalPart}`
      } else {
        return formattedInteger
      }
    }
  
    // Update calculator display
    refreshDisplay() {
      this.currentOperandDisplay.innerText = this.formatNumberDisplay(this.currentValue)
      if (this.activeOperation != null) {
        this.previousOperandDisplay.innerText =
          `${this.formatNumberDisplay(this.previousValue)} ${this.activeOperation}`
      } else {
        this.previousOperandDisplay.innerText = ''
      }
    }
  }
  
  // Link DOM elements to the calculator functionality
  const digitButtons = document.querySelectorAll('[data-number]')
  const operatorButtons = document.querySelectorAll('[data-operation]')
  const equalsBtn = document.querySelector('[data-equals]')
  const deleteBtn = document.querySelector('[data-delete]')
  const clearAllBtn = document.querySelector('[data-all-clear]')
  const prevOperandDisplay = document.querySelector('[data-previous-operand]')
  const currOperandDisplay = document.querySelector('[data-current-operand]')
  
  // Create a calculator instance
  const myCalculator = new CustomCalculator(prevOperandDisplay, currOperandDisplay)
  
  // Add event listeners to digit buttons
  digitButtons.forEach(button => {
    button.addEventListener('click', () => {
      myCalculator.appendDigit(button.innerText)
      myCalculator.refreshDisplay()
    })
  })
  
  // Add event listeners to operator buttons
  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      myCalculator.chooseOperator(button.innerText)
      myCalculator.refreshDisplay()
    })
  })
  
  // Handle the equals button click to calculate the result
  equalsBtn.addEventListener('click', button => {
    myCalculator.calculateResult()
    myCalculator.refreshDisplay()
  })
  
  // Handle the clear button click to reset the calculator
  clearAllBtn.addEventListener('click', button => {
    myCalculator.resetCalculator()
    myCalculator.refreshDisplay()
  })
  
  // Handle the delete button click to remove the last digit
  deleteBtn.addEventListener('click', button => {
    myCalculator.removeLastDigit()
    myCalculator.refreshDisplay()
  })
  
/* INSTRUCTION NOTES:
x create 3 modules; budgetController, UIController, controller
  x One controls buget data, one controls user interface, and the other facilitates communication between the two
x create eventLister ('click') on our button for when we're trying to update the budget
x Add eventListener to entire webpage for keypress events (for when we press enter instead of clicking button)
  x specify for 'return' key only - using an 'event' arguments using keyCode (&& 'which')
x create skeleton for ctrlAddItem function 
  x in function:
    // Get field input data
    // Add item to budget controller object
    // Add new item to UI controller
    // Calculate budget
    // Display budget on UI
    console.log('It works');
x test both enter and the button to make sure they log 'It works'
x Write method getInput in UIController to get HTML input for each budget entry
  x Note: we want to use this function in the global controller so it needs to be a part of the UIController returned object
  x Will need type, description, and value variables
  x The method should return an object with the 3 properties listed above 
  x Call the method from global controller and log results to see if works
x Create private object DOMstrings in UIController that houses all the types classnames as property values
  x Do this so, in the case that we change our classnames, we can change them in one Object property instead of all over the JS file
  x Substitue DOMstrings properties instead of classnames for lookups
x Add a method to the UIctrl returned object that returns the domstrings
x set new variable DOM in global controler that points the DOMstrings()

========== CREATE INITIALIZATION FUNCTION ===========
- Goal is to clean up global controller
X Set up function setupEventListeners to contain all event listeners
  X Include everything needed to make the event listeners function properly
x Create a return object for the global controller
  x create method init on global object
    x console loge 'Application has started.'
    x Do something to ensure event listeners are active
x Make sure event listeners are live (but how?!?)

========== CREATING INCOME AND EXPENSE FUNCTION CONSTRUCTORS ==========
x Create two function constructors; Expense and Income, that take 3 arguments; id, description, value
  x Test them publicly to ensure they work the way you intend
x Create data structure (data) that houses (allItems) arrays of all expenses (exp), incomes(inc), and numbers for (totals) exp and inc

========== ADDING A NEW ITEM TO OUR BUDGET CONTROLLER ==========
x Add return object to budget controller
x Create method addItem that creates a new object and adds it to the data structure
  x create new item newItem
    x Needs to be provided with data to create a proper item
      x Remember that each item has a unique ID
    x needs to differentiate between expenses and incomes
  x add new item to data structure
  x Create a unique ID for each newItem that is an integer and equals 1 more than the .id property of the last object in the respective database array
    x What might be an edge case? Take into account
  x Do something with newItem so we can use it later
x Set it up so a new object is created evertime we click the button or press enter (What function do we call? where? with what do we call it with?)
  x create variable newItem for this object
x Create a new method somewhere to be able to test and make sure our objects are being added to the data structure

========== ADDING NEW ITEM TO UI ==========
x Add new UIController public method addListItem 
  x takes two parameters; obj and type
  x Will do 3 things;
    // 1. Create HTML string with placeholder text
    // 2. Replace placeholder text with actual data
    // 3. Add HTML to DOM
  x Create HTML string;
    x copy and paste all HTML from ghost income and expense events, turn to a string, and delete all new lines
    x Use ifstatement to determine which to use (expense or income)
    x assign result to variable html
  x Replace placeholder text with actual data
    x edit html texts so that the data you want to replace has proper name (id, description, value) surrounded by % bc easier to find
    x replace text that you want to replace useing .replace method (create new variable newHtml for result)
  x Add HTML to the DOM
    x use insertAdjacentHTML(position, text) method to add the html element to the proper location (depending on type)
    x add proper containers to dom strings (incomeContainer/expenseContainer)
  x Call function in ctrlAddItem

========== CLEARING OUR INPUT FIELDS ==========
x add new public method clearFields to relevant controller
  x use quertySelectorAll to find both input fields (description and value) in one line of code, assign to variable 'fields'
    x convert 'fields' to array (because fields is a list, not an array), and store as fieldsArr
  x Clear each HTML input field using forEach on the elements of fieldsArr
x Add it to ctrlAddItem and call it
x After running the ctrlAddItem we want focus to return back to the first input box
  x use the .focus() method 

========== UPDATING THE BUDGET CONTROLLER ==========
x in global controller create updateBudget function that does the last two steps of (what was going to be) the ctrlAddItem
  x add middle method that will return the budget
x add last step to ctrlAddItem that will call updateBudget
x Convert getInput function in UIctrl so that value is a number (use parseFloat);
x write if statement to ensure that budget items will only be created and shown if description != '' and value is a number greater than 0

========== UPDATING THE BUDGET: BUDGET CONTROLLER (CONTINUED) ==========
x How are we going to create the updateBudget function?
x create public calculateBudget method in the relevant controller
  x What it will do:
    // calculate total income & expenses
    // calculate budget
    // calculate the % of income we've spent
  x To 'CALCULATE TOTAL INCOME & EXPENSES'
    x create private function calculateTotal(type) (because we will use it for both income and expenses)
      x solve useing forEach()
       x later solve using reduce();
      x assign the sum/total to the relevant data structure object
    x Call the private function twice in the public method
  x To 'CALCULATE BUDGET':
    x create property in global data structure called 'budget' and set to 0
    x in calculateBudget method assign 'budget' to equal the new income - expenses
  x To CALCULATE THE %'
    x create property in data structure called 'percentage'
    x assign 'percentage' to relevant number in the public method (integer)
    x round percentage to nearest integer
    x set it so percentage is only calculated if income > 0
x Run calculateBudget where it needs to be ran
x create getBudget public method in the relevant controller
  x set it so that it returns all 4 values needed: budget, totalInc, totalExp, percentage
x run getBudget where it needs to be ran, creating new variable 'budget'
x test by console.log the created budget object

========== UPDATING BUDGET: UI CONTROLLER ==========
x add the following DOMstrings; the budget (budgetLabel), income (incomeLabel), expenses (expensesLabel), and percentage (percentageLabel) for expenses
x create public method displayBudget(obj)
  x select budget DOM element and change text content to equal to the budget (from the object we pass to the method)
  x Do the same with income
  x Do same with expenses
  x do the same with percentage
    x add conditional so that if it is a percentage greater than 0 add %, and if it's 0 or -1 show '---'
x call the function in the global controller
- add function call to init function - substitute budget object for a similar object where every value = 0

========== SETTING UP DELETE EVENT LISTENER USING EVENT DELEGATION ==========
x Set up an eventlistener on a parent element that will contain both income objects and expense objects (so we only need 1 event listener for both)
  x add it where all other eventListener functions are
  x add it to domstrings (container)
  x make the function to execute on clicks ctrlDeleteItem
- Create ctrlDeleteItem(event) in global controller <-- Note that when passing a function that takes an argument into an eventhandler, the event will always be the argument
  x in the function console.log the element that has the event
  x Click around the container to ensure that it works
  x Go to UI Controller - change HTML string element IDs from 'income-0' and 'expense-' to 'inc-' and 'exp-'
  x in the function traverse the DOM from the delete button until it highlights the entire budget UI element
    x get the ID property of the DOM element and save as variable itemID
    x create an conditional statement that will only execute if we've clicked on a delete icon/button
      x create variable splitID that splits IDs between the type and number
      x create variable type and variable ID; assign them the right values
    x Dignate the next stpes in the function to be:
      // 1. Delete the item from data structure
      // 2. Delete item from UI
      // 3. Update and show new budget

========== DELETING ITEM FROM BUDGET CONTROLLER ==========
x create public method deleteItem(type, ID)
  - TRY THIS AFTERWARDS: use map to loop through the respective element array and effectively delete the element with the ID you're trying to delete
  x create variable ids that is an array of all element ids (using map)
  x create variable index that equals the index of the ID trying to delete
  x set conditional to remove the element as long as the index actually exists (aka is not... -1)
    x delete desired element using splice
x use method in global controller
x test it using budgetcontroller.testing()
  
========== DELETING ITEM FROM UI ==========
x create public method deleteListItem(selectorID)
  - delete the element by using a method that has to do with parent node
- call method in relevant controller
- update UI of budget

========== UPDATING PERCENTAGES ==========
x create private function updatePercentages
    // 1. Calculate percentages
    // 2. read percentages from budget controller
    // 3. Update user interface
x Call function in ctrlAddItem and ctrlDeleteItem

========== UPDATING PERCENTAGES: BUDGET CONTROLLER ==========
x create method calculatePercentages
x add method to expense prototype:
  x calcPercentage(totalIncome)
  x create new property in expese object (percentage)
    x set it to what we set it to when something is not defined yet and we want to override it
  x set calcPercentage(totalIncome) so that it updates the percentage of the relevant expense object when ran
  x set conditional so the function only works if totalIncome > 0, othewise make it equal to -1
x add getPercentage() to expense prototype that returns the percentage (because it's important that each method does 1 thing only)
x run calcPercentage for each element in data.allItems.exp
x create new public method getPercentages
  x have this function create and return a new arr allPerc of all the percentages of the data structure
x call both of the above in the global controller and console log results
  x test to ensure it's working properly

========== UPDATING PERCENTAGES: UI CONTROLLER ==========
x add the relevant element lookup to DOMstrings to select all expense percentages
  x expensesPercLabel
x create displayPercentages(percentages) public method
  x create nodeList fields of all expense percentages
  x create/call a function nodeListForEach(fields, function(current, idx) {})
    x // Do code
  x create nodeListForEach(list, callback)
    x use for loop to call callback on element and index of each list item
  x (going back to nodeListForEach) Inside the function call....
    x set each elements text value to equal the percentage value it is associated with

========== FORMATTING NUMBERS: STRING MANIPULATION ==========
x create private function formatNumber(num, type)
  x Rules:
   // + or - before the number
   // exactly two decimal points
   // comma separating the thousands
  x to set the decimals
    x remove the type of num (+ or -)
    x set the number of decimals num will go to
  x to make comma separating thousands
    x create variable numSplit that gets array of the integer part and the decimal part of the number
    x create variables int and dec and assign them to the right values
    x create conditional that if number is greater than 999 it adds decimals to the number to format correctly (hint: substrings)
  x + or - before the number
    x create sign variable
      x set sign according to they type
  x return it all together
x call it on all numbers in the UI
  x entry items and total budget items
  x total budget may be tricky... (hint: type?)

========== DISPLAYING THE CURRENT MONTH & YEAR =========
x create new method displayMonth
  x create variable now that has a value of today's date
  x create variable year that has today's year
  x create variable month that has today's month
  x change text content of the proper element to 'Month, Year'
x call function in init();

========== FINISHING TOUCHES ==========
x add inputType 'change' eventListener, call changedType
x create changedType public method:
  x create variable fields and select all input fields
  - add red-focus class to all elements in fields
  - add red class to button
- Make sure that the change doesn't just add the class, but takes it away when it's changed twice


*/

// BUDGET CONTROLLER
let budgetController = (function() {
  // Creates expense objects
  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);  
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

  // Creates income objects
  let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: 0
  }

  let calculateTotal = function(type) {
    let sum = data.allItems[type].reduce(function(sum, obj) {
      return sum += obj.value;
    }, 0);


    data.totals[type] = sum;
  }

  return {
    addItem: function(type, des, val) {
      let newItem, ID;

      // Create new ID (but doesn't it need special case for first ID => Yes it fucking did!)
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;  
      } else {
        ID = 0;
      }
      
      // Create new object with 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push new object into data array
      data.allItems[type].push(newItem);
      //data.totals[type] += Number(newItem.value); dk why we don't do this yet but OK

      // Return new budget entry
      return newItem;
    },

    deleteItem: function(type, id) {
      let ids, index;

      ids = data.allItems[type].map(function(obj) {
        return obj.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index,1);
      }

    },

    calculateBudget: function() {
    
      // calculate total income & expenses
      calculateTotal('inc');
      calculateTotal('exp');

      // calculate budget
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the % of income we've spent
      if (data.totals.inc > 0 && data.totals.exp > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else if (data.totals.inc === 0 && data.totals.exp > 0){
        data.percentage = -1;
      } else if (data.totals.inc > 0 && data.totals.exp === 0) {
        data.percentage = 0;
      }
    },

    calcPercentage: function() {
      data.allItems.exp.forEach(function(obj) {
        obj.calcPercentage(data.totals.inc);
      });
    }, 

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    getPercentages: function() {
      let allPerc;

      allPerc = data.allItems.exp.map(function(obj) {
        return obj.percentage;
      });

      return allPerc;
    },

    testing: function() {
      console.log(data);
    }
  }

}());



// UI CONTROLLER
let UIController = (function() {

  // An object containing all the class shortcuts for User Interface
  let DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    budgetDate: '.budget__title--month'
  }

  let formatNumber = function(num, type) {
    let splitNum, int, dec, sign, leftDigits, numHrds, newInt;
    
    if (!type) {
      sign = '';
    }

    // + or - before the number
    if (type === 'inc') {
      sign = '+';
    } else if (type === 'exp') {
      sign = '-';
    } 

    // exactly two decimal points
    num = Math.abs(num);
    num = num.toFixed(2);
    splitNum = num.split('.');
    int = splitNum[0];
    dec = splitNum[1];
  
    // comma separating the thousands
    if (int.length > 3) {
      leftDigits = int.length % 3;
      numHrds = (int.length - leftDigits) / 3
      newInt = int.substring(0, leftDigits);

      for (let i = 1; i <= numHrds; i ++) {
        newInt += (newInt ? ',' : '') + int.substring(leftDigits, leftDigits + 3);
        leftDigits = leftDigits + 3;
      }
    } else {
      newInt = int;
    }

    // return it all
    return sign + ' $' + newInt + '.' + dec;

  };

  let nodeListForEach = function(list, callback) {
    // Calls the callback function once per list item... just like .forEach
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  // The returned object that is assigned to UIController
  return {
    getInput: function() {
      return {
        // The below 'type' will be either 'inc' or 'exp'
        type: document.querySelector(DOMstrings.inputType).value, // Will only take the value of the selected option
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    }, 

    addListItem: function(obj, type) {
      let html, newHtml, element;
      // 1. Create HTML string with placeholder text
      if (type === 'inc'){
        // Set HTML and element
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        element = document.querySelector(DOMstrings.incomeContainer);
      } else {
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        element = document.querySelector(DOMstrings.expenseContainer);
      }

      // 2. Replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      // 3. Add HTML to DOM
      element.insertAdjacentHTML('beforeend', newHtml);

    },

    deleteListItem: function(selectorID) {
      let el = document.getElementById(selectorID);

      // Removes the element with the ID we pass in as an argument
      el.parentNode.removeChild(el);

    },

    clearFields: function() {
      let fields, fieldsArr;

      // Get both (or all) of the input fields into a list (because querySelectorAll makes a list)
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

      // Turn the list into an array
      fieldsArr = Array.prototype.slice.call(fields);

      // Clear the contents of each element in the array
      fieldsArr.forEach(function(element, idx, arr) {
        element.value = "";
      });
      
      // Return focus to first input element
      fieldsArr[0].focus();
    }, 

    displayBudget: function(obj) {
      let type;

      if (obj.budget > 0) {
        type = 'inc';
      } else if (obj.budget < 0) {
        type = 'exp';
      }

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
      
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    displayPercentages: function(percentages) {

      let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      nodeListForEach(fields, function(current, idx) {

        if (percentages[idx] > 0) {
          current.textContent = percentages[idx] + '%';
        } else {
          current.textContent = '---';
        }

      });
    },
    
    displayMonth: function() {
      let now, year, month, months;

      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


      now = new Date();
      year = now.getFullYear();
      month = months[now.getMonth().toString()];

      // displays today's year and month
      document.querySelector(DOMstrings.budgetDate).textContent = month + ', ' + year;
    },

    changedType: function() {

      let fields = document.querySelectorAll(
        DOMstrings.inputType + ', ' +
        DOMstrings.inputDescription + ', ' +
        DOMstrings.inputValue);

      nodeListForEach(fields, function(element, idx) {

        element.classList.toggle('red-focus');

      });

      document.querySelector(DOMstrings.inputBtn).classList.toggle('red');

    }

  }

}());



// GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl) {

  let setupEventListeners = function() {
    // Brings DOM elements into lexical scope
    let DOM = UICtrl.getDOMstrings();

    // Create budget event when button is clicked
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    // Create budget event when 'enter' is pressed
    document.addEventListener('keypress', function(event) { // An event argument in an eventListener is a huge deal!
      if(event.keyCode === 13 || event.which === 13) { // Only ctrlAddItem if the key pressed was 'Enter'
        event.preventDefault();
        event.stopPropagation();
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
  }

  let updateBudget = function() {

    // Calculate budget
    budgetCtrl.calculateBudget();

    // Return budget
    let budget = budgetCtrl.getBudget();

    // Display budget on UI
    UICtrl.displayBudget(budget);
  }

  let updatePercentages = function() {

    // 1. Calculate percentages
    budgetCtrl.calcPercentage();

    // 2. read percentages from budget controller
    let percentages = budgetCtrl.getPercentages();
    // 3. Update user interface
    UICtrl.displayPercentages(percentages);

  };

  var ctrlAddItem = function() {
    // Get field input data
    var input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // Add item to budget controller object
      let newItem = budgetController.addItem(input.type, input.description, input.value);
  
      // Add new item to UI controller
      UICtrl.addListItem(newItem, input.type);
  
      // Clear contents of input boxes
      UICtrl.clearFields();
  
      // Update budget
      updateBudget();

      // Calculate and update percentages
      updatePercentages();
    }
  }

  let ctrlDeleteItem = function(event) {

    let itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);
    }

    // 1. Delete the item from data structure
    budgetCtrl.deleteItem(type, ID);

    // 2. Delete item from UI
    UICtrl.deleteListItem(itemID);

    // 3. Update and show new budget
    updateBudget();

    // 4. Calculate and update percentages
    updatePercentages();
  }

  return {
    init: function() {
      setupEventListeners();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: '---'
      });
      UICtrl.displayMonth();
    }
  }

}(budgetController, UIController));

controller.init();
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
  - add new public method clearFields to relevant controller
    - use quertySelectorAll to find both input fields (description and value) in one line of code, assign to variable 'fields'
      - convert 'fields' to array (because fields is a list, not an array), and store as fieldsArr
    - Clear each HTML input field using forEach on the elements of fieldsArr
  - Add it to ctrlAddItem and call it
  - After running the ctrlAddItem we want focus to return back to the first input box
    - use the .focus() method 

*/

// BUDGET CONTROLLER
let budgetController = (function() {
  // Creates expense objects
  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
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
    }
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
    expenseContainer: '.expenses__list'
  }

  // The returned object that is assigned to UIController
  return {
    getInput: function() {
      return {
        // The below 'type' will be either 'inc' or 'exp'
        type: document.querySelector(DOMstrings.inputType).value, // Will only take the value of the selected option
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
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
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        element = document.querySelector(DOMstrings.incomeContainer);
      } else {
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        element = document.querySelector(DOMstrings.expenseContainer);
      }

      // 2. Replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // 3. Add HTML to DOM
      element.insertAdjacentHTML('beforeend', newHtml);

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
  }

  var ctrlAddItem = function() {
    // Get field input data
    var input = UICtrl.getInput();

    // Add item to budget controller object
    let newItem = budgetController.addItem(input.type, input.description, input.value);

    // Add new item to UI controller
    UICtrl.addListItem(newItem, input.type);

    // Clear contents of input boxes
    UICtrl.clearFields();

    // Calculate budget
    
    // Display budget on UI

  }

  return {
    init: function() {
      console.log('Application has started');
      setupEventListeners();
    }
  }

}(budgetController, UIController));

controller.init();
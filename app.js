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
- Add a method to the UIctrl returned object that returns the domstrings
- set new variable DOM in global controler that points the DOMstrings()



*/

// BUDGET CONTROLLER
let budgetController = (function() {

  // code

}());







// UI CONTROLLER
let UIController = (function() {

  // An object containing all the class shortcuts for User Interface
  let DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn'
  }

  // The returned object that is assigned to UIController
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will only take the value of the selected option
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  }

}());





// GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl) {

  let DOM = UICtrl.getDOMstrings();

  var ctrlAddItem = function() {
    // Get field input data
    var input = UICtrl.getInput();
    console.log(input);

    // Add item to budget controller object

    // Add new item to UI controller
    
    // Calculate budget
    
    // Display budget on UI
  
  }

  document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) { // An event argument in an eventListener is a huge deal!
    if(event.keyCode === 13 || event.which === 13) { // Only ctrlAddItem if the key pressed was 'Enter'
      ctrlAddItem();
    }
  });



}(budgetController, UIController));
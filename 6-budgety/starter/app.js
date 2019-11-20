/* eslint-disable no-new */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable wrap-iife */

// BUDGET CONTROLLER
const budgetController = (function () {
    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
    };
    return {
        addItem(type, des, val) {
            let newItem; let ID;
            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            // create new item based on inc or exp type
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }
            // push item into data structure
            data.allItems[type].push(newItem);
            // return the new element
            return newItem;
        },
        testing() {
            console.log(data);
        },
    };
})();

// UI CONTROLLER
const UIController = (function () {
    let DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
    };
    return {
        getInput() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                inputValue: document.querySelector(DOMstrings.inputValue).value,
            };
        },
        getDOMstrings() {
            return DOMstrings;
        },
    };
})();

// GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {
    const ctrlAddItem = () => {
        // 1. Get the filled input data
        let input = UICtrl.getInput();
        // 2. Add the item to the budget controller
        let newItem = budgetCtrl.addItem(input.type, input.description, input.inputValue);
        // 3. Add the item to the UI
        // 4. Calculate the budget
        // 5. Display the budget on the UI
    };
    const setupEventListeners = () => {
        const DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
    return {
        init() {
            setupEventListeners();
        },
    };
})(budgetController, UIController);
controller.init();

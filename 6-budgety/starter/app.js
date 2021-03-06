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
    const calculateTotal = (type) => {
        let sum = 0;
        data.allItems[type].forEach (item => {
            sum += item.value;
        });
        data.totals[type] = sum;
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
        budget: 0,
        percentage: -1,
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
        calculateBudget() {
            // calculate total income and expenses
            calculateTotal("exp");
            calculateTotal("inc");
            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage of income we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            };
        },
        getBudget() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            };
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
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
    };
    return {
        getInput() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                inputValue: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            };
        },
        addListItem(obj, type) {
            let html; let element; let newHTML;
            // 1. Create HTML string with placeholder text
            if (type === "inc") {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%">'
            + '<div class="item__description">%description%</div>'
            + '<div class="right clearfix"><div class="item__value">%value%</div>'
            + '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline">'
            + '</i></button></div></div></div>';
            } else if (type === "exp") {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%">'
            + '<div class="item__description">%description%</div>'
            + '<div class="right clearfix"><div class="item__value">%value%</div>'
            + '<div class="item__percentage">%percentage%</div><div class="item__delete">'
            + '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'
            + '</div></div></div>';
            } else { return "ERROR"; };

            // 2. Replace the placeholder text with actual data
            let newID = html.replace("%id%", obj.ID);
            let newDescription = newID.replace("%description%", obj.description);
            newHTML = newDescription.replace("%value%", obj.value);

            // 3. Insert the HTML string into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);
        },

        clearFields() {
            let fields;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);
            let fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(item => {
                item.value = "";
            });
            fieldsArray[0].focus();
        },
        displayBudget(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
        },
        getDOMstrings() {
            return DOMstrings;
        },
    };
})();

// GLOBAL APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {
    const updateBudget = () => {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        let budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    const ctrlAddItem = () => {
        // 1. Get the filled input data
        let input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.inputValue) && input.inputValue > 0) {
            // 2. Add the item to the budget controller
            let newItem = budgetCtrl.addItem(input.type, input.description, input.inputValue);
            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            // 4. Clear the fields
            UICtrl.clearFields();
            // 5. Calculate and update budget
            updateBudget();
        }

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

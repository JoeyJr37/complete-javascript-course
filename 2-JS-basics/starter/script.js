/* eslint-disable space-before-blocks */
/* eslint-disable block-spacing */
/* eslint-disable brace-style */
/* eslint-disable quotes */
/* eslint-disable indent */
console.log("Hello World!!!");
/*
const johnMass = 92;
const markMass = 78;
const johnHeight = 1.95;
const markHeight = 1.69;
const BMI = (mass, height) => {
    console.log(mass/ (height * height));
};
const johnBMI = BMI(johnMass, johnHeight);
const markBMI = BMI(markMass, markHeight);

console.log(johnBMI);
console.log(markBMI);


if (johnBMI > markBMI) {console.log(false);}
else {console.log(true);}; */
/*
const johnScores = 89 + 120 + 103;
const markScores = 116 + 94 + 123;
const johnAverage = johnScores / 3;
const markAverage = markScores / 3;
const maryScores = 97 + 134 + 105;
const maryAverage = maryScores / 3;
console.log(`John's average is: ${johnAverage}`);
console.log(`Mark's average is: ${markAverage}`);
console.log(`Mary's average is: ${maryAverage}`);
if (markAverage > johnAverage && markAverage > maryAverage) { console.log("Mark's team is the winner!"); } 
else if (johnAverage > markAverage && johnAverage > maryAverage){console.log("John's team is the winner!"); } 
else if (maryAverage > johnAverage && maryAverage > markAverage){console.log("Mary's team is the winner!");} 
else {console.log("It's a tie!");}; */
/* Tip Calculator */
/*
20% of the bill when bill is less than $50
15% when bill is between $50 and $200
10% when bill is more than $200
in the end John would like to have 2 arrays: 1) containing all three tips (one for each bill)
2) containing all three final paid amounts (bill + tip) */
/*
const calculateTip = (billAmount) => {
  if (billAmount > 200) { return (billAmount * 0.10);} 
  else if (billAmount < 50) {return (billAmount * 0.20);} 
  else {return (billAmount * 0.15);};
};
const tipAmount1 = calculateTip(124);
const tipAmount2 = calculateTip(48);
const tipAmount3 = calculateTip(268);
const totalTipsArray = [tipAmount1, tipAmount2, tipAmount3];

const finalPayment1 = tipAmount1 + 124;
const finalPayment2 = tipAmount2 + 48;
const finalPayment3 = tipAmount3 + 268;
const finalPaymentsArray =[finalPayment1, finalPayment2, finalPayment3];
console.log(totalTipsArray);
console.log(finalPaymentsArray);
*/
/*
const john = {
    firstName: "John",
    mass: 105,
    height: 1.5,
    calculateBMI: (mass, height) => {
        return mass / (height * height); 
                },
    };
john.BMI = john.calculateBMI(john.mass, john.height);
console.log(john);
const mark = {
    firstName: "Mark",
    mass: 97,
    height: 1.32,
    calculateBMI: () => { 
        john.bmi = john.mass / (john.height * john.height); 
        return john.bmi;
        },
    };
mark.calculateBMI();
console.log(mark); */
/*console.log(`John's BMI is ${John.BMI}`);
console.log (`Mark's BMI is ${Mark.BMI}`);*/
/*
if (john.BMI > mark.BMI) { console.log(john); }
else if (mark.BMI > john.BMI) { console.log(mark); }
else { console.log("It's a tie!"); }
*/
/*
124, 48, 268, 180, 42
20% less than 50
15% between 50 and 200
10% more than 200
implement calc using objects and loops
create object with array with bill values
add method to calc tip
method should include loop to iterate over all paid bills and calc tips
as an output create a new array containing all tips and an array containing final paid amounts
*/
const tipArray = [];
const finalAmountArray = [];
const john = {
    bills: [124, 48, 268, 180, 42],
    calculateTip: () => {
        let percentage;
        for (let i = 0; i < john.bills.length; i++){
            if (john.bills[i] < 50) {percentage = 0.2;}
            else if (john.bills[i] > 200) {percentage = 0.1;}
            else {percentage = 0.15;};
            tipArray.push(percentage * john.bills[i]);
            finalAmountArray.push(tipArray[i] + john.bills[i]);
            };
        console.log(tipArray);
        console.log(finalAmountArray);
        },};
john.calculateTip();

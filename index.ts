#! /usr/bin/env node

import inquirer from "inquirer";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

let myBalance: number = 0;

let answer = await inquirer.prompt([
    {
        name: "students",
        type: "input",
        message: "Enter your name:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    },
    {
        name: "courses",
        type: "list",
        message: "Select the course to enroll in:",
        choices: ["HTML", "CSS", "JavaScript", "TypeScript", "Python"],
    },
]);

const tutionFees: { [key: string]: number } = {
    "HTML": 3000,
    "CSS": 5000,
    "JavaScript": 7000,
    "TypeScript": 8000,
    "Python": 8000,
};

console.log(`\nTuition Fee for ${answer.courses}: ${tutionFees[answer.courses]}/-`);
console.log(`Your current balance: ${myBalance}`);

let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select a payment method:",
        choices: ["Bank Transfer", "Easypaisa", "Jazz Cash"],
    },
    {
        name: "amount",
        type: "input",
        message: "Enter the amount to pay:",
        validate: function (value) {
            if (parseFloat(value) > 0) {
                return true;
            }
            return "Please enter a positive value.";
        },
    },
]);

console.log(`\nYou selected the payment method: ${paymentType.payment}\n`);

const courseTutionFees = tutionFees[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);

if (courseTutionFees === paymentAmount) {
    console.log(`\nCongratulations! You have successfully enrolled in the ${answer.courses} course.\n`);

    let nextStep = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View Status", "Exit"],
        },
    ]);

    if (nextStep.select === "View Status") {
        console.log(`\n***Student Status***`);
        console.log(`Student Name: ${answer.students}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Enrolled Course: ${answer.courses}`);
        console.log(`Paid Tuition Fee: ${paymentAmount}`);
        console.log(`Current Balance: ${myBalance += paymentAmount}`);
    } else {
        console.log(`\n***Thank you for using our system!***\n`);
    }

} else {
    console.log(`\nYou have not paid the full tuition fee for the ${answer.courses} course.\n`);
}

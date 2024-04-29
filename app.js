#!/usr/bin/env node
import inquirer from 'inquirer';
// Global variables for balance, OTPs, and the running loop
let myBalance = 200000;
const senderOTP = 1234;
const receiverOTP = 1234;
let isRunning = true;
// Main function to prompt the user for input and manage the application loop
const promptUser = async () => {
    const { name } = await inquirer.prompt([
        { name: "name", type: "input", message: "Enter your name:" },
    ]);
    console.log(`Welcome, ${name}!`);
    const { pin } = await inquirer.prompt([
        { name: "pin", type: "number", message: "Set your pin:" },
    ]);
    while (isRunning) {
        const { option } = await inquirer.prompt([
            {
                name: "option",
                type: "list",
                message: "Choose an option:",
                choices: ["Transfer Money", "Receive Money", "Bill Payments", "Easy Load Bundles", "Mobile Packages", "Cash Back", "Savings", "Exit"],
            },
        ]);
        // Call appropriate functions based on the selected option
        switch (option) {
            case "Transfer Money":
                await handleTransferMoney(pin);
                break;
            case "Receive Money":
                await handleReceiveMoney(pin);
                break;
            case "Bill Payments":
                await handleBillPayments(pin);
                break;
            case "Easy Load Bundles":
                await handleEasyLoadBundles(pin);
                break;
            case "Mobile Packages":
                await handleMobilePackages(pin);
                break;
            case "Cash Back":
                await handleCashBack(pin);
                break;
            case "Savings":
                await handleSavings(pin);
                break;
            case "Exit":
                console.log("Exiting the application. Goodbye!");
                isRunning = false;
                break;
        }
    }
};
// Function to validate the user PIN
const validatePin = async (userPin) => {
    const { pin } = await inquirer.prompt([
        { name: "pin", type: "number", message: "Enter your pin:" },
    ]);
    if (pin !== userPin) {
        console.log("Incorrect pin. Please try again.");
        return false;
    }
    console.log("Entered pin is correct!");
    return true;
};
// Handle transferring money
const handleTransferMoney = async (userPin) => {
    if (!(await validatePin(userPin)))
        return;
    const { amount, receiverOTPInput } = await inquirer.prompt([
        { name: "amount", type: "number", message: "Enter amount to transfer:" },
        { name: "receiverOTPInput", type: "number", message: "Enter Receiver's OTP:" },
    ]);
    if (receiverOTPInput !== receiverOTP) {
        console.log("Incorrect OTP.");
        return;
    }
    if (amount > myBalance) {
        console.log("Insufficient balance.");
        return;
    }
    myBalance -= amount;
    console.log(`Transfer successful. Remaining balance: ${myBalance}`);
};
// Handle receiving money
const handleReceiveMoney = async (userPin) => {
    if (!(await validatePin(userPin)))
        return;
    const { amount, senderOTPInput } = await inquirer.prompt([
        { name: "amount", type: "number", message: "Enter amount to receive:" },
        { name: "senderOTPInput", type: "number", message: "Enter Sender's OTP:" },
    ]);
    if (senderOTPInput !== senderOTP) {
        console.log("Incorrect OTP.");
        return;
    }
    myBalance += amount;
    console.log(`Received ${amount}. Current balance: ${myBalance}`);
};
// Handle bill payments with balance check
const handleBillPayments = async (userPin) => {
    if (!(await validatePin(userPin)))
        return;
    const { billType, amount } = await inquirer.prompt([
        {
            name: "billType",
            type: "list",
            message: "Choose a bill to pay:",
            choices: ["Electricity", "Gas", "Water", "Internet", "Landline"],
        },
        { name: "amount", type: "number", message: "Enter the bill amount:" },
    ]);
    if (amount > myBalance) {
        console.log("Insufficient balance to pay this bill.");
        return;
    }
    myBalance -= amount;
    const billDescription = `Paid ${billType} bill`;
    console.log(`${billDescription}. Remaining balance: ${myBalance}`);
};
// Handle easy load bundles
const handleEasyLoadBundles = async (userPin) => {
    if (!(await validatePin(userPin)))
        return;
    const { bundleType, cost } = await inquirer.prompt([
        {
            name: "bundleType",
            type: "list",
            message: "Choose an Easy Load Bundle:",
            choices: ["Data Bundle", "Voice Bundle", "SMS Bundle"],
        },
        { name: "cost", type: "number", message: "Enter the cost of the bundle:" },
    ]);
    if (cost > myBalance) {
        console.log("Insufficient balance for this bundle.");
        return;
    }
    myBalance -= cost;
    console.log(`Purchased ${bundleType}. Remaining balance: ${myBalance}`);
};
// Handle mobile packages
const handleMobilePackages = async (userPin) => {
    if (!(await validatePin(userPin)))
        return;
    const { packageType, cost } = await inquirer.prompt([
        {
            name: "packageType",
            type: "list",
            message: "Choose a Mobile Package:",
            choices: ["Unlimited Data", "Unlimited Calls", "Unlimited SMS"],
        },
        { name: "cost", type: "number", message: "Enter the cost of the package:" },
    ]);
    if (cost > myBalance) {
        console.log("Insufficient balance for this package.");
        return;
    }
    myBalance -= cost;
    console.log(`Purchased ${packageType} package. Remaining balance: ${myBalance}`);
};
// Handle cash back
const handleCashBack = async (userPin) => {
    if (!(await validatePin(userPin)))
        return;
    const { cashBackAmount } = await inquirer.prompt([
        { name: "cashBackAmount", type: "number", message: "Enter the cash back amount:" },
    ]);
    if (cashBackAmount > myBalance) {
        console.log("Insufficient balance for cash back.");
        return;
    }
    myBalance -= cashBackAmount;
    console.log(`Cash back of ${cashBackAmount} processed. Remaining balance: ${myBalance}`);
};
// Handle savings
const handleSavings = async (userPin) => {
    if (!(await validatePin(userPin)))
        return;
    const { savingsAmount } = await inquirer.prompt([
        { name: "savingsAmount", type: "number", message: "Enter the amount to save:" },
    ]);
    if (savingsAmount > myBalance) {
        console.log("Insufficient balance for savings.");
        return;
    }
    myBalance -= savingsAmount;
    console.log(`Saved ${savingsAmount}. Remaining balance: ${myBalance}`);
};
// Start the application
promptUser();

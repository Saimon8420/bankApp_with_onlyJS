// to receive users input via terminal
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin,
})


// main function
function main() {
    console.log("/n");
    console.log("------------------*****-----------------");
    console.log("1. Create a new account");
    console.log("2. Display all accounts");
    console.log("3. Update an account");
    console.log("4. Delete an account");
    console.log("5. Deposit an amount into your account");
    console.log("6. Withdraw an amount from your account");
    console.log("7. Search for account");
    console.log("8. Exit");
    console.log("-----------------*****-----------------");
    console.log("/n");
}

main();
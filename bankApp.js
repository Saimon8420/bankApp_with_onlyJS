// to receive users input via terminal
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// stores data
let accounts = [];

// 1.function to create an account
function createAccount() {
    rl.question('Enter account holder\'s name: ', (name) => {
        rl.question('Enter account number: ', (number) => {
            rl.question('Enter account type (Savings/Current/Salary/Student): ', (type) => {
                rl.question('Enter initial balance: ', (balance) => {
                    balance = parseFloat(balance);

                    // matching account type exists of not
                    const accountType = ["Savings", "Current", "Salary", "Student"];
                    const matchedType = accountType.find(each => each.toLowerCase() === type.toLowerCase());

                    // matching duplication of accountNo
                    const matchedAccNo = accounts.find(each => each.number === number);
                    if (balance < 500 || !matchedType || (accounts.length !== 0 && matchedAccNo)) {
                        if (balance < 500) {
                            console.log("\nInitially, You have to deposit minimum 500!!");
                        }
                        if (!matchedType) {
                            console.log("\nAccount type not matched!!");
                        }
                        if (matchedAccNo) {
                            console.log(`\nAccount number ${number} already exists!!`);
                        }
                        main();
                    }

                    else {
                        let account = {
                            name: name,
                            number: number,
                            balance: balance,
                            creationDate: new Date(),
                            type: type.toLowerCase(),
                        };
                        accounts.push(account);
                        console.log(`\nCongrats!!Account ${number} created successfully`);
                        main();
                    }
                });
            });
        });
    });
}

// 2.function to display all accounts
function displayAllAccounts() {
    accounts.map(account => {
        console.log(`Name: ${account.name}, Number: ${account.number}, Balance: ${account.balance}, Type: ${account.type}`);
    });
    main();
}

// 4.function to delete an account
function deleteAccount() {
    rl.question('Enter account number to delete: ', (number) => {
        let index = accounts.findIndex(acc => acc.number === number);
        if (index !== -1) {
            accounts.splice(index, 1);
            console.log("\nAccount deleted successfully!!");
        } else {
            console.log("\nAccount not found!!");
        }
        main();
    });
}


// main function
function main() {
    console.log("\n------------------*****-----------------");
    console.log("1. Create a new account");
    console.log("2. Display all accounts");
    console.log("3. Update an account");
    console.log("4. Delete an account");
    console.log("5. Deposit an amount into your account");
    console.log("6. Withdraw an amount from your account");
    console.log("7. Search for account");
    console.log("8. Exit");
    console.log("-----------------*****-----------------\n");

    rl.question('Enter your choice: ', (choice) => {
        switch (parseInt(choice)) {
            case 1:
                createAccount();
                break;
            case 1:
                displayAllAccounts();
                break;
            case 8:
                console.log("Exiting...Thank You!");
                rl.close();
                break;
            default:
                console.log("Invalid choice");
                rl.close();
        }
    });
}

main();
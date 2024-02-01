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
                        if (accounts.length > 0) {
                            accounts = [...accounts, account];
                        }
                        else {
                            accounts = [account];
                        }
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
        console.log(`\nName: ${account.name}, Number: ${account.number}, Balance: ${account.balance}, Type: ${account.type}`);
    });
    main();
}

// 3. function to update an account
function updateAccount() {
    rl.question('Enter account number to update: ', (number) => {
        // find account to update
        let account = accounts.find(acc => acc.number === number);
        if (account) {
            console.log("\n----------Enter your choice----------");
            console.log("1. To update name");
            console.log("2. To update account type");
            console.log("3. To update account number");
            console.log("\n----------*****************----------");

            //Remove matched account from accounts
            const existsAccount = accounts.filter(each => each.number !== number);

            rl.question('\nEnter your choice: ', (choice) => {
                switch (parseInt(choice)) {
                    case 1:
                        function updateName() {
                            rl.question(`\nCurrent name is ${account.name}.Enter new name to update: `, (newName) => {
                                //update with the new value
                                account.name = newName;
                                if (existsAccount.length === 0) {
                                    accounts = [account];
                                    console.log(`\nAccount updated Successfully with data ${newName}`)
                                }
                                else {
                                    const newData = [...existsAccount, account];
                                    // sets main accounts with updated data
                                    accounts = newData;
                                    console.log(`\nAccount updated Successfully with data ${newName}`)
                                }
                                // to continue app
                                main();
                            })
                        }
                        updateName();
                        break;
                    case 2:
                        function updateAccType() {

                            // filter existing type
                            const accountType = ["Savings", "Current", "Salary", "Student"];
                            const filterRestType = accountType.filter(each => each.toLowerCase() !== account.type.toLowerCase());

                            rl.question(`\nCurrent account type is ${account.type}.Enter new account type ${filterRestType} to update: `, (newType) => {
                                // matching account type exists of not
                                const matchedType = filterRestType.find(each => each.toLowerCase() === newType.toLowerCase());
                                if (matchedType) {
                                    // update with new value
                                    account.type = newType.toLowerCase();

                                    if (existsAccount.length === 0) {
                                        accounts = [account];

                                        console.log(`\nAccount updated Successfully with data ${newType}`)
                                    }
                                    else {
                                        const newData = [...existsAccount, account];
                                        // sets main accounts with updated data
                                        accounts = newData;

                                        console.log(`\nAccount updated Successfully with data ${newType}`)
                                    }
                                }
                                else {
                                    console.log("\nInvalid account type")
                                }
                                // to continue app
                                main();
                            })
                        }
                        updateAccType();
                        break;
                    case 3:
                        function updateAccNumber() {
                            rl.question(`\nCurrent Number is ${number}.Enter new account number to update: `, (newNumber) => {
                                // checking new number exists or not
                                const findAcNo = accounts.find(acc => acc.number === newNumber);

                                if (findAcNo.length === 0) {
                                    // update with new value
                                    account.number = newNumber;
                                    if (existsAccount.length === 0) {
                                        accounts = [account];

                                        console.log(`\nAccount updated Successfully with new data ${newNumber}`)
                                    }
                                    else {
                                        const newData = [...existsAccount, account];
                                        // sets main accounts with updated data
                                        accounts = newData;

                                        console.log(`\nAccount updated Successfully with new data ${newNumber}`)
                                    }
                                }
                                else {
                                    console.log(`\n Account with this ${newNumber} number has already exists`)
                                }
                                // to continue app
                                main();
                            })
                        }
                        updateAccNumber();
                        break;
                    default:
                        console.log("Invalid choice");
                        // to continue app
                        main();
                }
            });
        } else {
            console.log("\nAccount not found");
            // to continue app
            main();
        }
    });
}

// 4.function to delete an account
function deleteAccount() {
    rl.question('Enter account number to delete: ', (number) => {
        let index = accounts.findIndex(acc => acc.number === number);
        if (index !== -1) {
            accounts.splice(index, 1);
            console.log(`\nAccount ${number} deleted successfully!!`);
        } else {
            console.log("\nAccount not found!!");
        }
        main();
    });
}

// 5.function deposit into an account
function depositAmount() {
    rl.question('Enter account number to deposit into: ', (number) => {
        let findAccount = accounts.find(acc => acc.number === number);
        if (findAccount.length !== 0) {
            rl.question('Enter amount to deposit: ', (amount) => {
                if (amount <= 0) {
                    console.log("\nInvalid deposit amount!!");
                }
                else {
                    amount = parseFloat(amount);
                    findAccount.balance = findAccount.balance + amount;
                    const filterPrev = accounts.filter(acc => acc.number !== number);
                    if (filterPrev.length !== 0) {
                        const newData = [...filterPrev, findAccount];
                        accounts = newData;
                    }
                    else {
                        accounts = [findAccount];
                    }
                    console.log(`\nAmount ${amount}, successfully deposits into account ${number}`);
                }
                main();
            });
        } else {
            console.log("\nAccount not found!!");
            main();
        }
    });
}

// 6.function withDraw from an account
function withdrawAmount() {
    rl.question('Enter account number to withDraw from: ', (number) => {
        let account = accounts.find(acc => acc.number === number);
        if (account) {
            rl.question('Enter withDraw Amount: ', (amount) => {
                if (amount <= 0) {
                    console.log("\nInvalid withDraw amount!!");
                }
                else {
                    if (account.balance < amount) {
                        console.log("\nNot sufficient balance for withDraw!!");
                    }
                    else {
                        amount = parseFloat(amount);
                        account.balance = account.balance - amount;
                        const filterPrev = accounts.filter(acc => acc.number !== number);
                        if (filterPrev.length === 0) {
                            accounts = [account];
                        }
                        else {
                            const newData = [...filterPrev, account];
                            accounts = newData;
                        }
                        console.log(`\nAmount ${amount}, successfully withDraw from account ${number}`);
                    }
                }
                main();
            });
        } else {
            console.log("\nAccount not found!!");
            main();
        }
    });
}

// 7.function search an account
function searchAccount() {
    rl.question('Enter account number to search: ', (number) => {
        let account = accounts.find(acc => acc.number === number);
        if (account) {
            console.log(`\nName: ${account.name}, Number: ${account.number}, Balance: ${account.balance}, Type:${account.type}`);
        } else {
            console.log("\nAccount not found");
        }
        main();
    });
}

// main function
function main() {
    console.log("\n---------------Enter your choice--------------");
    console.log("1. Create a new account");
    console.log("2. Display all accounts");
    console.log("3. Update an account");
    console.log("4. Delete an account");
    console.log("5. Deposit an amount into your account");
    console.log("6. Withdraw an amount from your account");
    console.log("7. Search for account");
    console.log("8. Exit");
    console.log("--------------*******************--------------\n");

    rl.question('Enter your choice: ', (choice) => {
        switch (parseInt(choice)) {
            case 1:
                createAccount();
                break;
            case 2:
                displayAllAccounts();
                break;
            case 3:
                updateAccount();
                break;
            case 4:
                deleteAccount();
                break;
            case 5:
                depositAmount();
                break;
            case 6:
                withdrawAmount();
                break;
            case 7:
                searchAccount();
                break;
            case 8:
                console.log("\nExiting...Thank You!");
                rl.close();
                break;
            default:
                console.log("\nInvalid choice");
                rl.close();
        }
    });
}

main();
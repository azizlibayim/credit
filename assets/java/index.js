let pin = "";
let tryCount = 3;
let balance = 5000;
let hasCredit = false;
let salary = 1500;

let transactions = [];

let userPin = prompt('add your pin');
pin = userPin;


while (tryCount > 0) {
    let loginPin = prompt('add pin for login');
    if (loginPin === pin) {
        console.log('welcome');
        withDraw();
        break;

    } else {
        tryCount--;
        console.log(`${tryCount} chance remained`);
        if (tryCount === 0) {
            console.error('Your card blocked.Contact the bank')
        }
    }
}

function withDraw() {
    let hasShowedCredit;
    let newOffer;
    let amount = Math.abs(Number(prompt('Enter the cash you want')));
    if (amount <= balance) {
        balance -= amount;

        let trObj = {
            amount: amount,
            date: new Date(),
            deposit: false
        }
        transactions.push(trObj)

        console.log('Your balance:', balance);
        if (balance == 0 && !hasCredit) {
            let hasShowedCredit = confirm('You want credit?')
            if (hasShowedCredit) {
                let result = calculateCredit(salary);
                console.log(`Max amount:${result.maxCreditAmount},monthly payment: ${result.monthlyPayment}`);
                const hasAcceptedCredit = confirm('Do you agree offer?')
                if (hasAcceptedCredit) {
                    balance += result.maxCreditAmount;
                    let trObjCredit = {
                       amount: result.maxCreditAmount,
                        date: new Date(),
                        deposit: true
                    }

                    transactions.push(trObjCredit)

                    hasCredit = true;
                    console.log('credit added balance:', balance);

                    const wantToPayCredit=confirm('Do you want make a credit payment?')
                    if (wantToPayCredit){
                        const creditAmount = parseFloat(prompt('Enter the credit payment amount:'));
                        payTheCredit(creditAmount);
                    }
                } 
            }
        }
    } else {
        console.info('There is not enough money in your balance')
    }

    let isCon = confirm('Do you want to withdraw again?');
    if (isCon) {
        withDraw();
    }
    else {

        let operation = prompt('With balance: B, with transaction: T')

        switch (operation) {
            case 'B':
                console.log('Balance: ', balance);
                break;
            case 'T':
                ShowTransations();
                break;
        }


        console.log('Thanks');
    }

}

function calculateCredit(salary) {
    let monthlyPayment = salary * 45 / 100;
    let maxCreditAmount = 12 * monthlyPayment;

    let result = maxCreditAmount - (maxCreditAmount * 10 / 100);
    return {
        monthlyPayment: monthlyPayment,
        maxCreditAmount: result
    };
}

function payTheCredit(creditAmount) {
    if (creditAmount <= balance) {
        balance -= creditAmount;
        let creditPaymentTransaction = {
            amount: creditAmount,
            date: new Date(),
            deposit: false,
            creditPayment: true
        };
        transactions.push(creditPaymentTransaction);
        console.log(`You have made a credit payment of ${creditAmount}. Your balance: ${balance}`);
    }else {
        console.log(`Insufficient balance. Your balance: ${balance}`);
    }
}


function ShowTransations() {
    transactions.forEach(tr => {
        let date = tr.date;

        let trDate = `${date.getDate()} - ${date.getMonth()}- ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        let transactionType = tr.deposit ? 'Medaxil' : 'Mexaric';
        if (tr.creditPayment) {
            transactionType = 'Kredit odemesi';
        }

        document.write(`Amount: ${tr.amount}, Date: ${trDate} - ${transactionType}<br/>`);

    });
}



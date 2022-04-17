

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let r = 0;
    for(let t of this.transactions) {
      r += t.value;
    }
    return r;
    //calculate the balance using the transaction objects
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
    this.time = new Date();
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol")
console.log('Starting Account Balance: ', myAccount.balance);

// console.log('Attempting to withdraw even $1 should fail');
// let t1 = new Withdrawal(1.00, myAccount);
// console.log('commit result:', t1.commit())
// console.log('Account balance: ', myAccount.balance);

console.log('Depositing should succeed');
let t2 = new Deposit(10.00, myAccount);
console.log('commit result:', t2.commit())
console.log('Account balance: ', myAccount.balance);

console.log('Withdrawal should be allowed');
let t3 = new Withdrawal(9.99, myAccount);
console.log('commit result:', t3.commit())
console.log('Account balance: ', myAccount.balance);

console.log('Ending account balance');
console.log('Account balance: ', myAccount.balance);

console.log('Transaction history:', myAccount.transactions);

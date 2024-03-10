const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

// Read contract ABI and address from JSON file
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'build', 'contracts', 'PolygonWallet.json'), 'utf8'));
const contractABI = data.abi;
const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8'; // Replace with the address of your PolygonWallet contract

// Connect to the Polygon network
const web3 = new Web3('https://go.getblock.io/91ea760a275c4c6385ede119462e662f');

// PolygonWallet class for creating Polygon wallets
class PolygonWallet {
    constructor() {
        // Generate a new private key and address
        const account = web3.eth.accounts.create();
        this.privateKey = account.privateKey;
        this.address = account.address;
    }

    // Example function to generate a random Ethereum address
    generateRandomAddress() {
        // Create a new Ethereum account (which generates a random private key and address)
        const newAccount = web3.eth.accounts.create();
        return newAccount.address;
    }

    // Example function to deposit tokens to the Polygon wallet contract
    async depositTokens(amount) {
        // Generate a random recipient address
        const recipientAddress = this.generateRandomAddress();

        // Instantiate the contract object
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Call the deposit function of the contract
        const result = await contract.methods.deposit(amount).send({ from: this.address});
        console.log('Deposit successful. Transaction hash:', result.transactionHash);
        console.log('Tokens sent to recipient address:', recipientAddress);
    }

    // Example function to withdraw tokens from the Polygon wallet contract
    async withdrawTokens(amount, recipientAddress) {
        // Instantiate the contract object
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Call the withdraw function of the contract
        const result = await contract.methods.withdraw(amount, recipientAddress).send({ from: this.address });
        console.log('Withdrawal successful. Transaction hash:', result.transactionHash);
    }
}

// Example usage:
const polygonWallet = new PolygonWallet();

// Replace '1000000000000000000' with the amount of tokens you want to deposit or withdraw
const amount = '1000000000000000000';

polygonWallet.depositTokens(10);
// polygonWallet.withdrawTokens(amount, 'RECIPIENT_ADDRESS');

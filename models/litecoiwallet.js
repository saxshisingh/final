const axios = require('axios');
const litecore = require('litecore-lib');

class LitecoinWalletBlockCypher {
    constructor() {
        this.apiToken = '3767341c0e1c475599114e28cc3c9940';
        this.apiUrl = 'https://api.blockcypher.com/v1/ltc/main';
        this.keyPair = litecore.PrivateKey();
        this.address = this.keyPair.toAddress().toString();
    }

    async createWallet() {
        try {
            this.keyPair = litecore.PrivateKey();
            this.address = this.keyPair.toAddress().toString();
            console.log("Your address: ", this.address);
            return this.address;
        } catch (error) {
            console.error('Error creating wallet:', error);
            throw new Error('Error creating wallet');
        }
    }

    async getBalance(address) {
        try {
            const response = await axios.get(`${this.apiUrl}/addrs/${address}/balance`);
            return response.data.balance;
        } catch (error) {
            console.error('Error fetching balance:', error.response.data);
            throw new Error('Error fetching balance');
        }
    }

    async deposit(amount) {
        try {
            const keyPair = litecore.PrivateKey();
            const address = keyPair.toAddress().toString();
    
            const walletBalance = await this.getBalance(this.address);
            if (walletBalance < amount) {
                console.error('Insufficient balance for deposit:', walletBalance);
                return;
            }
    
            const amountSatoshi = Math.round(amount * 1e8);
    
            const payload = {
                inputs: [{ addresses: [this.address] }],
                outputs: [{ addresses: address, value: amountSatoshi }]
            };
    
            const response = await axios.post(`${this.apiUrl}/txs/new`, payload, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiToken}` }
            });
    
            console.log('Deposit successful:', response.data);
        } catch (error) {
            console.error('Error depositing:', error.response.data);
            throw new Error('Error depositing');
        }
    }
    
    async withdraw(amount, recipientaddress) {
        try {
            const amountSatoshi = Math.round(amount * 1e8);

            const walletBalance = await this.getBalance(recipientaddress);
            if (walletBalance < amountSatoshi) {
                console.error('Insufficient balance for withdrawal:', walletBalance);
                return;
            }

            const payload = {
                inputs: [{ addresses: [recipientaddress] }],
                outputs: [{ addresses: [this.address], value: amountSatoshi }]
            };

            const response = await axios.post(`${this.apiUrl}/txs/new`, payload, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiToken}` }
            });

            console.log('Withdrawal successful:', response.data);
        } catch (error) {
            console.error('Error withdrawing:', error.response.data);
            throw new Error('Error withdrawing');
        }
    }
}



module.exports = LitecoinWalletBlockCypher;
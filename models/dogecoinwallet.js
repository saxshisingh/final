const axios = require('axios');
const dogecoin = require('dogecore-lib');

class DogecoinWallet {
    constructor() {
        this.apiToken = '3767341c0e1c475599114e28cc3c9940';
        this.apiUrl = 'https://api.blockcypher.com/v1/doge/main';
        this.privateKey = new dogecoin.PrivateKey();
        this.address = this.privateKey.toAddress().toString();
    }

    async createWallet() {
        try {
            if (!this.address) {
                this.privateKey = new dogecoin.PrivateKey();
                this.address = this.privateKey.toAddress().toString();
            }
        console.log("your address: ", this.address);
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
            const privateKey = new dogecoin.PrivateKey();
            const address = privateKey.toAddress().toString();    
            const walletBalance = await this.getBalance(this.address);
            console.log("To address: ", address);
            if (walletBalance < amount) {
                console.error('Insufficient balance for deposit:', walletBalance);
                return;
            }
            const amountSatoshi = amount * 1e8;    
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
            const amountSatoshi = amount * 1e8;
    
            const walletBalance = await this.getBalance(this.address); 
            if (walletBalance < amountSatoshi) {
                console.error('Insufficient balance for withdrawal:', walletBalance);
                return;
            }
    
            const payload = {
                inputs: [{ addresses: [this.address] }], 
                outputs: [{ addresses: [recipientaddress], value: amountSatoshi }] 
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


module.exports = DogecoinWallet;
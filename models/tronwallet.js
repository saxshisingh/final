const TronWeb = require('tronweb');

const tronWeb = new TronWeb({
    fullNode: 'https://api.trongrid.io',
    solidityNode: 'https://api.trongrid.io',
    eventServer: 'https://api.trongrid.io',
    headers: {
        'TRON-PRO-API-KEY': '7f58df47-38bb-46b5-b14b-cfd65b0843db'
    }
});

class TronWallet {
    constructor() {
        this.contractABI = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];
        this.contractAddress = 'TVdbKFNVRJjYpdPHDxSoeLw7Tp5AmA11zh'; 
        this.contract = tronWeb.contract(this.contractABI, this.contractAddress);
        this.wallet = this.generateRandomAddress();
        
    }

    async generateRandomAddress() {
        const randomWallet = await tronWeb.createAccount();
        console.log("address: ", randomWallet.address.base58);
        return randomWallet.address.base58;
    }

    async getBalance(address) {
        try {
            const balance = await tronWeb.trx.getBalance(address);
            return tronWeb.fromSun(balance); 
        } catch (error) {
            console.error('Error getting balance:', error);
            return 0; 
        }
    }

    async deposit(amount) {
        try {
            const randomAddress = await this.generateRandomAddress();
            const mywallet = await this.wallet;
            const balance = await this.getBalance(mywallet);
            if (balance < amount) {
                console.error('Insufficient balance in wallet:', balance, 'TRX');
                return;
            }
            const tx = await this.contract.transfer(randomAddress, amount).send();
            console.log('Deposit successful:', tx);
            console.log('Deposited', amount, 'TRX to', randomAddress);
        } catch (error) {
            console.error('Error depositing:', error);
        }
    }

    async withdraw(amount, fromAddress) {
        try {
            const contractBalance = await this.getBalance(fromAddress);
            if (contractBalance < amount) {
                console.error('Insufficient balance in sender address:', contractBalance, 'TRX');
                return;
            }
                const tx = await this.contract.transfer(this.wallet, amount).send({
                shouldPollResponse: true,
                callValue: 0, 
                shouldPollResult: true,
                from: fromAddress 
            });    
            console.log('Withdrawal successful:', tx);
            console.log('Withdrawn', amount, 'TRX from', fromAddress, 'to', this.wallet);
        } catch (error) {
            console.error('Error withdrawing:', error);
        }
    }
    

}



module.exports = TronWallet;
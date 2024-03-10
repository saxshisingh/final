class ParentWallet {
    constructor() {
        this.currencies = {}; 
    }
    
    addChildWallet(currency, wallet) {
        this.currencies[currency] = wallet;
    }

    getChildWallet(currency) {
        return this.currencies[currency];
    }

    async getBalance(currency, address) {
        const wallet = this.getChildWallet(currency);
        if (wallet) {
            return wallet.getBalance(address);
        } else {
            throw new Error(`Wallet for ${currency} not found.`);
        }
    }

    async deposit(currency, amount) {
        const wallet = this.getChildWallet(currency);
        if (wallet) {
            return wallet.deposit(amount);
        } else {
            throw new Error(`Wallet for ${currency} not found.`);
        }
    }

    async withdraw(currency, recipient, amount) {
        const wallet = this.getChildWallet(currency);
        if (wallet) {
            return wallet.withdraw(recipient, amount);
        } else {
            throw new Error(`Wallet for ${currency} not found.`);
        }
    }
}


module.exports = ParentWallet;

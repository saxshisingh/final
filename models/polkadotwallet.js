const { ApiPromise, Keyring, cryptoWaitReady } = require('@polkadot/api');
const { randomAsHex } = require('@polkadot/wasm-crypto');
const express = require('express');

class PolkadotWallet {
    constructor(apiUrl, webhookPort) {
        this.apiUrl = 'https://go.getblock.io/e48203e93f724eb69ae18cb0027f8e1a';
        this.api = null;
        this.keyring = new Keyring();
        this.keyPair = null;
        this.address = null;
        this.webhookPort = 3000;
        this.app = express();
    }

    async connect() {
        try {
            await cryptoWaitReady();
            this.api = await ApiPromise.create();
        } catch (error) {
            console.error('Error connecting to the Polkadot API:', error);
            throw new Error('Error connecting to the Polkadot API');
        }
    }

    async createWallet() {
        try {
            this.keyPair = this.keyring.addFromUri(randomAsHex());
            this.address = this.keyPair.address;
            console.log('Your address:', this.address.toString());
            return this.address.toString();
        } catch (error) {
            console.error('Error creating wallet:', error);
            throw new Error('Error creating wallet');
        }
    }

    async deposit(amount, myAddress) {
        try {
            // Perform deposit logic using Polkadot API
            const recipientKeyPair = this.keyring.addFromUri(randomAsHex());
            const recipientAddress = recipientKeyPair.address;

            const transferAmount = amount;

            const transfer = this.api.tx.balances.transfer(recipientAddress, transferAmount);

            const hash = await transfer.signAndSend(this.keyPair);

            console.log('Deposit successful. Transaction hash:', hash.toString());
        } catch (error) {
            console.error('Error depositing:', error);
            throw new Error('Error depositing');
        }
    }

    async withdraw(amount, recipientAddress, myAddress) {
        try {
            const walletBalance = await this.getBalance(myAddress);
            if (walletBalance < amount) {
                console.error('Insufficient balance for withdrawal:', walletBalance);
                return;
            }

            const transferAmount = amount;

            const transfer = this.api.tx.balances.transfer(recipientAddress, transferAmount);

            const hash = await transfer.signAndSend(this.keyPair);

            console.log('Withdrawal successful. Transaction hash:', hash.toString());
        } catch (error) {
            console.error('Error withdrawing:', error);
            throw new Error('Error withdrawing');
        }
    }

    async startWebhookServer() {
        this.app.use(express.json());

        this.app.post('/webhook', async (req, res) => {
            try {
                const eventData = req.body; // Assuming GetBlocks.io sends JSON data
                // Handle incoming webhook data here
                console.log('Received webhook data:', eventData);
                res.status(200).send('Webhook received successfully');
            } catch (error) {
                console.error('Error handling webhook data:', error);
                res.status(500).send('Internal server error');
            }
        });

        this.app.listen(this.webhookPort, () => {
            console.log(`Webhook server running on port ${this.webhookPort}`);
        });
    }
}



testPolkadotWallet();

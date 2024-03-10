const express = require('express');
const router = express.Router();
const ParentWallet = require('../models/parentWallet');

const parentWallet = new ParentWallet();

router.get('/balance/:currency', (req, res) => {
    const currency = req.params.currency;
    const wallet = parentWallet.getChildWallet(currency);
    if (wallet) {
        const balance = wallet.getBalance();
        res.json({ balance });
    } else {
        res.status(404).json({ error: 'Wallet not found' });
    }
});

router.post('/deposit/:currency', async (req, res) => {
    const currency = req.params.currency;
    const amount = req.body.amount;
    if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
    }
    const wallet = parentWallet.getChildWallet(currency);
    if (wallet) {
        try {
            await wallet.deposit(amount);
            res.json({ message: 'Deposit successful' });
        } catch (error) {
            res.status(500).json({ error: 'Error depositing' });
        }
    } else {
        res.status(404).json({ error: 'Wallet not found' });
    }
});

router.post('/withdraw/:currency', async (req, res) => {
    const currency = req.params.currency;
    const recipient = req.body.recipient;
    const amount = req.body.amount;
    if (!amount) {
        return res.status(400).json({ error: 'Amount is required' });
    }
    const wallet = parentWallet.getChildWallet(currency);
    if (wallet) {
        try {
            await wallet.withdraw(recipient, amount);
            res.json({ message: 'Withdrawal successful' });
        } catch (error) {
            res.status(500).json({ error: 'Error withdrawing' });
        }
    } else {
        res.status(404).json({ error: 'Wallet not found' });
    }
});

module.exports = router;

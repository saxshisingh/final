const express = require('express');
const router = express.Router();
const ParentWallet = require('../models/parentWallet');

const parentWallet = new ParentWallet();

router.post('/addWallet', async (req, res) => {
    try {
        const { currency, wallet } = req.body;
        parentWallet.addChildWallet(currency, wallet);
        res.status(200).json({ message: `Child wallet for ${currency} added successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/balance/:currency/:address', async (req, res) => {
    try {
        const { currency, address } = req.params;
        const balance = await parentWallet.getBalance(currency, address);
        res.status(200).json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/deposit/:currency', async (req, res) => {
    try {
        const { currency } = req.params;
        const { amount } = req.body;
        await parentWallet.deposit(currency, amount);
        res.status(200).json({ message: `Deposit into ${currency} wallet successful` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/withdraw/:currency', async (req, res) => {
    try {
        const { currency } = req.params;
        const { recipient, amount } = req.body;
        await parentWallet.withdraw(currency, recipient, amount);
        res.status(200).json({ message: `Withdraw from ${currency} wallet successful` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

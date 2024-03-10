const express = require('express');
const app = express();

app.use(express.json());


const BitcoinWallet = require('./models/bitcoinWallet');
const EthereumWallet = require('./models/ethereumwallet');
const TetherWallet = require('./models/tetherWallet');
const BinanceCoinWallet = require('./models/Binancecoinwallet');
const TronWallet = require('./models/tronwallet');
const LitecoinWallet = require('./models/litecoiwallet');
const DogecoinWallet = require('./models/dogecoinwallet');
const ChainlinkWallet = require('./models/chainlinkwallet');
const ParentWallet = require('./models/parentWallet');


const parentWallet = new ParentWallet();

const bitcoinWallet = new BitcoinWallet();
const ethereumWallet = new EthereumWallet();

parentWallet.addChildWallet('Bitcoin', bitcoinWallet);
parentWallet.addChildWallet('Ethereum', ethereumWallet);

const binanceCoinWallet = new BinanceCoinWallet();
parentWallet.addChildWallet('BinanceCoin',binanceCoinWallet);

const chainLinkIntegration = new ChainlinkWallet();
parentWallet.addChildWallet('ChainLink',chainLinkIntegration);

const dogecoinWallet = new DogecoinWallet();
parentWallet.addChildWallet('DogeCoin',dogecoinWallet);

const liteCoinWallet = new LitecoinWallet();
parentWallet.addChildWallet('LiteCoin',liteCoinWallet);


const tetherWallet = new TetherWallet();
parentWallet.addChildWallet('Tether',tetherWallet);

const tronWallet = new TronWallet();
parentWallet.addChildWallet('Tron',tronWallet);

const btcWallet = parentWallet.getChildWallet('Bitcoin');
const ethWallet = parentWallet.getChildWallet('Ethereum');
const binance = parentWallet.getChildWallet('BinanceCoin');
const chainlink = parentWallet.getChildWallet('ChainLink');
const dogecoinwallet = parentWallet.getChildWallet("DogeCoin");
const ethereumwallet = parentWallet.getChildWallet('Ethereum');
const litecoin = parentWallet.getChildWallet( 'LiteCoin' ); 
const tether = parentWallet.getChildWallet('Tether');
const tron = parentWallet.getChildWallet('Tron') ;


module.exports = app;
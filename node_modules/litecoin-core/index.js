const fetch = require("node-fetch");

const AVAILABLE_METHODS = [
  // Blockchain
  "getBestBlockHash",
  "getBlock",
  "getBlockchainInfo",
  "getBlockCount",
  "getBlockHash",
  "getBlockHeader",
  "getBlockStats",
  "getChainTips",
  "getChainTxStatus",
  "getDifficulty",
  "getMemPoolAncestors",
  "getMemPoolDescendants",
  "getmemPoolEntry",
  "getMemPoolInfo",
  "sendFrom",
  "getRawMemPool",
  "getTxOut",
  "getTxOutProof",
  "getTxOutSetInfo",
  "preciousBlock",
  "pruneBlockchain",
  "saveMemPool",
  "scanTxOutSet",
  "verifyChain",
  "verifyTxOutProof",
  // control
  "getMemoryInfo",
  "getRpcInfo",
  "help",
  "logging",
  "stop",
  "uptime",
  // generating
  "generate",
  "generateToAddress",
  // mining
  "getBlockTemplate",
  "getMiningInfo",
  "getNetworkHashps",
  "prioritiSetTransaction",
  "submitBlock",
  "submitHeader",
  // network
  "addNode",
  "clearBanned",
  "disconnectNode",
  "getAddedNodeInfo",
  "getConnectionOnCount",
  "getNetTotals",
  "getNetworkInfo",
  "getNodeAddresses",
  "getPeerInfo",
  "listBanned",
  "ping",
  "setBan",
  "setNetworkActive",
  // raw transactions
  "analyzePsbt",
  "combinePsbt",
  "combineRawTransaction",
  "convertToPsbt",
  "createPsbt",
  "createRawTransaction",
  "decodePsbt",
  "decodeRawTransaction",
  "decodeScript",
  "finalizePsbt",
  "fundRawTransaction",
  "getRawTransaction",
  "joinPsbts",
  "sendRawTransaction",
  "signRawTransaction",
  "testMemPoolAccept",
  "utxoUpdatePsbt",
  //util
  "createMultiSig",
  "deriveAddresses",
  "estimateSmartFee",
  "getDescriptorInfo",
  "signMessageWithPrivateKey",
  "validateAddresses",
  "verifyMessage",
  // wallet
  "abandonTransaction",
  "abortRescan",
  "addMultiSigAddress",
  "backupWallet",
  "bumpFee",
  "createWallet",
  "dumpPrivKey",
  "dumpWallet",
  "encryptWallet",
  "getAddressesByLabel",
  "getAddressInfo",
  "getBalance",
  "getNewAddress",
  "getRawChangeAddress",
  "getReceivedByAddress",
  "getReceivedByLabel",
  "getTransaction",
  "getUnconfirmedBalance",
  "getWalletInfo",
  "importAddress",
  "importMulti",
  "importPrivKey",
  "importPrunedFunds",
  "importPubKey",
  "importWallet",
  "keyPoolRefill",
  "listAddressGroupings",
  "listLabels",
  "listLockUnspent",
  "listReceivedByAddress",
  "listReceivedByLabel",
  "listSinceBlock",
  "listTransactions",
  "listUnspent",
  "listWalletDir",
  "listWallets",
  "loadWallet",
  "lockUnspent",
  "removePrunedFunds",
  "rescanBlockchain",
  "sendMany",
  "sendToAddress",
  "setHDSeed",
  "setLabel",
  "setTxFee",
  "signMessage",
  "signRawTransactionWithHDWallet",
  "unloadWallet",
  "walletCreateFundedPsbt",
  "walletLock",
  "walletPassphrase",
  "walletPassphraseChange",
  "walletProcessPsbt",
  //zmq
  "getZmqNotifications"
];

const networks = {
  mainnet: 9332,
  regtest: 19332,
  testnet: 19332
};

module.exports = config => {
  let { host, port, username, password, network = "mainnet", apiKey } = config;
  //set default port
  port = config.port || networks[network];

  const BASE_URL = `http://${host}:${port}`;
  const auth = new Buffer.from(username + ":" + password).toString("base64");

  const post = (method, ...params) => {
    //console.log(method, params)
    return fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({ method, params, "API_key": apiKey })
    })
      .then(res => res.json())
      .then(({ error, result }) => {
        return new Promise((resolve, reject) => {
          if (error)
            reject(`RPC ERROR: [${method}] (${error.code}) ${error.message}`);
          else resolve(result);
        });
      });
  };

  return AVAILABLE_METHODS.reduce((memo, m) => {
    memo[m] = (...args) => post(m.toLowerCase(), ...args);
    return memo;
  }, {});
};

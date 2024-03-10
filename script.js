const { Network, Alchemy }=require( 'alchemy-sdk');

const settings = {
    apiKey: "oBEvPS8BSuKuermG-de5SrHTJJq9LV5l",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// get the latest block
const latestBlock = alchemy.core.getBlock("latest").then(console.log);
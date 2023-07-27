const { Web3 } = require("web3");
const ABI = require("../ABI.json");
const web3 = new Web3(
    "https://convincing-compatible-cherry.ethereum-sepolia.discover.quiknode.pro/e47d01c0bfdb6967f3de556e66d8bae203c6e840/"
  );
  const contractAdress = "0x628cb87b50f7b5eec6141e0abdae54ecb75ad69d";
  const contract = new web3.eth.Contract(ABI, contractAdress);
  module.exports={contract}
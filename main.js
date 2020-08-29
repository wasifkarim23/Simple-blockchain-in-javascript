const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        return SHA256(this.index + this.nonce + this.timestamp + this.previousHash + this.data).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Mined Block : " + this.hash);
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }
    createGenesisBlock() {
        return new Block(0, "28/08/2020", "Genesis Block", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}
let WasCoin = new Blockchain();
console.log("Mining block 1");
WasCoin.addBlock(new Block(1, "29/08/2020", "amount: 4"));
console.log("Mining block 2");
WasCoin.addBlock(new Block(2, "30/08/2020", "amount: 6.5"));
//WasCoin.chain[1].data = "amount : 100";
//WasCoin.chain[1].hash = WasCoin.chain[1].calculateHash();
//console.log(WasCoin.chain[0].hash);
//console.log(WasCoin.chain[1].hash);
//console.log(WasCoin.chain[2].hash);
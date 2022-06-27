var previousBlock = { number: 0 };
var currentBlock;

class BlockExplorer {
    web3;
    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7f5a496f89304fbfa64e08c8560114f6'));
        this.secSinceLastBlock = 0;
        this.BlockTimer();
    }
    async checkBlock() {
        let block = await this.web3.eth.getBlock('latest');
        currentBlock = block;

        if (currentBlock != null) {
            if (currentBlock.number > previousBlock.number) {
                this.secSinceLastBlock = 0;
                previousBlock = currentBlock;
                // console.log("= = = = = = = ")
                // console.log("fetching... " + x);
                // console.log(">>>>> " + block.number + ",  tx: " + currentBlock.transactions.length)
                // let pl = [...block.transactions]
                // console.log(pl)
                // console.log(currentBlock)
                if (currentBlock.transactions.length == 0) {
                    // console.log("block has 0 transactions")
                }
                else if (currentBlock.transactions.length > 0) {
                    // console.log("block has " + currentBlock.transactions.length + " transactions")
                    new Block(currentBlock);
                    // new Block(empty_block);
                }
                else {
                    // console.log("block undefined")
                }
                // console.log("= = = = = = = ")
            }
        }
    }

    async getTxDetails(sprite_id) {
        if (sprite_id < activeBlock.block_data.transactions.length) {
            let txHash = activeBlock.block_data.transactions[sprite_id]
            let txDetails = await this.web3.eth.getTransaction(txHash);
            // let txDetails = await this.web3.eth.getTransactionReceipt(txHash);
            if (txDetails != null) {
                new PopUp(txDetails)
            }
        }
    }

    refreshBlockTimer() {
        var refresh = 1000; // Refresh rate in milli seconds
        this.secSinceLastBlock++;
        // console.log("--> " + this.secSinceLastBlock)

        setTimeout(() => {
            this.BlockTimer();
        }, refresh);
    }
    BlockTimer() {
        this.refreshBlockTimer();
    }
}

var blockExplorer = new BlockExplorer();
let x = 0;
function fetch_data() {
    x += 1;
    // console.log("fetching... " + x);
    blockExplorer.checkBlock();
    setTimeout(fetch_data, 200);
}
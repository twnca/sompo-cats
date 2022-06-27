class Block {
    constructor(_block) {
        this.createdSpriteCount = 0;
        this.allSpritesCreated = false;
        this.spriteCount_InVagon = -1;  // hic tx olmayan block gelince vagon gonderilmesin diye -1
        this.isAllSpritesInsideVagon = false;
        this.sprites = [];

        this.timeOut;
        this.timeSinceLastSpriteSent = 0;
        this.neededTimeBeforeSendingNewSprites = 300;  // miliseconds
        this.spriteRefreshInterval = 100;
        this.SpriteTimer();

        this.b = {
            number: _block.number,
            timestamp: _block.timestamp,
            hash: _block.hash,
            gasUsed: _block.gasUsed,
            size: _block.size,
            difficulty: _block.difficulty,
            nonce: _block.nonce,
            tx_count: _block.transactions.length,
        }

        this.block_data = _block;
        blockQueue.enqueue(this);
        newBlockCreatedEvent(this);
    }

    refreshSpriteTimer() {
        // var refreshInterval = spriteRefreshInterval; // Refresh rate in milli seconds
        this.timeSinceLastSpriteSent += this.spriteRefreshInterval;
        // console.log("--> " + this.timeSinceLastSpriteSent)

        this.timeOut = setTimeout(() => {
            this.SpriteTimer();
        }, this.spriteRefreshInterval);
    }
    SpriteTimer() {
        this.refreshSpriteTimer();
    }

    destroy() {
        // console.log("OUT  > > > > >  " + this.block_data.number)
        this.sprites = [];
        this.block_data = [];
        blockQueue.dequeue();
    }
}
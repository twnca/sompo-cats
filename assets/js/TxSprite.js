class TxSprite {
    constructor(_x, _y, _speed, _size) {
        let [xx, yy] = getRandomXY_onEdge()
        if (xx < _x) {
            xx = _x
            yy = roof.on_egim * (xx - roof.L.x) + roof.L.y
        }
        this.destination_x = xx;
        this.destination_y = yy;

        this.hasToMove = true;
        this.arrivedToDestination = false;
        this.isSpriteMoving = false;
        this.isOnEdgeOrJumping = false;
        this.jumpStep = 0;
        this.insideVagon = false;
        this.speed_x = _speed;
        this.speed_y = _speed;
        // this.speed_x = 300;
        // this.speed_y = 300;

        let r = random(1, 33)
        r = "cat" + r
        this.sprite = new PIXI.AnimatedSprite(spriteSheet[r]);
        this.sprite.id = activeBlock.createdSpriteCount;
        this.sprite.interactive = true;
        this.sprite.on('click', function () {
            blockExplorer.getTxDetails(this.id)
        });

        // this.sprite.tint = Math.random() * 0xFFFFFF;
        this.sprite.anchor.set(0.5, 1);
        this.sprite.scale = new PIXI.Point(_size, _size);
        this.scale_going_right = this.sprite.scale.x * -1
        this.scale_going_left = this.sprite.scale.x
        this.sprite.animationSpeed = .2;
        this.sprite.loop.true;
        this.sprite.x = _x;
        this.sprite.y = _y;
        activeBlock.sprites.push(this);
        if (!activeContainerSwitch) { // false for 1 //  true for 2
            sprite_container_1.addChild(this.sprite);
        }
        else {
            sprite_container_2.addChild(this.sprite);
        }
        this.sprite.play();
    }
}
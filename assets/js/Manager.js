function SpriteBirthControl() {
    if (blockQueue.length > 4) {
        let o = 400 / blockQueue.length
        activeBlock.neededTimeBeforeSendingNewSprites = o < 50 ? 50 : o;
    }
    if (blockQueue.length == 3) {
        activeBlock.neededTimeBeforeSendingNewSprites = 140;
    }
    if (blockQueue.length == 2) {
        activeBlock.neededTimeBeforeSendingNewSprites = 200;
    }
    if (blockQueue.length == 1) {
        activeBlock.neededTimeBeforeSendingNewSprites = 300;
    }
}

function SpriteTrafficController() {
    if (activeBlock.createdSpriteCount < activeBlock.block_data.transactions.length) {
        // if (activeBlock.createdSpriteCount < 500) {
        createSprites()
    }
    else if (!activeBlock.allSpritesCreated) {
        clearTimeout(activeBlock.timeOut)
        activeBlock.allSpritesCreated = true;
    }


    if (activeBlock.isAllSpritesInsideVagon) {
        leavingBlock = activeBlock;
        supermanLeaves()
        // if (blockQueue.length > 1) {
        //     newSupermanIsComing = true;
        // }
        // alert("VAGON READY TO LEAVE")
    }
    else if ((activeBlock.spriteCount_InVagon + 1) == activeBlock.block_data.transactions.length) {
        activeBlock.isAllSpritesInsideVagon = true;
        activeContainerSwitch = !activeContainerSwitch;

    }
    else if (leavingBlock.isAllSpritesInsideVagon) {
        supermanLeaves()
        // alert("VAGON READY TO LEAVE")
    }
    if (newSupermanIsComing) {
        supermanComesAgain();

    }
}

function print_new_block_info() {
    if (blockInfoLayer.children.length >= 1) {
        blockInfoLayer.removeChildren();
    }

    let block_url = etherscan_block_url + activeBlock.b.number

    let block_details =
        activeBlock.b.number +
        "\n" + activeBlock.b.tx_count +
        "\n" + activeBlock.b.size +
        "\n" + activeBlock.b.difficulty +
        "\n" + activeBlock.b.gasUsed +
        "\n" + activeBlock.b.timestamp +
        "\n" + hash_tiny(activeBlock.b.hash);

    // LEFT SECTION - TITLES

    const style1 = new PIXI.TextStyle({
        fill: "#f3bc75",
        fontFamily: "Comic Sans MS",
        fontSize: 14,
        lineJoin: "round",

    });
    const titles = new PIXI.Text(blockInfo_titles, style1);

    // let titles = new PIXI.BitmapText(blockInfo_titles, {
    //     fontName: "Desyrel",
    //     fontSize: 18,
    //     align: "left"
    // });
    titles.x = (render_w - 500 - 80) + 26;
    titles.y = 20 + 6;
    blockInfoLayer.addChild(titles);


    // RIGHT SECTION - DETAILS

    const style2 = new PIXI.TextStyle({
        fill: "#f3bc75",
        fontFamily: "Comic Sans MS",
        fontSize: 14,
        lineJoin: "round",
    });
    const details = new PIXI.Text(block_details, style2);

    // let details = new PIXI.BitmapText(block_details, {
    //     fontName: "Desyrel",
    //     fontSize: 18,
    //     align: "left"
    // });
    details.interactive = true;
    details.on('click', function () {
        window.open(block_url, "_blank");
    });
    details.x = (render_w - 500 - 80) + 195;
    details.y = 20 + 6;
    blockInfoLayer.addChild(details);
}

function popUpAnimation() {
    if (popUpAnimation_running) {
        for (let i = 0; i < animatingPopUpList.length; i++) {
            animatingPopUpList[i].animate()
        }
    }
}

function newBlockCreatedEvent(_block) {
    if (blockQueue.length == 1) {
        activeBlock = _block;
        newSupermanIsComing = true;

        if (activeBlock != null || activeBlock != undefined) {
            update_cat_counter()
            print_new_block_info()
        }
    }
    SpriteBirthControl();
}

function createSprites() {
    if (activeBlock.timeSinceLastSpriteSent >= activeBlock.neededTimeBeforeSendingNewSprites) {
        let txCount = activeBlock.block_data.transactions.length
        activeBlock.timeSinceLastSpriteSent = 0;

        // bloktaki tx sayisi coksa daha buyuk topluluk halinde sprite uret
        let arbitrary_birth_number = txCount / 35

        let randomLimit = random(0, arbitrary_birth_number) + 1; // 1...8

        if (randomLimit + activeBlock.createdSpriteCount > txCount) {
            randomLimit = txCount - activeBlock.createdSpriteCount
        }
        else {
            randomLimit = randomLimit + activeBlock.createdSpriteCount
        }

        for (let i = activeBlock.createdSpriteCount; i < randomLimit; i++) {
            let [_x, _y, _speed, _size] = randomSpriteParams();
            new TxSprite(_x, _y, _speed, _size);
            activeBlock.createdSpriteCount++;
        }
    }
}

function randomSpriteParams() {
    // ------ X , Y ------
    let [x, y] = getRandomXY_birth();

    // ------ SPEED ------
    let speed = Math.floor(Math.random() * 6) + 4; // 4...10

    // ------ SIZE ------
    // let influence = 1
    // let bias = 1
    // var rnd = Math.random() * 1.6 + 0.4;   // random in range
    // let mix = Math.random() * influence;           // random mixer
    // let size = rnd * (1 - mix) + bias * mix;
    //------------------------------------------------------------------


    // var rnd = Math.random() * 1.6 + 0.4;   // random in range
    // let mix = Math.random();           // random mixer
    // let size = rnd * (1 - mix) + mix;

    // let size = Math.random() * (max - min) + min
    let size = Math.random() * (0.4 - 0.2) + 0.2

    let tuple = [x, y, speed, size]
    return tuple
}

function getRandomXY_birth() {
    // let random_y = random(-15, -1)
    // // let random_y = random(10, 50)

    // let x_min = -1 * (roof.L.y - random_y - roof.L.x * roof.sol_egim) / roof.sol_egim;
    // let x_max = -1 * (roof.R.y - random_y - roof.R.x * roof.on_egim) / roof.on_egim / 2; // 2.5 is arbitrary bias
    // // top_layer.lineStyle(1, 0x00FF00).moveTo(x_min, random_y).lineTo(x_max, random_y)
    // let random_x = random(x_min, x_max)

    // let coords = [random_x, random_y]
    let coords = [335, 212]
    return coords
}

function getRandomXY_onEdge() {
    let x = random(roof.L.x, roof.R.x - 100);
    let y = roof.on_egim * (x - roof.L.x) + roof.L.y
    let tuple = [x, y]
    return tuple
}

function getRandomXY_inVagon() {
    // let random_y = random(vagonArea.L.y, vagonArea.back_R.y)
    let x = random(vagonArea.L.x, vagonArea.back_R.x);
    let y = roof.on_egim * (x - vagonArea.L.x) + vagonArea.L.y
    let y_randomizer = random(0, vagonArea.L.y - vagonArea.back_L.y)
    y -= 4
    y = y - y_randomizer

    // grp = new PIXI.Graphics();
    // pop_up_container.addChild(grp);
    // grp.lineStyle(4, 0x00FF00).moveTo(x, y).lineTo(x + 1, y + 1)

    let coords = [x, y]
    return coords
}

function moveOneDirection(_sprite, _speed, _axis) {
    if (_axis == "x") {
        // saga git
        if (_sprite.sprite.x < _sprite.destination_x) {
            _sprite.sprite.scale.x = _sprite.scale_going_right;
            _sprite.sprite.x += _speed;
        }
        // sola git
        else if (_sprite.sprite.x > _sprite.destination_x) {
            _sprite.sprite.scale.x = _sprite.scale_going_left;
            _sprite.sprite.x -= _speed;
        }
        else {
            // TODO - error check icin buraya log koy test icin.
            // buraya gelmemesi lazim hic normalde
            // console.log(" >> ERROR >> oldugu konum ve gitmesi gereken konum ayniyken move methoduna hic girmemis olmasi gerekirdi >>")
        }
    }
    else if (_axis == "y") {
        // asagi git
        if (_sprite.sprite.y < _sprite.destination_y) {
            _sprite.sprite.y += _speed;
        }
        // yukari git
        else if (_sprite.sprite.y > _sprite.destination_y) {
            _sprite.sprite.y -= _speed;
        }
        else {
            // TODO - error check icin buraya log koy test icin.
            // buraya gelmemesi lazim hic normalde
            // console.log(" >> ERROR >> oldugu konum ve gitmesi gereken konum ayniyken move methoduna hic girmemis olmasi gerekirdi >>")
        }
    }
    else {
        // axis not valid
    }
}

function jumpPathUpdate(_sprite) {
    if (_sprite.jumpStep < jumpPath.length) {
        _sprite.destination_x = jumpPath[_sprite.jumpStep][0] + _sprite.sprite.x
        _sprite.destination_y = jumpPath[_sprite.jumpStep][1] + _sprite.sprite.y
        _sprite.jumpStep++;
    }
    else {
        activeBlock.spriteCount_InVagon++;
        update_cat_counter()
        _sprite.insideVagon = true;
        _sprite.isOnEdgeOrJumping = false;
    }
}

function update_cat_counter() {
    if (catCounterLayer.children.length >= 1) {
        catCounterLayer.removeChildren();
    }

    let x = 300;
    let y = 30;

    let count;

    if (blockQueue.length == 0) {
        isWaiting = true;
        count = " waiting new transactions"


        // const style = new PIXI.TextStyle({
        //     fill: "#b1c5f8",
        //     fontFamily: "Verdana",
        //     fontSize: 22,
        //     lineJoin: "round",
        //     stroke: "#b1c5f8",
        //     strokeThickness: 1
        // });
        // const count_text = new PIXI.Text(count, style);

        let count_text = new PIXI.BitmapText(count, {
            fontName: "Desyrel",
            fontSize: 30,
            align: "left"
        });

        count_text.x = x - 16;
        count_text.y = y + 14;
        catCounterLayer.addChild(count_text);

    }
    else {
        isWaiting = false;
        count = activeBlock.spriteCount_InVagon + 1
        count = "Cat saved : " + count + " ";
        // console.log(count)


        // const style = new PIXI.TextStyle({
        //     fill: "#b1c5f8",
        //     fontFamily: "Verdana",
        //     fontSize: 25,
        //     lineJoin: "round",
        //     stroke: "#b1c5f8",
        //     strokeThickness: 2
        // });

        // const count_text = new PIXI.Text(count, style);

        let count_text = new PIXI.BitmapText(count, {
            fontName: "Desyrel",
            fontSize: 36,
            align: "left"
        });

        count_text.x = x + 55;
        count_text.y = y + 3;
        catCounterLayer.addChild(count_text);




        const style_min = new PIXI.TextStyle({
            fill: "#7fa2e4",
            fontFamily: "Comic Sans MS",
            fontSize: 16,
        });

        const txs = new PIXI.Text("(transactions)", style_min);

        // // let count_text = new PIXI.BitmapText(count, {
        // //     fontName: "Desyrel",
        // //     fontSize: 46,
        // //     align: "left"
        // // });

        // txs.x = x + 80;
        // txs.y = y + 40;
        // catCounterLayer.addChild(txs);

        // let txs = new PIXI.BitmapText("(transactions)", {
        //     fontName: "Desyrel",
        //     fontSize: 21,
        //     align: "left"
        // });

        txs.x = x + 77
        txs.y = y + 40;
        catCounterLayer.addChild(txs);

    }


}

function moveSprites() {
    if (activeBlock != undefined) {
        for (let n = 0; n < activeBlock.createdSpriteCount; n++) {
            let sprt = activeBlock.sprites[n]
            // move sprite
            if (sprt.hasToMove) {
                if (!sprt.isSpriteMoving) {
                    sprt.sprite.play();
                    sprt.isSpriteMoving = true;
                    sprt.arrivedToDestination = false;
                }

                // kenara ulastiysa
                if (sprt.isOnEdgeOrJumping) {
                    jumpPathUpdate(sprt)
                }
                // vagona ulastiysa
                else if (sprt.insideVagon) {
                    // TODO -  RASTGELE VAGON ICINDE HAREKET ETTIR
                    sprt.sprite.play();
                    if (sprt.destination_x == sprt.sprite.x && sprt.destination_y == sprt.sprite.y) {
                        let [x, y] = getRandomXY_inVagon()



                        // if (Math.abs(sprt.sprite.x - x) > 35) {
                        //     x = random(-15, 15)
                        //     x += sprt.sprite.x
                        //     if (x < vagonArea.L.x || x > vagonArea.back_R.x) {
                        //         x = random(-10, 10)
                        //         x += sprt.sprite.x
                        //         if (x < vagonArea.L.x || x > vagonArea.back_R.x) {
                        //             x = random(-5, 5)
                        //             x += sprt.sprite.x
                        //             if (x < vagonArea.L.x || x > vagonArea.back_R.x) {
                        //                 x = sprt.sprite.x
                        //             }
                        //         }
                        //     }
                        // }

                        sprt.sprite.animationSpeed = .13;
                        sprt.speed_y = 0.2
                        sprt.destination_x = x
                        sprt.destination_y = y
                        speer_ratio = Math.abs(sprt.sprite.y - y) / Math.abs(sprt.sprite.x - x)
                        sprt.speed_x = sprt.speed_y / speer_ratio
                        // sprt.speed_y = 1
                        // sprt.speed_x = 1
                        // if (Math.abs(sprt.sprite.x - x) > Math.abs(sprt.sprite.y - y)) {
                        //     sprt.destination_y = y
                        //     if (sprt.sprite.x - x < 0) {
                        //         sprt.destination_x = sprt.sprite.x + Math.abs(sprt.sprite.y - y)
                        //     }
                        //     else {
                        //         sprt.destination_x = sprt.sprite.x - Math.abs(sprt.sprite.y - y)
                        //     }
                        // }
                        // else {
                        //     sprt.destination_x = x
                        //     if (sprt.sprite.y - y < 0) {
                        //         sprt.destination_y = sprt.sprite.y - Math.abs(sprt.sprite.x - x)
                        //     }
                        //     else {
                        //         sprt.destination_y = sprt.sprite.y + Math.abs(sprt.sprite.x - x)
                        //     }
                        // }

                    }
                }
                else if (sprt.destination_x == sprt.sprite.x && sprt.destination_y == sprt.sprite.y) {
                    if (onTheEdge(sprt.sprite.x, sprt.sprite.y)) {
                        sprt.sprite.stop()
                        sprt.isOnEdgeOrJumping = true;
                        sprt.insideVagon = false;
                    }
                    else {
                        // ERROR - Buraya hic gelmemeli
                        console.log(" + + + ERROR")
                    }
                }



                // X MOVE
                // gidecegi mesafe hizindan fazla ise ayni hizda devam et
                if (Math.abs(sprt.destination_x - sprt.sprite.x) >= sprt.speed_x) {
                    moveOneDirection(sprt, sprt.speed_x, "x")
                }
                // else if (sprt.insideVagon && !inBounds_ofVagon(sprt.sprite.x + sprt.speed_x, sprt.sprite.y)) {
                //     sprt.speed_x *= -1
                //     moveOneDirection(sprt, sprt.speed_x, "x")
                // }
                // gidecegi mesafe hizindan az ise hizini kalan mesafe kadar yap
                else {
                    let temp_speed = Math.abs(sprt.destination_x - sprt.sprite.x);
                    moveOneDirection(sprt, temp_speed, "x")
                }

                // Y MOVE
                // gidecegi mesafe hizindan fazla ise ayni hizda devam et
                if (Math.abs(sprt.destination_y - sprt.sprite.y) >= sprt.speed_y) {
                    moveOneDirection(sprt, sprt.speed_y, "y")
                }
                // else if (sprt.insideVagon && !inBounds_ofVagon(sprt.sprite.x, sprt.sprite.y + sprt.speed_y)) {
                //     sprt.speed_y *= -1
                //     moveOneDirection(sprt, sprt.speed_y, "y")
                // }
                // gidecegi mesafe hizindan az ise hizini kalan mesafe kadar yap
                else {
                    let temp_speed = Math.abs(sprt.destination_y - sprt.sprite.y);
                    moveOneDirection(sprt, temp_speed, "y")
                }
            }



            // dont move sprite
            else {
                // set attributes as idle status
                if (sprt.isSpriteMoving) {
                    sprt.sprite.play();
                    sprt.isSpriteMoving = false;
                    sprt.arrivedToDestination = true;
                }
            }
        }
    }

}

function vector(p1, p2) {
    return {
        x: (p2.x - p1.x),
        y: (p2.y - p1.y)
    };
}
function dot(u, v) {
    return u.x * v.x + u.y * v.y;
}
function inBounds_ofVagon(_x, _y) {
    var m = { x: _x, y: _y };
    var AB = vector(vagonArea.back_L, vagonArea.L);
    var AM = vector(vagonArea.back_L, m);
    var BC = vector(vagonArea.L, vagonArea.R);
    var BM = vector(vagonArea.L, m);
    var dotABAM = dot(AB, AM);
    var dotABAB = dot(AB, AB);
    var dotBCBM = dot(BC, BM);
    var dotBCBC = dot(BC, BC);
    return 0 <= dotABAM && dotABAM <= dotABAB && 0 <= dotBCBM && dotBCBM <= dotBCBC;
}

function onTheEdge(_x, _y) {
    let m = (roof.R.y - _y) / (roof.R.x - _x);
    // console.log(m)
    return m >= roof.on_egim - 0.01 // 0.01 arbitrary // cok ufak kusurat farklarini duzeltmek icin
}

function supermanComesAgain() {
    if (!activeContainerSwitch) { // false for 1 //  true for 2
        for (let k = 0; k < inPathSpeeder; k++) {
            if (vagon1_step < supermanInPath.length) {
                vagon_bottom_layer_1.x += supermanInPath[vagon1_step][0]
                vagon_bottom_layer_1.y += supermanInPath[vagon1_step][1]
                vagon_top_layer_1.x += supermanInPath[vagon1_step][0]
                vagon_top_layer_1.y += supermanInPath[vagon1_step][1]
                vagon1_step++;
            }
            else {
                vagon1_step = 0
                newSupermanIsComing = false;
                break
            }
        }
    }
    else {
        for (let k = 0; k < inPathSpeeder; k++) {
            if (vagon2_step < supermanInPath.length) {
                vagon_bottom_layer_2.x += supermanInPath[vagon2_step][0]
                vagon_bottom_layer_2.y += supermanInPath[vagon2_step][1]
                vagon_top_layer_2.x += supermanInPath[vagon2_step][0]
                vagon_top_layer_2.y += supermanInPath[vagon2_step][1]
                vagon2_step++;
            }
            else {
                vagon2_step = 0
                newSupermanIsComing = false;
                break
            }
        }
    }
}

// function supermanComesAgain() {
//     if (!activeContainerSwitch) { // false for 1 //  true for 2
//         if (vagon_bottom_layer_1.x == 0 && vagon_bottom_layer_1.y == 0) {
//             newSupermanIsComing = false;
//         }
//         if (vagon_bottom_layer_1.x < 0) {
//             vagon_bottom_layer_1.x += 10;
//             vagon_top_layer_1.x += 10;
//         }
//         if (vagon_bottom_layer_1.y > 0) {
//             vagon_bottom_layer_1.y -= 5;
//             vagon_top_layer_1.y -= 5;
//         }
//     }
//     else {
//         if (vagon_bottom_layer_2.x == 0 && vagon_bottom_layer_2.y == 0) {
//             newSupermanIsComing = false;
//         }
//         if (vagon_bottom_layer_2.x < 0) {
//             vagon_bottom_layer_2.x += 10;
//             vagon_top_layer_2.x += 10;
//         }
//         if (vagon_bottom_layer_2.y > 0) {
//             vagon_bottom_layer_2.y -= 5;
//             vagon_top_layer_2.y -= 5;
//         }
//     }
// }

function supermanLeaves() {
    // // spritelari idle pozisyona gecir
    // for (let n = 0; n < activeBlock.createdSpriteCount; n++) {
    //     // setTimeout(supermanLeaves, 2000);
    //     let time = random(66, 1666)
    //     setTimeout(() => {
    //         setMoveCondition(activeBlock.sprites[n]);
    //     }, time);
    // }

    if (vagonHalfWayThrough()) {
        if (blockQueue.length > 1) {
            newSupermanIsComing = true;
        }
    }

    if (vagonLeftScreen()) {
        if (activeContainerSwitch) {
            for (let n = 0; n < leavingBlock.createdSpriteCount; n++) {
                sprite_container_1.removeChild(leavingBlock.sprites[n].sprite)
            }
            sprite_container_1.x = 0;
            sprite_container_1.y = 0;
            vagon_bottom_layer_1.x = vagon_container_init_x;
            vagon_top_layer_1.x = vagon_container_init_x;
            vagon_bottom_layer_1.y = vagon_container_init_y;
            vagon_top_layer_1.y = vagon_container_init_y;
            vagon1_step_out = 0
        }
        else {
            for (let n = 0; n < leavingBlock.createdSpriteCount; n++) {
                sprite_container_2.removeChild(leavingBlock.sprites[n].sprite)
            }
            sprite_container_2.x = 0;
            sprite_container_2.y = 0;
            vagon_bottom_layer_2.x = vagon_container_init_x;
            vagon_top_layer_2.x = vagon_container_init_x;
            vagon_bottom_layer_2.y = vagon_container_init_y;
            vagon_top_layer_2.y = vagon_container_init_y;
            vagon2_step_out = 0
        }
        leavingBlock.isAllSpritesInsideVagon = false;
        leavingBlock.destroy();
        // if (blockQueue.isEmpty) {
        //     activeBlock = new Block(empty_block)
        // }
        // else {
        //     activeBlock = blockQueue.peek()
        // }
        activeBlock = blockQueue.peek()
        if (activeBlock != null || activeBlock != undefined) {
            update_cat_counter()
            print_new_block_info()
        }

    }
    else {
        // burda switchler degisti tam tersi 
        // eski vagonu kontrol etmek icin...
        // true for 1 //  false for 2
        if (activeContainerSwitch) {
            // console.log(vagon_bottom_layer_1.x)
            for (let k = 0; k < outPathSpeeder; k++) {
                if (vagon1_step_out < supermanOutPath.length) {
                    vagon_bottom_layer_1.x += supermanOutPath[vagon1_step_out][0]
                    vagon_bottom_layer_1.y += supermanOutPath[vagon1_step_out][1]
                    vagon_top_layer_1.x += supermanOutPath[vagon1_step_out][0]
                    vagon_top_layer_1.y += supermanOutPath[vagon1_step_out][1]
                    sprite_container_1.x += supermanOutPath[vagon1_step_out][0]
                    sprite_container_1.y += supermanOutPath[vagon1_step_out][1]
                    vagon1_step_out++;
                }
                else {
                    vagon_bottom_layer_1.x += 3
                    vagon_bottom_layer_1.y += 3
                    vagon_top_layer_1.x += 3
                    vagon_top_layer_1.y += 3
                    sprite_container_1.x += 3
                    sprite_container_1.y += 3
                }
            }
            // vagon_bottom_layer_1.x += 10;
            // vagon_top_layer_1.x += 10;
            // sprite_container_1.x += 10;
        }
        else {
            for (let k = 0; k < outPathSpeeder; k++) {
                if (vagon2_step_out < supermanOutPath.length) {
                    vagon_bottom_layer_2.x += supermanOutPath[vagon2_step_out][0]
                    vagon_bottom_layer_2.y += supermanOutPath[vagon2_step_out][1]
                    vagon_top_layer_2.x += supermanOutPath[vagon2_step_out][0]
                    vagon_top_layer_2.y += supermanOutPath[vagon2_step_out][1]
                    sprite_container_2.x += supermanOutPath[vagon2_step_out][0]
                    sprite_container_2.y += supermanOutPath[vagon2_step_out][1]
                    vagon2_step_out++;
                }
                else {
                    vagon_bottom_layer_2.x += 3
                    vagon_bottom_layer_2.y += 3
                    vagon_top_layer_2.x += 3
                    vagon_top_layer_2.y += 3
                    sprite_container_2.x += 3
                    sprite_container_2.y += 3
                }
            }
            // vagon_bottom_layer_2.x += 10;
            // vagon_top_layer_2.x += 10;
            // sprite_container_2.x += 10;
        }
    }

}
function vagonLeftScreen() {
    if (activeContainerSwitch) {
        return vagon_bottom_layer_1.x > 1400
    }
    else {
        return vagon_bottom_layer_2.x > 1400
    }
}

function vagonHalfWayThrough() {
    if (activeContainerSwitch) {
        return vagon_bottom_layer_1.x > 1000
    }
    else {
        return vagon_bottom_layer_2.x > 1000
    }
}

// function setMoveCondition(sprt) {
//     sprt.hasToMove = false
// }
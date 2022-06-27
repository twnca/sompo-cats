let titles_text = "Tx Hash" + "\n" + "From" + "\n" + "To" + "\n" + "Gas Limit" + "\n" + "Max Gas Price" + "\n" + "Nonce" + "\n" + "Type" + "\n" + "Ethers Sent" + "\n" + "Block Number" + "\n" + "Block Hash";
let url = "https://etherscan.io/tx/"

// {
//     "hash": "0x61d03b618e2f3d87f8e4ef203f67d7cd390dbe0820d388d66260bcbeee7bce61",

//     "from": "0x9A128abF717207e6eD8B04e3a79cCD6A10EFA093",
//     "to": "0x34cC1c863f1d131637BEa58472580cf8480d3F37",

//     "gas": 21000,
//     "gasPrice": "18000000000", //max gas price 0.000000009579026194 Ether (9.579026194 Gwei)
//     "nonce": 266,
//     "type": 0,
//     "value": "126934327060666200"

//     "blockNumber": 14738551,
//     "blockHash": "0x8dfe97b457087d59510da06e8e5a3074f89d8e27f3dc3859d984822d1bf15f4a",
// }

class PopUp {
    constructor(txDetails) {
        this.its_container = new PIXI.Container();
        pop_up_container.addChild(this.its_container);

        popUpAnimation_running = true
        animatingPopUpList.push(this)
        this.pop_width = 10
        this.x = txPopUp_x
        this.y = txPopUp_y

        this.pop_up_graphics = new PIXI.Graphics();
        this.its_container.addChild(this.pop_up_graphics);
        this.pop_up_graphics.beginFill(0x3a3a3a);
        this.pop_up_graphics.lineStyle(4, 0x0, .3);
        this.pop_up_graphics.drawRoundedRect(
            this.x,
            this.y,
            this.pop_width,
            500,
            30
        );
        this.pop_up_graphics.endFill();

        // sonraki popup in biraz daha asagida acilmasi icin duzenleme
        // if (txPopUp_y > 100 + pop_up_kaydirma) {
        //     txPopUp_x = roof.R.x - 280
        //     // var txPopUp_y = roof.L.y
        //     txPopUp_y = 100
        // }
        // txPopUp_y += 65
        // txPopUp_x += 115


        //transaction details
        this.link = url + txDetails.hash

        let maxGas = blockExplorer.web3.utils.fromWei(txDetails.gasPrice, 'gwei')
        if (maxGas.length > 14) {
            maxGas = maxGas.substring(0, 13) + "..";
        }

        let ethSent = blockExplorer.web3.utils.fromWei(txDetails.value, 'ether')
        if (ethSent.length > 14) {
            ethSent = ethSent.substring(0, 13) + "..";
        }
        this.text = hash_tiny(txDetails.hash) + "\n" + hash_tiny(txDetails.from) + "\n" + hash_tiny(txDetails.to) + "\n" + txDetails.gas + "\n" + maxGas + "\n" + txDetails.nonce + "\n" + txDetails.type + "\n" + ethSent + "\n" + txDetails.blockNumber + "\n" + hash_tiny(txDetails.blockHash)
    }

    animate() {
        this.its_container.removeChild(this.pop_up_graphics);

        this.pop_width += 20
        this.pop_up_graphics = new PIXI.Graphics();
        this.its_container.addChild(this.pop_up_graphics);
        this.pop_up_graphics.beginFill(0x3a3a3a);
        this.pop_up_graphics.lineStyle(4, 0x0, .3);
        this.pop_up_graphics.drawRoundedRect(
            this.x,
            this.y,
            this.pop_width,
            196,
            30
        );
        this.pop_up_graphics.endFill();


        if (this.pop_width >= 380) {
            if (animatingPopUpList.length <= 1) {
                popUpAnimation_running = false
            }
            animatingPopUpList = arrayRemove(animatingPopUpList, this)
            this.create_content()
        }
    }

    create_content() {
        this.closeButton = new PIXI.Sprite(environmentItems.close_button);
        this.closeButton.interactive = true;
        this.closeButton.parent_ = this;
        this.closeButton.on('click', function () {
            pop_up_container.removeChild(this.parent_.its_container);
        });
        this.closeButton.x = this.x + 335;
        this.closeButton.y = this.y + 15;
        this.its_container.addChild(this.closeButton);



        let m = this.text
        let u = this.link
        // LEFT SECTION - TITLES
        const style = new PIXI.TextStyle({
            fill: "#ffd9a3",
            fontFamily: "Verdana",
            fontSize: 15,
            lineJoin: "round",

        });
        const titles = new PIXI.Text(titles_text, style);

        titles.x = this.x + 20;
        titles.y = this.y + 15;
        this.its_container.addChild(titles);



        // RIGHT SECTION - DETAILS
        const details = new PIXI.Text(m, style);
        details.interactive = true;
        details.on('click', function () {
            window.open(u, "_blank");
        });
        details.x = this.x + 180;
        details.y = this.y + 15;
        this.its_container.addChild(details);



    }
}
// - - - - - - - -
// - - -  I N I T
// - - - - - - - -
var render_w = 1600;
var render_h = 2900;
var canvas_w, canvas_h;
var blockQueue = new Queue();
// var emptyPlaceHolderBlock;
// var empty_block = { number: 0, transactions: [] }

var ses = new Audio();
var ses_path = './assets/sfx/Sompo_Mixdown_rev2/';
var ses_files = ["Sompo_06.00-11.00.mp3", "Sompo_11.00-14.00.mp3", "Sompo_14.00-17.00.mp3", "Sompo_17.00-19.00.mp3", "Sompo_19.00-23.00.mp3", "Sompo_23.00-06.00.mp3"]
var selected_audio = 5

var app;
var sprite_container_1;
var sprite_container_2;
var activeContainerSwitch = false; // false for 1 //  true for 2
var newSupermanIsComing = false;
var bgLayer;
var vagon_bottom_layer_1;
var vagon_bottom_layer_2;
var vagon_top_layer_1;
var vagon_top_layer_2;

// var vagon_container_init_x = -1000
// var vagon_container_init_y = 500
var vagon_container_init_x = -991
var vagon_container_init_y = 488
var inPathSpeeder = 5
var outPathSpeeder = 5
var supermanInPath = [[3, 0], [5, -1], [5, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [5, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [4, -1], [5, -1], [4, -1], [5, -1], [5, -1], [4, -1], [5, -1], [5, -1], [4, -1], [5, -1], [4, -1], [5, -1], [4, -1], [5, -1], [4, -1], [5, -1], [4, -1], [5, -1], [4, -1], [5, -1], [4, -1], [5, -1], [4, -1], [5, -1], [4, -1], [4, -1], [5, -1], [4, -1], [5, -1], [4, -1], [4, -1], [5, -1], [4, -1], [4, -1], [5, -1], [4, -1], [4, -1], [5, -1], [4, -1], [4, -1], [4, -1], [4, -1], [4, -1], [5, -1], [4, -1], [4, -1], [4, -1], [4, -1], [4, -1], [4, -1], [4, -1], [4, -1], [4, -1], [4, -1], [4, -1], [4, -1], [3, -1], [4, -1], [4, -1], [4, -1], [4, -1], [4, -1], [3, -1], [4, -1], [4, -1], [3, -1], [4, -1], [4, -1], [3, -1], [4, -1], [3, -1], [4, -1], [3, -1], [4, -1], [3, -1], [3, -1], [4, -1], [3, -1], [3, -1], [3, -1], [3, -1], [4, -1], [3, -1], [3, -1], [3, -1], [3, -1], [3, -1], [3, -1], [3, -1], [3, -1], [3, -1], [3, -1], [2, -1], [3, -1], [3, -1], [2, -1], [3, -1], [3, -1], [2, -1], [3, -1], [2, -1], [3, -1], [2, -1], [2, -1], [3, -1], [2, -1], [3, -1], [2, -1], [2, -1], [2, -1], [2, -1], [2, -1], [2, -1], [2, -1], [2, -1], [2, -1], [2, -1], [2, -1], [2, -1], [2, -1], [2, -1], [1, -1], [2, -1], [2, -1], [2, -1], [1, -1], [2, -1], [2, -1], [1, -1], [2, -1], [1, -1], [1, -1], [2, -1], [1, -1], [2, -1], [1, -1], [2, -1], [1, -1], [1, -1], [1, -1], [2, -1], [1, -1], [1, -1], [1, -1], [1, -1], [1, -1], [2, -1], [1, -1], [1, -1], [1, -1], [1, -1], [1, -1], [1, -1], [1, -1], [1, -1], [1, -1], [1, -1], [1, -2], [1, -1], [1, -1], [1, -1], [1, -1], [1, -2], [1, -1], [1, -1], [1, -1], [1, -2], [1, -1], [1, -1], [1, -2], [1, -1], [1, -2], [1, -2], [1, -1], [1, -2], [1, -1], [1, -2], [1, -2], [1, -1], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -1], [1, -3], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -3], [1, -2], [1, -2], [1, -2], [1, -3], [1, -2], [1, -2], [1, -2], [1, -3], [1, -2], [1, -2], [1, -2], [1, -2], [1, -3], [1, -2], [1, -2], [1, -2], [1, -3], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -3], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -1], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -1], [1, -2], [1, -2], [1, -2], [1, -2], [1, -2], [1, -1], [1, -2], [1, -2], [1, -1], [1, -2], [1, -2], [1, -1], [1, -2], [1, -2], [1, -1], [1, -2], [1, -2], [1, -1], [1, -2], [1, -2], [1, -1], [1, -2], [1, -2], [1, -1], [1, -2], [1, -1], [1, -2], [1, -1], [1, -2], [1, -1], [1, -2], [1, -1], [1, -2], [1, -2], [1, -1], [1, -2], [1, -1], [1, -2], [1, -1], [1, -2], [1, -1], [1, -1], [1, -2], [1, -1], [1, -2], [1, -1], [1, -2], [1, -1], [1, -1], [1, -2], [1, -1], [1, -2], [1, -1], [1, -2], [1, -1], [1, -1], [1, -2], [1, -1], [1, -2], [1, -1]]
var supermanOutPath = [[0, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 3], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 2], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 2], [1, 1], [1, 2], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [1, 1], [2, 1], [1, 1], [1, 1], [2, 1], [1, 1], [2, 1], [1, 1], [1, 1], [2, 1], [1, 1], [2, 1], [1, 1], [1, 1], [2, 1], [1, 1], [2, 1], [1, 1], [1, 1], [2, 1], [1, 1], [2, 1], [1, 1], [1, 1], [2, 1], [1, 1], [2, 1], [1, 1], [1, 1], [2, 1], [1, 1], [2, 1], [1, 1], [2, 1], [2, 1], [1, 1], [2, 1], [2, 1], [1, 1], [2, 1], [2, 1], [1, 1], [2, 1], [2, 1], [1, 1], [2, 1], [1, 1], [2, 1], [2, 1], [1, 1], [2, 1], [2, 1], [1, 1], [2, 1], [2, 1], [1, 1], [2, 1], [2, 1], [1, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [1, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [2, 1], [3, 1], [2, 1], [2, 1], [2, 1], [3, 1], [2, 1], [2, 1], [2, 1], [2, 1], [3, 1], [2, 1], [3, 1], [2, 1], [2, 1], [3, 1], [2, 1], [3, 1], [2, 1], [3, 1], [2, 1], [2, 1], [3, 1], [3, 1], [2, 1], [3, 1], [3, 1], [2, 1], [3, 1], [3, 1], [2, 1], [3, 1], [3, 1], [3, 1], [3, 1], [2, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [4, 1], [3, 1], [3, 1], [3, 1], [3, 1], [4, 1], [3, 1], [4, 1], [3, 1], [4, 1], [3, 1], [4, 1], [3, 1], [4, 1], [3, 1], [4, 1], [4, 1], [4, 1], [4, 1], [4, 1], [3, 1], [4, 1], [4, 1], [4, 1], [4, 1], [5, 1], [4, 1], [4, 1], [4, 1], [4, 1], [4, 1], [5, 1], [4, 1], [5, 1], [5, 1], [4, 1], [5, 1], [4, 1], [5, 1], [5, 1], [5, 1], [5, 1], [5, 1], [5, 1], [5, 1], [5, 1], [5, 1], [6, 1], [5, 1], [6, 1], [5, 1], [6, 1], [5, 1], [6, 1], [6, 1], [6, 1], [6, 1], [5, 1], [6, 1], [6, 1], [7, 1], [6, 1], [7, 1], [6, 1], [7, 1], [6, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [8, 1], [7, 1], [8, 1], [8, 1], [7, 1], [8, 1], [8, 1], [8, 1], [8, 1], [9, 1], [8, 1], [8, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 1], [10, 1], [9, 1], [10, 1], [9, 1], [10, 1], [11, 1], [10, 1], [10, 1], [10, 1], [11, 1], [11, 1], [11, 1], [11, 1], [11, 1], [8, 1]]


var vagon1_step = 0
var vagon2_step = 0
var vagon1_step_out = 0
var vagon2_step_out = 0

var pop_up_container;
var pop_up_kaydirma = 40
var popUpAnimation_running = false;
var animatingPopUpList = [];

var portalLayer;
var portal;
var portalImagesCount = 88;
var portalSheet = [];
var adsImagesCount = 102;
var billboard;
var billboardSheet = [];

var infoCerceveLayer;

var blockInfoLayer;
let blockInfo_titles = "Block No" + "\n" + "Transactions" + "\n" + "Size" + "\n" + "Difficulty" + "\n" + "Gas Used" + "\n" + "Timestamp" + "\n" + "Hash";
let etherscan_block_url = "https://etherscan.io/block/"

var isWaiting;
var catCounterLayer;
var spriteSheet = {};
var environmentItems = {};
var activeBlock;
var leavingBlock = { isAllSpritesInsideVagon: false };

var roof = {
    back_L: { x: 290, y: 257 },
    back_R: { x: 809, y: 257 },
    L: { x: 329, y: 305 },
    R: { x: 916, y: 305 },
    sol_egim: 0,
    on_egim: 0,
}
// var roof = {
//     back_L: { x: 50, y: -200 },
//     back_R: { x: 1000, y: 50 },
//     L: { x: 250, y: 200 },
//     R: { x: 1000, y: 50 },
//     sol_egim: 0,
//     on_egim: 0,
// }
var bina = {
    kat: 24,
    kat_h: 10
}
var vagonArea = {
    back_L: { x: 0, y: 0 },
    L: { x: 0, y: 0 },
    R: { x: 0, y: 0 },
    back_R: { x: 0, y: 0 },
    sol_egim: 0,
    on_egim: 0,
}

var txPopUp_x = 1100
// var txPopUp_y = roof.L.y
var txPopUp_y = 600


var jumpPath = [[1, 1], [2, 1], [2, 1],
[2, 2], [2, 2], [3, 2], [2, 2], [2, 2],
[2, 1], [2, 1], [2, 1], [2, 1], [1, 1],
[2, 1], [2, 1], [2, 1], [2, 1], [1, 1],
[2, 1], [2, 1], [1, 1], [1, 1], [2, 1],
[1, 1], [1, 1], [1, 1], [1, 2], [1, 2],
[1, 3], [1, 2], [1, 3], [1, 3], [1, 3],
[1, 4], [1, 3], [1, 4], [1, 4], [1, 4],
[1, 5], [1, 5], [1, 5], [1, 4], [1, 3]]
// var jumpPath = [[1, 1]]

window.onload = function () {
    var today = new Date();
    var time = today.getHours()

    var ses_files = ["Sompo_06.00-11.00.mp3", "Sompo_11.00-14.00.mp3", "Sompo_14.00-17.00.mp3", "Sompo_17.00-19.00.mp3", "Sompo_19.00-23.00.mp3", "Sompo_23.00-06.00.mp3"]
    if (time >= 6 && time < 11) {
        selected_audio = 0
    }
    else if (time >= 11 && time < 14) {
        selected_audio = 1
    }
    else if (time >= 14 && time < 17) {
        selected_audio = 2
    }
    else if (time >= 17 && time < 19) {
        selected_audio = 3
    }
    else if (time >= 19 && time < 23) {
        selected_audio = 4
    }
    ses.src = ses_path + ses_files[selected_audio]
    ses.preload;


    app = new PIXI.Application(
        {
            width: render_w,
            height: render_h,
            backgroundColor: 0x000000,
            antialias: true,
        }
    );
    app.renderer.view.style.position = 'absolute';
    document.body.appendChild(app.view);

    bgLayer = new PIXI.Container();
    app.stage.addChild(bgLayer);

    infoCerceveLayer = new PIXI.Container();
    app.stage.addChild(infoCerceveLayer);

    blockInfoLayer = new PIXI.Container();
    app.stage.addChild(blockInfoLayer);

    catCounterLayer = new PIXI.Container();
    app.stage.addChild(catCounterLayer);

    portalLayer = new PIXI.Container();
    app.stage.addChild(portalLayer);

    vagon_bottom_layer_1 = new PIXI.Container();
    app.stage.addChild(vagon_bottom_layer_1);

    vagon_bottom_layer_2 = new PIXI.Container();
    app.stage.addChild(vagon_bottom_layer_2);

    sprite_container_1 = new PIXI.Container();
    app.stage.addChild(sprite_container_1);

    sprite_container_2 = new PIXI.Container();
    app.stage.addChild(sprite_container_2);



    vagon_top_layer_1 = new PIXI.Container();
    app.stage.addChild(vagon_top_layer_1);
    vagon_top_layer_2 = new PIXI.Container();
    app.stage.addChild(vagon_top_layer_2);

    pop_up_container = new PIXI.Container();
    app.stage.addChild(pop_up_container);

    startup_container = new PIXI.Container();
    app.stage.addChild(startup_container);

    vagon_bottom_layer_1.x = vagon_container_init_x;
    vagon_top_layer_1.x = vagon_container_init_x;
    vagon_bottom_layer_2.x = vagon_container_init_x;
    vagon_top_layer_2.x = vagon_container_init_x;

    vagon_bottom_layer_1.y = vagon_container_init_y;
    vagon_top_layer_1.y = vagon_container_init_y;
    vagon_bottom_layer_2.y = vagon_container_init_y;
    vagon_top_layer_2.y = vagon_container_init_y;

    resize();
    window.addEventListener('resize', resize);

    app.loader.add('Desyrel', 'assets/bitmap-font/desyrel.xml')

    let spritename;
    let filename;
    for (let i = 1; i < 34; i++) {
        filename = "assets/images/cats/(" + i + ").png"
        spritename = "cat" + i
        app.loader.add(spritename, filename)
    }

    let portal_spriteName;
    let portal_fileName;
    for (let i = 1; i < portalImagesCount; i++) {
        portal_fileName = "assets/images/portal/final/(" + i + ").png"
        portal_spriteName = "portal" + i
        app.loader.add(portal_spriteName, portal_fileName)
    }

    let ads_spriteName;
    let ads_fileName;
    for (let i = 1; i < adsImagesCount; i++) {
        ads_fileName = "assets/images/billboards/final/(" + i + ").jpg"
        ads_spriteName = "ads" + i
        app.loader.add(ads_spriteName, ads_fileName)
    }
    app.loader.load(init);
}

function tapOnWindow() {
    window.removeEventListener("click", tapOnWindow);

    ses.play();
    ses.addEventListener('ended', (event) => {
        ses.play();
    });

    remove_clickToContinue_page();

    fetch_data();
    app.ticker.add(gameLoop);
}

function init() {
    setEnvironmentImages();
    drawBuilding();
    drawPortalAndBillboard();
    drawVagon();
    createSpriteTextures();

    clickToContinue_page();
}

// - - - - - - - - - - - - - - - - - -
// - - -  A N I M A T I O N   L O O P
// - - - - - - - - - - - - - - - - - -
function gameLoop() {
    if (blockQueue.length != 0) {
        SpriteTrafficController();
        moveSprites();
        popUpAnimation();
    }
    else {
        if (!isWaiting) {
            update_cat_counter()
        }
        // console.log("WAITING NEW TRANSACTIONS")
    }
}



// - - - - - - - - - - - - - - - - - - - - - -
// - - -  S E T T T I N G    T H I N G S   U P
// - - - - - - - - - - - - - - - - - - - - - -

function clickToContinue_page() {

    let startup = new PIXI.Graphics();
    var transparency_filter = new PIXI.filters.AlphaFilter(0.8);
    startup.beginFill(0x000000);
    startup.drawRect(0, 0, render_w, render_h);
    startup.endFill();
    startup.filters = [transparency_filter];
    startup_container.addChild(startup);


    let pressAnyKey = new PIXI.Graphics();
    let _w = 400
    let _y_pos = window.innerHeight / 3;
    pressAnyKey.beginFill(0x090909);
    pressAnyKey.lineStyle(4, 0x3a3a3a, .3);
    pressAnyKey.drawRoundedRect((render_w / 2) - (_w / 2), _y_pos, _w, 200, 30);
    pressAnyKey.endFill();
    startup_container.addChild(pressAnyKey);

    let start_titles = new PIXI.BitmapText("Tap to start", {
        fontName: "Desyrel",
        fontSize: 29,
        align: "left"
    });
    start_titles.x = (render_w / 2) - 65;
    start_titles.y = _y_pos + 80;
    startup_container.addChild(start_titles);



    window.addEventListener("click", tapOnWindow);

}

function remove_clickToContinue_page() {
    startup_container.removeChildren();
}

function drawBuilding() {
    roof.sol_egim = (roof.L.y - roof.back_L.y) / (roof.L.x - roof.back_L.x);
    roof.on_egim = (roof.R.y - roof.L.y) / (roof.R.x - roof.L.x);
    let a = new PIXI.Sprite(environmentItems.bg);
    bgLayer.addChild(a);

    // DRAW BILLBOARD FRAME SHADOW
    // let x = 1060;
    // let y = 320;
    // let shadow = new PIXI.Sprite(environmentItems.ads_frame_shadow);
    // shadow.scale = new PIXI.Point(0.4, 0.4);
    // shadow.x = x;
    // shadow.y = y;
    // bgLayer.addChild(shadow);


}

function drawVagon() {
    let vagon_left_y = roof.L.y + 35;
    let vagon_left_x = roof.L.x + 95;
    let vagon_right_y = roof.R.y + 10;
    let vagon_right_x = roof.R.x + 20;


    for (let i = 0; i < jumpPath.length; i++) {
        vagon_left_y += jumpPath[i][1];
        vagon_right_y += jumpPath[i][1];
    }
    vagonArea.L.y = vagon_left_y
    vagonArea.L.x = vagon_left_x
    vagonArea.back_L.y = vagon_left_y - 40
    vagonArea.back_L.x = vagonArea.L.x - ((vagonArea.L.y - vagonArea.back_L.y) / roof.sol_egim) - 40

    vagonArea.R.y = vagon_right_y + 10
    vagonArea.R.x = vagon_right_x + 20
    vagonArea.back_R.y = vagon_right_y - 35
    vagonArea.back_R.x = vagonArea.R.x - ((vagonArea.R.y - vagonArea.back_R.y) / roof.sol_egim) - 60



    // SUPERMAN CONTAINER 1
    let a = new PIXI.Sprite(environmentItems.superman);
    a.scale = new PIXI.Point(1.2, 1.1);
    a.x = vagonArea.back_L.x - 12;
    a.y = vagonArea.back_L.y - 10;
    vagon_bottom_layer_1.addChild(a);

    // SUPERMAN CONTAINER 2
    let b = new PIXI.Sprite(environmentItems.superman);
    b.scale = new PIXI.Point(1.2, 1.1);
    b.x = vagonArea.back_L.x - 12;
    b.y = vagonArea.back_L.y - 10;
    vagon_bottom_layer_2.addChild(b);



    // console.log(vagonArea)
    // vagon_bottom_graphics_1 = new PIXI.Graphics();
    // vagon_bottom_layer_1.addChild(vagon_bottom_graphics_1);

    // vagon_bottom_graphics_1.lineStyle(2, 0x00F000).moveTo(vagonArea.back_L.x, vagonArea.back_L.y).lineTo(vagonArea.L.x, vagonArea.L.y) // sol
    // vagon_bottom_graphics_1.moveTo(vagonArea.back_R.x, vagonArea.back_R.y).lineTo(vagonArea.R.x, vagonArea.R.y) // sag

    // vagon_bottom_graphics_1.moveTo(vagonArea.L.x, vagonArea.L.y).lineTo(vagonArea.R.x, vagonArea.R.y) // on
    // vagon_bottom_graphics_1.moveTo(vagonArea.back_R.x, vagonArea.back_R.y).lineTo(vagonArea.back_L.x, vagonArea.back_L.y) // arka

    // vagon_top_graphics_1 = new PIXI.Graphics();
    // vagon_top_layer_1.addChild(vagon_top_graphics_1);
    // vagon_top_graphics_1.lineStyle(2, 0x000000).moveTo(vagonArea.L.x, vagonArea.L.y).lineTo(vagonArea.R.x, vagonArea.R.y) // sol
    // for (let i = 0; i < 20; i++) {
    //     vagon_top_graphics_1.moveTo(vagonArea.L.x, vagonArea.L.y - i).lineTo(vagonArea.R.x, vagonArea.R.y - i) // sol

    // }

    // console.log(vagonArea)
    // vagon_bottom_graphics_2 = new PIXI.Graphics();
    // vagon_bottom_layer_2.addChild(vagon_bottom_graphics_2);

    // vagon_bottom_graphics_2.lineStyle(2, 0x00F000).moveTo(vagonArea.back_L.x, vagonArea.back_L.y).lineTo(vagonArea.L.x, vagonArea.L.y) // sol
    // vagon_bottom_graphics_2.moveTo(vagonArea.back_R.x, vagonArea.back_R.y).lineTo(vagonArea.R.x, vagonArea.R.y) // sag

    // vagon_bottom_graphics_2.moveTo(vagonArea.L.x, vagonArea.L.y).lineTo(vagonArea.R.x, vagonArea.R.y) // on
    // vagon_bottom_graphics_2.moveTo(vagonArea.back_R.x, vagonArea.back_R.y).lineTo(vagonArea.back_L.x, vagonArea.back_L.y) // arka

    // vagon_top_graphics_2 = new PIXI.Graphics();
    // vagon_top_layer_2.addChild(vagon_top_graphics_2);
    // vagon_top_graphics_2.lineStyle(2, 0x000000).moveTo(vagonArea.L.x, vagonArea.L.y).lineTo(vagonArea.R.x, vagonArea.R.y) // sol
    // for (let i = 0; i < 20; i++) {
    //     vagon_top_graphics_2.moveTo(vagonArea.L.x, vagonArea.L.y - i).lineTo(vagonArea.R.x, vagonArea.R.y - i) // sol

    // }

}

function setEnvironmentImages() {
    environmentItems["close_button"] = new PIXI.Texture.from('assets/images/close.png');
    environmentItems["bg"] = new PIXI.Texture.from('assets/images/bg.png');
    environmentItems["superman"] = new PIXI.Texture.from('assets/images/super.png');
    environmentItems["ads_frame"] = new PIXI.Texture.from('assets/images/billboards/frame.png');
    environmentItems["frame_sari"] = new PIXI.Texture.from('assets/images/billboards/sari_frame.png');
    environmentItems["frame_mor"] = new PIXI.Texture.from('assets/images/billboards/mor_frame.png');
}

function drawPortalAndBillboard() {

    // PORTAL
    // PORTAL
    let p;
    let spritename;
    let sheet_temp;
    let w = 500;
    let h = 500;

    for (let i = 1; i < portalImagesCount; i++) {
        spritename = "portal" + i
        sheet_temp = new PIXI.BaseTexture.from(app.loader.resources[spritename].url);
        p = new PIXI.Texture(sheet_temp, new PIXI.Rectangle(0, 0, w, h));
        portalSheet.push(p)
    }

    portal = new PIXI.AnimatedSprite(portalSheet);
    // portal.anchor.set(0.5, 1);
    portal.scale = new PIXI.Point(0.3, 0.3);
    portal.animationSpeed = .3;
    portal.loop.true;
    portal.x = 260;
    portal.y = 120;

    portalLayer.addChild(portal);
    portal.play();



    // BILLBOARD
    // BILLBOARD

    let b;
    let b_spritename;
    let b_sheet_temp;
    let b_w = 960;
    let b_h = 540;
    let x = 1060;
    let y = 320;

    for (let i = 1; i < adsImagesCount; i++) {
        b_spritename = "ads" + i
        b_sheet_temp = new PIXI.BaseTexture.from(app.loader.resources[b_spritename].url);
        b = new PIXI.Texture(b_sheet_temp, new PIXI.Rectangle(0, 0, b_w, b_h));
        billboardSheet.push(b)
    }

    billboard = new PIXI.AnimatedSprite(billboardSheet);
    billboard.scale = new PIXI.Point(0.32, 0.25);
    billboard.animationSpeed = .4;
    billboard.loop.true;
    billboard.x = x + 15;
    billboard.y = y;

    portalLayer.addChild(billboard);
    billboard.play();


    // DRAW BILLBOARD FRAME
    let frame = new PIXI.Sprite(environmentItems.ads_frame);
    frame.scale = new PIXI.Point(0.4, 0.4);
    frame.x = x;
    frame.y = y;
    pop_up_container.addChild(frame);



    // block info cerceve ve arkaplani
    let blockInfoBG = new PIXI.Graphics();
    infoCerceveLayer.addChild(blockInfoBG);

    blockInfoBG.beginFill(0x3a3a3a);
    blockInfoBG.lineStyle(4, 0x000000, .3);

    blockInfoBG.drawRoundedRect(
        render_w - 500 - 80,
        15,
        370,
        160,
        30
    );
    blockInfoBG.endFill();

    let sari_cerceve = new PIXI.Sprite(environmentItems.frame_sari);
    sari_cerceve.scale = new PIXI.Point(0.49, 0.42);
    sari_cerceve.x = 999;
    sari_cerceve.y = 15;
    infoCerceveLayer.addChild(sari_cerceve);




    // cat saved cerceve ve arkaplani
    blockInfoBG.beginFill(0x3a3a3a);
    blockInfoBG.lineStyle(4, 0x000000, .3);
    blockInfoBG.drawRoundedRect(
        275,
        26,
        370,
        75,
        5
    );
    blockInfoBG.endFill();

    let mor_cerceve = new PIXI.Sprite(environmentItems.frame_mor);
    mor_cerceve.scale = new PIXI.Point(0.49, 0.23);
    mor_cerceve.x = 255;
    mor_cerceve.y = 25;
    infoCerceveLayer.addChild(mor_cerceve);

}

function createSpriteTextures() {

    let spritename;
    let sheet_temp;
    let w = 125;
    let h = w;

    for (let i = 1; i < 34; i++) {
        spritename = "cat" + i
        sheet_temp = new PIXI.BaseTexture.from(app.loader.resources[spritename].url);
        spriteSheet[spritename] = [
            new PIXI.Texture(sheet_temp, new PIXI.Rectangle(0 * w, 0, w, h)),
            new PIXI.Texture(sheet_temp, new PIXI.Rectangle(1 * w, 0, w, h)),
            new PIXI.Texture(sheet_temp, new PIXI.Rectangle(2 * w, 0, w, h)),
            new PIXI.Texture(sheet_temp, new PIXI.Rectangle(3 * w, 0, w, h)),
            new PIXI.Texture(sheet_temp, new PIXI.Rectangle(4 * w, 0, w, h)),
            new PIXI.Texture(sheet_temp, new PIXI.Rectangle(5 * w, 0, w, h)),
        ];
    }
}



// - - - - - - - - - - - - - - - - - - - -
// - - -  G L O B A L   F U N C T I O N S
// - - - - - - - - - - - - - - - - - - - -
function resize() {
    var canvasRatio = 2; ////canvas h / w

    canvas_w = document.body.clientWidth;
    canvas_h = canvas_w * canvasRatio;

    app.view.style.width = canvas_w + 'px';
    app.view.style.height = canvas_h + 'px';
    // app.renderer.resize(window.innerWidth, window.innerHeight);
}

function random(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}

function hash_tiny(hash) {
    if (hash != null) {

        let len = hash.length
        let tiny = hash.substring(0, 8) + " . . " + hash.substring(len - 4)
        return tiny
        //ilk 8 .. son 5
    }
}
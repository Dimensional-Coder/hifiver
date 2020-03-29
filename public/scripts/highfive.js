
import {Hand} from './hand.js';
import {HandBoard} from './handboard.js';

const CANVAS_REFRESH_INTERVAL = 30;
const SLAP_SHRINK_SCALE = 0.75;
const OTHER_HAND_SCALE = 0.6;
const SLAP_GROW_SCALE = SLAP_SHRINK_SCALE / OTHER_HAND_SCALE;
const HAND_SLAP_PROXIMITY = 50;

var easterEggEnabled = false;
var board = new HandBoard('PlayerName');
var rhandImg, lhandImg;

//Wait for resources to load.
var pageLoaded = false, lhandLoaded = false, rhandLoaded=false, soundLoaded = false;

window.onload = function(){
    pageLoaded = true;
    init();
}

rhandImg = new Image();
rhandImg.addEventListener('load', function(){
    rhandLoaded = true;
    init();
});
rhandImg.src = 'img/right-hand-no-bg.png';

lhandImg = new Image();
lhandImg.addEventListener('load', function(){
    lhandLoaded = true;
    init();
});
lhandImg.src = 'img/left-hand-no-bg.png';

var easterEggImg = new Image();
easterEggImg.src = 'img/solid snake.jpg';

let slapSound = new Audio('sfx/Slap-SoundMaster13-Trimmed.wav');
slapSound.addEventListener('canplaythrough', function(){
    soundLoaded = true;
    init();
})

//Initialize canvas and start render loop.
//Does nothing if one or more resources are not
//loaded yet.
function init() {
    if(!pageLoaded || !lhandLoaded || !rhandLoaded || !soundLoaded)
        return;

    document.addEventListener('mousemove', updatePlayerPos, false);
    document.addEventListener('mousedown', engageHighFive, false);
    document.addEventListener('mouseup', retractHighFive, false);
    let canvas = document.getElementById('fiveplane');
    canvas.addEventListener('contextmenu', event => event.preventDefault());

    setInterval(draw, CANVAS_REFRESH_INTERVAL);
}

function updatePlayerPos(e){
    board.playerHand.updateState(e.clientX, e.clientY, board.playerHand.isSlapping);
}

function engageHighFive(e){
    board.playerHand.updateState(e.clientX, e.clientY, true);

    if(checkHandIntersection()){
        slapSound.pause();
        slapSound.currentTime = 0;
        slapSound.play();
    }
}

function retractHighFive(e){
    board.playerHand.updateState(e.clientX, e.clientY, false);
}

/**
 * Draw the current state of the hand board.
 */
function draw() {
    var canvas = document.getElementById('fiveplane');
    
    //resize canvas element to window size
    let borderSize = 2;
    canvas.width  = window.innerWidth - borderSize;
    canvas.height = window.innerHeight - borderSize;

    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawHands(ctx);

    if(easterEggEnabled)
        ctx.drawImage(easterEggImg, 100, 100, 500, 500);
}

function drawHands(ctx){
    for(let otherPlayer of board.otherHands.keys()){
        let hand = board.otherHands.get(otherPlayer);

        drawHand(ctx, hand, false);
    }

    let playerHand = board.playerHand;

    drawHand(ctx, playerHand, true);
}

function drawHand(ctx, hand, isPlayer){
    let {relX, relY} = getMousePos(ctx.canvas, hand.curX, hand.curY);
    let img = rhandImg;

    let w = img.width, h = img.height;

    //Image scale, used for slapping and other hands
    let dw = w, dh = h;
    let slapScale = SLAP_SHRINK_SCALE;

    if(!isPlayer){
        img = lhandImg;
        slapScale = SLAP_GROW_SCALE;
        dw = w*OTHER_HAND_SCALE;
        dh = h*OTHER_HAND_SCALE;
    }
    
    //Scale image if "slapping"
    if(hand.isSlapping){
        dw = dw*slapScale;
        dh = dh*slapScale;
    }

    //position to draw image at
    let x = relX - (dw/2+1), y = relY - (dh/2+1);

    ctx.drawImage(img, x, y, dw, dh);
}

/**
 * See if hand is intersecting with any other hands.
 * Used to determine if a SLAP sound is necessary.
 */
function checkHandIntersection(){

    let pHand = board.playerHand;

    if(!pHand.isSlapping)
        return false;
    
    for(let otherPlayer of board.otherHands.keys()){
        let hand = board.otherHands.get(otherPlayer);
        if(!hand.isSlapping){
            continue;
        }

        let dist = Math.sqrt(Math.pow(pHand.curX-hand.curX, 2) + Math.pow(pHand.curY-hand.curY, 2));
        console.log(`${pHand.id} dist from ${hand.id}: ${dist}`);
        if(dist < HAND_SLAP_PROXIMITY)
            return true;
    }

    return false;
}

// Helper to get mouse pos in canvas space.
// https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
function getMousePos(canvas, absX, absY) {
    var rect = canvas.getBoundingClientRect();
    return {
        relX: absX - rect.left,
        relY: absY - rect.top
    };
}

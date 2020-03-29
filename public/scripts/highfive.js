
import {Hand} from './hand.js';
import {HandBoard} from './handboard.js';

var CANVAS_REFRESH_INTERVAL = 30;
var SLAP_SHRINK_SCALE = 0.75;
var board = new HandBoard();
var handImg;

handImg = new Image();
handImg.addEventListener('load', init);
handImg.src = 'img/right-hand-no-bg.png';

function init() {
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);
    let canvas = document.getElementById('fiveplane');
    canvas.addEventListener('contextmenu', event => event.preventDefault());

    setInterval(draw, CANVAS_REFRESH_INTERVAL);
}

function onMouseMove(e){
    board.updateState(e.clientX, e.clientY, board.playerHand.isSlapping);
}

function onMouseDown(e){
    board.updateState(e.clientX, e.clientY, true);
}

function onMouseUp(e){
    board.updateState(e.clientX, e.clientY, false);
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

    //Draw a circle at current hand position
    let playerHand = board.playerHand;
    let {relX, relY} = getMousePos(canvas, playerHand.curX, playerHand.curY);

    let w = handImg.width, h = handImg.height;

    //position to draw image at
    let x = relX - (w/2+1), y = relY - (h/2+1);

    ctx.clearRect(x, y, w, h);

    //Scale image down slightly if "slapping"
    let dw = w, dh = h;
    if(board.playerHand.isSlapping){
        dw = w*SLAP_SHRINK_SCALE;
        dh = h*SLAP_SHRINK_SCALE;

        x = relX - (dw/2+1);
        y = relY - (dh/2+1);
    }

    ctx.drawImage(handImg, x, y, dw, dh);

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

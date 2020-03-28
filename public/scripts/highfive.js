
import {Hand} from './hand.js';
import {HandBoard} from './handboard.js';

var CANVAS_REFRESH_INTERVAL = 30;
var board = new HandBoard();

window.onload = init;

function init() {
    document.addEventListener('mousemove', onMouseUpdate, false);
    setInterval(draw, CANVAS_REFRESH_INTERVAL);
}

function onMouseUpdate(e){
    board.updateState(e.clientX, e.clientY);
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

    ctx.clearRect(relX-30, relX-30, 60, 60);
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.beginPath();
    ctx.arc(relX, relY, 50, 0, Math.PI * 2);
    ctx.fill();

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

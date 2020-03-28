
import {myvalue} from './modtest.js';

window.onload = init;

var hourglassPath;
var phallusPath;

function init() {
    console.log('Hello world!');
    console.log(myvalue);
    console.log(myvalue2);
    initPaths();

    draw();
}

function initPaths(){
    let hg = new Path2D();
    hg.moveTo(100, 10);
    hg.lineTo(150, 10);
    hg.lineTo(100, 110);
    hg.lineTo(150, 110);
    
    let phal = new Path2D();
    let topY = 40;
    let botY = 80;
    let endX = 250;

    phal.moveTo(125, topY);
    phal.lineTo(endX, topY);
    phal.lineTo(endX + 5, 60);
    phal.lineTo(endX, botY);
    phal.lineTo(125, botY);

    hourglassPath = hg;
    phallusPath = phal;
}

function draw() {
    var canvas = document.getElementById('fiveplane');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

    ctx.clearRect(20,20,10,10);

    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(180,180);
    ctx.lineTo(150, 180);
    ctx.lineTo(180, 150);
    ctx.lineTo(180,180);
    ctx.lineTo(150, 180);
    ctx.lineTo(150, 150);
    ctx.closePath();
    ctx.fillStyle = 'rgb(200, 0, 200)';
    ctx.fill();

    ctx.fill(hourglassPath);
    ctx.fill(phallusPath);
}

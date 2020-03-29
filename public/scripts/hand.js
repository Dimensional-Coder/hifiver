
/**
 * Class to represent the state of a hand on the screen.
 */
export class Hand{

    id = 1;
    isFlipped = false;
    curX = 5;
    curY = 0;
    isSlapping = false;

    constructor(isFlipped = false){
        this.isFlipped = isFlipped;
    }

    updateState(x, y, slapping){
        this.curX = x;
        this.curY = y;
        this.isSlapping = slapping;
    }

}
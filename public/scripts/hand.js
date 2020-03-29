
/**
 * Class to represent the state of a hand on the screen.
 */
export class Hand{

    id = null;
    curX = 0;
    curY = 0;
    isSlapping = false;

    constructor(name){
        this.id = name;
    }

    updateState(x, y, slapping){
        this.curX = x;
        this.curY = y;
        this.isSlapping = slapping;
    }

}

/**
 * Class to represent the state of a hand on the screen.
 */
export class Hand{

    isFlipped = false;
    curX = 5;
    curY = 0;

    constructor(isFlipped = false){
        this.isFlipped = isFlipped;
    }

}
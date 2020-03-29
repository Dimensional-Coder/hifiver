import { Hand } from "./hand.js";

/**
 * Track state of all hands on screen, including the 
 * current user's hand.
 */
export class HandBoard{

    otherHands = [];
    playerHand = null;

    constructor(){
        this.otherHands = [];
        this.playerHand = new Hand();
    }

    addHand(hand){
        this.otherHands.push(hand);
    }

    updateState(x, y, slapping){
        this.playerHand.updateState(x, y, slapping);

        //ignore other hands for now
    }
}
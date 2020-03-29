import { Hand } from "./hand.js";

/**
 * Track state of all hands on screen, including the 
 * current user's hand.
 */
export class HandBoard{

    otherHands = null;
    playerHand = null;

    constructor(playerName){
        this.otherHands = new Map();
        this.playerHand = new Hand(playerName);
    }

    /**
     * Add a new hand to the board. Expects it to have
     * an id. Will not add a duplicate hand.
     * 
     * @returns True if added, false if not added
     */
    addHand(hand){
        if(this.otherHands.has(hand.id)){
            return false;
        }

        this.otherHands.set(hand.id, hand);
        return true;
    }
}
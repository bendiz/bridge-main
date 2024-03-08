import { CardValue } from './types.js';
import { checkArrayEquality } from './utils.js';
export class Card {
    constructor(faceValue, suit) {
        this.faceValue = faceValue;
        this.suit = suit;
        this.numericValue = CardValue[this.faceValue];
    }
}
export class Deck {
    constructor() {
        this.suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
        this.cardFace = Object.keys(CardValue).filter((key) => isNaN(Number(key)));
        this.cards = [];
        // Creates a full deck of cards
        const fullDeck = this.suits.flatMap((suit) => {
            return this.cardFace.map((card) => {
                return [suit, card, CardValue[card]];
            });
        });
        this.cards.push(...fullDeck);
    }
    deal(players) {
        const numCardsEach = 13;
        players.forEach((player) => {
            const cards = this.cards.splice(0, numCardsEach);
            player.getCards(cards);
        });
    }
}
export class Player {
    constructor(name, roundWinner = false) {
        this.team = null;
        this.highCardPoints = 0;
        this.bidPoints = 0;
        this.name = name;
        this.hand = [];
        this.roundWinner = roundWinner;
        this.position = null;
    }
    assignTeam(team) {
        this.team = team;
    }
    getCards(cards) {
        this.hand = cards;
    }
    playCard(card) {
        let cardArray = [card.suit, card.faceValue, card.numericValue];
        let found = this.hand.find((c) => checkArrayEquality(c, cardArray));
        if (found)
            this.hand.splice(this.hand.indexOf(found), 1);
    }
}
export class Team {
    constructor(name) {
        this.members = [];
        this.score = 0;
        this.bidPoints = 0;
        this.name = name;
    }
    addPlayer(player) {
        this.members.push(player);
    }
    addScore() {
        this.score += 1;
    }
}
export class Robot extends Player {
    constructor() {
        super(`Robot ${Robot.count++}`);
    }
}
Robot.count = 1;

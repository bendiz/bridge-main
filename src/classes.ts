import { CardValue, Position } from './types.js';
import { checkArrayEquality } from './utils.js';

export class Card {
  faceValue: keyof typeof CardValue;
  suit: string;
  numericValue: number;

  constructor(faceValue: keyof typeof CardValue, suit: string) {
    this.faceValue = faceValue;
    this.suit = suit;
    this.numericValue = CardValue[this.faceValue];
  }
}

export class Deck {
  cards: Array<Array<string | CardValue>>;
  suits: string[] = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
  cardFace: (keyof typeof CardValue)[] = Object.keys(CardValue).filter((key) =>
    isNaN(Number(key))
  ) as (keyof typeof CardValue)[];

  constructor() {
    this.cards = [];

    // Creates a full deck of cards
    const fullDeck = this.suits.flatMap((suit) => {
      return this.cardFace.map((card) => {
        return [suit, card, CardValue[card as keyof typeof CardValue]];
      });
    });

    this.cards.push(...fullDeck);
  }

  deal(players: Player[]): void {
    const numCardsEach = 13;
    players.forEach((player) => {
      const cards = this.cards.splice(0, numCardsEach);
      player.getCards(cards);
    });
  }
}

export class Player {
  name: string;
  hand: Array<Array<string | CardValue>>;
  roundWinner: boolean;
  team: Team | null = null;
  position: Position | null;
  highCardPoints: number = 0;
  bidPoints: number = 0;

  constructor(name: string, roundWinner: boolean = false) {
    this.name = name;
    this.hand = [];
    this.roundWinner = roundWinner;
    this.position = null;
  }

  assignTeam(team: Team): void {
    this.team = team;
  }

  getCards(cards: Array<Array<string | CardValue>>): void {
    this.hand = cards;
  }

  playCard(card: Card): void {
    let cardArray = [card.suit, card.faceValue, card.numericValue];
    let found = this.hand.find((c) => checkArrayEquality(c, cardArray));
    if (found) this.hand.splice(this.hand.indexOf(found), 1);
  }
}

export class Team {
  name: string;
  members: Player[] = [];
  score: number = 0;
  bidPoints: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  addPlayer(player: Player): void {
    this.members.push(player);
  }

  addScore(): void {
    this.score += 1;
  }
}

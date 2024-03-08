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
  cardFace: (keyof typeof CardValue)[] = Object.keys(CardValue).filter((key) => isNaN(Number(key))) as (keyof typeof CardValue)[];

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

  // ROBOT LOGIC

  // countSuitCards(): Suit {
  //   const suitCounts: Record<Suit, number> = {
  //     Hearts: 0,
  //     Clubs: 0,
  //     Diamonds: 0,
  //     Spades: 0,
  //   };

  //   for (const card of this.hand) {
  //     suitCounts[card[0] as Suit]++;
  //   }

  //   let maxSuit: Suit = 'Hearts';
  //   let maxCount = 0;

  //   for (const suit in suitCounts) {
  //     if (suitCounts[suit as Suit] > maxCount) {
  //       maxCount = suitCounts[suit as Suit];
  //       maxSuit = suit as Suit;
  //     }
  //   }
  //   console.log(maxSuit);
  //   return maxSuit;
  // }

  // randomCard(game: BridgeGame): Card {
  //   let highCard = this.hand[0];
  //   let highestCard = this.hand[0];

  //   if (game.trick) {
  //     let previousCards = game.currentRoundCards;
  //     let highestValue = previousCards.reduce((prev, curr) => (prev.value > curr.value ? prev : curr));

  //     let trickSuit = game.trick;

  //     let hand = this.hand.filter((card) => card[0] === trickSuit);
  //     let filteredHand = hand.length > 0 ? hand : this.hand;
  //     highCard = filteredHand.reduce((prev, curr) => (prev[2] > curr[2] ? prev : curr));

  //     let lowCard = filteredHand.reduce((prev, curr) => (prev[2] < curr[2] ? prev : curr));
  //     highestCard = highCard;
  //     console.log('Higest card: ', highestCard);
  //   } else if (!game.trick) {
  //     console.log('No trick');
  //     let trickSuit = this.countSuitCards();

  //     let lowCard = this.hand.reduce((prev, curr) => (prev[2] < curr[2] ? prev : curr));
  //     console.log(lowCard);
  //     highestCard = lowCard;
  //   }
  //   console.log('played card');
  //   return new Card(highestCard[1] as keyof typeof CardValue, highestCard[0].toString());
  // }
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

export class Robot extends Player {
  static count = 1;
  constructor() {
    super(`Robot ${Robot.count++}`);
  }

  // findTrumpCard() {
  //   let trumpHand = this.hand.filter((card) => card[0] === game.trump);
  //   let filteredTrumpHand = trumpHand.length > 0 ? trumpHand : this.hand;
  //   let highTrump = filteredTrumpHand.reduce((prev, curr) =>
  //     prev[2] > curr[2] ? prev : curr
  //   );
  //   let lowTrump = filteredTrumpHand.reduce((prev, curr) =>
  //     prev[2] < curr[2] ? prev : curr
  //   );

  //   return highTrump;
  // }
}

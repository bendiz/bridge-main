export enum CardValue {
  A = 14,
  K = 13,
  Q = 12,
  J = 11,
  Ten = 10,
  Nine = 9,
  Eight = 8,
  Seven = 7,
  Six = 6,
  Five = 5,
  Four = 4,
  Three = 3,
  Two = 2,
}

export enum Role {
  DUMMY = 'DUMMY',
  DECLARER = 'DECLARER',
  DEFENCE = 'DEFENCE',
}

export enum Position {
  SOUTH = 0,
  WEST = 1,
  NORTH = 2,
  EAST = 3,
}

export type Card = {
  suit: string;
  faceValue: keyof typeof CardValue;
  numericValue: number;
};

export enum bidPoints {
  J = 1,
  Q = 2,
  K = 3,
  A = 4,
}

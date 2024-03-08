import { Position, bidPoints } from './types.js';
import { Deck, Team } from './classes.js';
import { shuffle } from './utils.js';
import { handleWinnerRoute } from './index.js';
export class BridgeGame {
    constructor(players) {
        this.playing = false;
        this.currentPlayerIndex = 0;
        this.deck = new Deck();
        this.trump = '';
        this.round = 1;
        this.turn = 1;
        this.teams = [new Team('South-North'), new Team('West-East')];
        this.declarer = undefined;
        this.roundWinnerCard = undefined;
        this.currentRoundCards = [];
        this.players = players;
        this.trick = '';
        this.currentPlayer = this.declarer;
    }
    assignPositions() {
        shuffle(this.players);
        this.players.forEach((player, index) => {
            player.position = index;
        });
    }
    assignPlayerToTeam() {
        this.players.forEach((player) => {
            const team = player.position === Position.NORTH || player.position === Position.SOUTH
                ? this.teams[0]
                : this.teams[1];
            team.addPlayer(player);
            player.assignTeam(team);
        });
    }
    init() {
        shuffle(this.deck.cards);
        this.deck.deal(this.players);
        this.assignPositions();
        this.assignPlayerToTeam();
        this.assignDeclarer();
    }
    calculateHighCardPoints(playerHand, player) {
        let points = 0;
        playerHand.forEach((card) => {
            const cardValue = card[1];
            if (cardValue in bidPoints) {
                points += bidPoints[cardValue];
            }
        });
        player.highCardPoints = points;
        return points;
    }
    assignDeclarer() {
        this.players.forEach((player) => {
            this.calculateHighCardPoints(player.hand, player);
        });
        this.teams.forEach((team) => {
            team.bidPoints = team.members.reduce((acc, player) => {
                return acc + player.highCardPoints;
            }, 0);
        });
        if (this.teams[0].bidPoints > this.teams[1].bidPoints) {
            if (this.teams[0].members[0].highCardPoints >
                this.teams[0].members[1].highCardPoints) {
                this.declarer = this.teams[0].members[0];
            }
            else {
                this.declarer = this.teams[0].members[1];
            }
        }
        else {
            if (this.teams[1].members[0].highCardPoints >
                this.teams[1].members[1].highCardPoints) {
                this.declarer = this.teams[1].members[0];
            }
            else {
                this.declarer = this.teams[1].members[1];
            }
        }
    }
    getRoundWinner(cards) {
        let winningCard = cards[0];
        let winner = cards[0].currentPlayer;
        return { winningCard, winner };
    }
    findWinningCard(currentRoundCards) {
        let maxValue = 0;
        let winningCard;
        let winner;
        let matchingCards = currentRoundCards.filter((card) => {
            let matches = 'suit' in card &&
                (card.suit === this.trick || card.suit === this.trump);
            return matches;
        });
        if (matchingCards.length === 1) {
            ({ winningCard, winner } = this.getRoundWinner(matchingCards));
        }
        else if (matchingCards.length > 1) {
            if (this.trump !== 'Notrump') {
                let checkTrump = currentRoundCards.filter((card) => {
                    return 'suit' in card && card.suit === this.trump;
                });
                if (checkTrump.length > 0) {
                    matchingCards = checkTrump;
                }
            }
        }
        return ({ winningCard, winner } = this.findHighestCard(matchingCards));
    }
    findHighestCard(matchingCards) {
        let winningCard;
        let winner;
        let maxValue = 0;
        let cards = Object.values(matchingCards);
        cards.map((card) => {
            const cardValue = card.value;
            if (cardValue > maxValue) {
                maxValue = Math.max(maxValue, cardValue);
                winningCard = card;
                winner = card.currentPlayer;
            }
        });
        return { winningCard, winner };
    }
    resetRound() {
        this.turn = 1;
        this.round += 1;
        this.trick = '';
        if (this.currentRoundCards.length === 4) {
            let result = this.findWinningCard(this.currentRoundCards);
            if (result) {
                let { winningCard, winner } = result;
                if (winner && winner.team) {
                    this.roundWinner = result.winner;
                    this.roundWinnerCard = result.winningCard;
                    winner.team.score += 1;
                    winner.roundWinner = true;
                }
                this.currentRoundCards = [];
            }
        }
    }
    endGame() {
        let winner;
        if (this.teams[0].score > this.teams[1].score) {
            winner = this.teams[0];
        }
        else {
            winner = this.teams[1];
        }
        handleWinnerRoute(winner.name, winner.score);
    }
    chooseCurrentPlayer() {
        this.players = this.players.slice(1).concat(this.players.slice(0, 1));
        this.currentPlayer = this.players[0];
    }
    rotatePlayers(roundWinner) {
        const winnerIndex = this.players.findIndex((player) => player === roundWinner);
        this.players = [
            ...this.players.slice(winnerIndex),
            ...this.players.slice(0, winnerIndex),
        ];
        this.currentPlayer = this.players.find((player) => player === roundWinner);
    }
    play(card) {
        if (this.currentPlayer) {
            if ((this.round === 13 && this.turn === 4) ||
                (this.currentPlayer.hand.length === 0 && this.turn === 1)) {
                this.endGame();
            }
            if (this.turn === 1) {
                this.trick = card.suit;
            }
            this.currentPlayer.playCard(card);
            this.currentRoundCards.push({
                currentPlayer: this.currentPlayer,
                suit: card.suit,
                value: card.numericValue,
            });
        }
        this.turn += 1;
        if (this.turn > 4) {
            let roundWinner = this.findWinningCard(this.currentRoundCards).winner;
            this.roundWinner = roundWinner;
            if (roundWinner)
                this.rotatePlayers(roundWinner);
            this.resetRound();
        }
        else if (this.turn > 1) {
            this.chooseCurrentPlayer();
        }
    }
    determineTrump(players, trump) {
        let highestBid = 0;
        let highestBidder;
        players.forEach((player) => {
            if (player.bidPoints > highestBid) {
                highestBid = player.bidPoints;
                highestBidder = player;
            }
        });
        if (highestBidder) {
            this.trump = trump;
        }
    }
}

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { BridgeGame } from './game.js';
import { Player, Card } from './classes.js';
import { getCardIcon } from './utils.js';
let game;
let gameWinner;
let playersAndTeams;
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Lets you access views from any working directory
app.set('views', join(dirname(fileURLToPath(import.meta.url)), '../views'));
// Lets you access public files from any working directory
app.use(express.static(join(dirname(fileURLToPath(import.meta.url)), '../public')));
app.use(express.static('public'));
app.get('/', (req, res) => {
    // reset
    game = undefined;
    gameWinner = undefined;
    res.render('index.ejs');
});
app.get('/winner', (req, res) => {
    if (!gameWinner) {
        return res.status(400).send('No winner yet');
    }
    else {
        res.render('winner.ejs', { winner: gameWinner[0], score: gameWinner[1] });
    }
    return;
});
app.get('/game', (req, res) => {
    var _a;
    let playerName = req.body.currentPlayer;
    let roundWinner;
    let currentHand = [];
    if (game) {
        if (!game.currentPlayer) {
            playerName = (_a = game.declarer) === null || _a === void 0 ? void 0 : _a.name;
        }
        else {
            playerName = game.currentPlayer.name;
        }
        if (game.roundWinner) {
            roundWinner = game.players.find((player) => player.roundWinner === true);
        }
        if (!game.currentPlayer && game.declarer) {
            playerName = game.declarer.name;
            currentHand = game.declarer.hand;
            game.currentPlayer = game.declarer;
        }
        else if (game.currentPlayer) {
            currentHand = game.currentPlayer.hand;
        }
        if (gameWinner) {
            return res.redirect('/winner');
        }
        if (game.turn === 1 && game.round === 1) {
            playersAndTeams = game.players.map((player) => {
                var _a, _b;
                return [
                    player.name,
                    (_b = (_a = player.team) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'No team',
                ];
            });
        }
        let data = Object.assign(Object.assign({}, game), { playerName,
            getCardIcon, roundWinner: roundWinner ? roundWinner.name : undefined, roundWinnerCard: game.roundWinnerCard ? game.roundWinnerCard : undefined, currentHand: currentHand, playersAndTeams });
        res.render('game.ejs', data);
    }
    if (!game) {
        return res.status(400).send('No game in progress');
    }
});
app.post('/submit', (req, res) => {
    const playerNames = Object.values(req.body);
    const players = playerNames.map((name) => new Player(name));
    game = new BridgeGame(players);
    game.init();
    res.redirect('/game');
});
app.post('/playcard', (req, res) => {
    let selectedCard = JSON.parse(req.body.selectedCard);
    selectedCard = new Card(selectedCard[1], selectedCard[0]);
    if (game) {
        try {
            game.play(selectedCard);
            res.redirect('/game');
        }
        catch (error) {
            res.status(400).send(`It's not your turn!`);
        }
    }
});
app.post('/pickTrump', (req, res) => {
    if (game) {
        game.trump = req.body.trump;
        game.playing = true;
        res.redirect('/game');
    }
    else {
        res.status(400).send('No game in progress');
        res.redirect('/');
    }
});
app.get('/playAgain', (req, res) => {
    res.redirect('/');
});
export function handleWinnerRoute(winner, score) {
    gameWinner = [winner, score];
}
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

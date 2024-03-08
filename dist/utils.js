export function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
export function checkArrayEquality(a, b) {
    return a.every((val, index) => val === b[index]);
}
export function getCardIcon(suitname) {
    return suitname === 'Hearts'
        ? '♥️'
        : suitname === 'Diamonds'
            ? '♦️'
            : suitname === 'Spades'
                ? '♠️'
                : suitname === 'Clubs'
                    ? '♣️'
                    : suitname === 'Notrump'
                        ? 'NT'
                        : '';
}
export function findLeftPosition(position) {
    switch (position) {
        case 'South':
            return 'East';
        case 'West':
            return 'South';
        case 'North':
            return 'West';
        case 'East':
            return 'North';
        default:
            return 'Invalid position';
    }
}

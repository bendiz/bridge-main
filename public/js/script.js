import JSConfetti from './jsconfetti.js';

document.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById('confettiCanvas');

  const jsconfetti = new JSConfetti({ canvas });

  let round = 0;
  const intervalId = setInterval(() => {
    if (round < 10) {
      jsconfetti.addConfetti({
        emojis: jsconfetti.addConfetti({
          emojis: ['❤️', '♣️', '🌈', '🃏', '🔸', '🎲', '✨', '💫', '♠️', '♠️'],
        }),
      });
      round += 1;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);

  document
    .querySelector('.winner-button')
    .addEventListener('click', function () {
      jsconfetti.addConfetti({
        emojis: ['❤️', '♣️', '🌈', '🃏', '🔸', '🎲', '✨', '💫', '♠️', '♠️'],
      });
    });
});

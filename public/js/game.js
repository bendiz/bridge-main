import JSConfetti from './jsconfetti.js';
const canvas = document.getElementById('confetti');

const jsconfetti = new JSConfetti({ canvas });

let roundWinnerElement = document.querySelector('.round-winner');

if (roundWinnerElement) {
  setTimeout(() => {
    jsconfetti.addConfetti({
      emojis: jsconfetti.addConfetti({
        emojis: ['🎉', '💫', '🌈', '🥳', '🥂'],
        emojiSize: 20,
        confettiNumber: 30,
      }),
    });
  }, 100);
}

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F',
        'G', 'G', 'H', 'H'
    ];
    let cardValues = [];
    let cardIds = [];
    let cardsMatched = [];

    const board = document.getElementById('game-board');
    const restartButton = document.getElementById('restart');

    function createCard(value) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-back');
        cardFront.textContent = value;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-front');

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        card.addEventListener('click', () => flipCard(card));
        return card;
    }

    function startGame() {
        cardsMatched = [];
        board.innerHTML = '';
        cardValues = shuffle(cards.slice());
        cardValues.forEach(value => {
            board.appendChild(createCard(value));
        });
    }

    function flipCard(card) {
        if (card.classList.contains('flip') || cardIds.length === 2) return;

        card.classList.add('flip');
        cardValues.push(card.getAttribute('data-value'));
        cardIds.push(card);

        if (cardIds.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }

    function checkForMatch() {
        const [firstCard, secondCard] = cardIds;
        if (cardValues[0] === cardValues[1]) {
            cardsMatched.push(cardValues[0]);
        } else {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }
        cardValues = [];
        cardIds = [];
        if (cardsMatched.length === cards.length / 2) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    restartButton.addEventListener('click', startGame);
    startGame();
});

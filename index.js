const images = [
    'images/img1.jpg',
    'images/img1.jpg',
    'images/img2.webp',
    'images/img2.webp',
    'images/img3.png',
    'images/img3.png',
    'images/img4.jpeg',
    'images/img4.jpeg',
    'images/img5.png',
    'images/img5.png',
    'images/img6.png',
    'images/img6.png',
    // 'images/img7.avif',
    'images/img8.webp',
    'images/img8.webp',
    'images/img9.jpeg',
    'images/img9.jpeg',
    // 'images/img10.avif',
    // 'images/img11.avif',
    // 'images/img12.avif',
    // 'images/img13.avif',
    // 'images/img14.avif',
    // 'images/img15.avif',
    // 'images/img16.avif',
    
];

let flippedCards = [];
let matchedCards = [];
let isProcessing = false;
let timer;
let timeLeft = 60; 
let gameOver = false; 

const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('timer');

function initGame() {
    gameBoard.innerHTML = '';
    message.textContent = '';
    flippedCards = [];
    matchedCards = [];
    isProcessing = false;
    timeLeft = 60; 
    gameOver = false; 

    const shuffledImages = shuffleArray(images);

    shuffledImages.forEach(image => {
        const card = createCard(image);
        gameBoard.appendChild(card);
    });

    startTimer();
}

function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.style.backgroundImage = `url(${image})`; 

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', () => handleCardClick(card, image));

    return card;
}


function handleCardClick(card, image) {
    if (isProcessing || flippedCards.includes(card) || matchedCards.includes(card)) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        isProcessing = true; 
        checkForMatch();
    } else {

        flipTimeout = setTimeout(() => {
            flippedCards[0].classList.remove('flipped');
            flippedCards = [];
        }, 5000);
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;


    if (firstCard.querySelector('.card-back').style.backgroundImage === secondCard.querySelector('.card-back').style.backgroundImage) {
        setTimeout(() => {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            matchedCards.push(firstCard, secondCard);
            flippedCards = [];
            isProcessing = false; 

            
            if (matchedCards.length === images.length) {
                endGame('You won!');
            }
        }, 1000);
    } else {
        
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
            isProcessing = false; 
        }, 1000);
    }
}


function startTimer() {
    timer = setInterval(() => {
        if (gameOver) return; 

        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            endGame('You lost!'); 
        }
    }, 1000);
}

function endGame(msg) {
    if (gameOver) return; 

    gameOver = true;
    message.textContent = msg;
    clearInterval(timer); 
    gameBoard.innerHTML = ''; 
}

resetButton.addEventListener('click', initGame);

window.onload = () => {
    initGame();
};

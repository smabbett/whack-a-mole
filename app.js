const squares = document.querySelectorAll('.circle');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
let maxHits = document.querySelector('#maxHits');

const btn = document.querySelector('.reset');
btn.addEventListener('click', function (event) {
	window.location.reload();
});

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let maxScore = 0;

//random sounds when hit
var audioArray = [
	'sounds/impactsplat02.mp3.flac',
	'sounds/pop1.ogg',
	'sounds/pop2.ogg',
	'sounds/pop3.ogg',
	'sounds/ohmy.wav',
];

function randomSquare() {
	//clear the squares of class mole
	squares.forEach((square) => {
		square.classList.remove('mole');
	});
	//Math floor to round to nearest integer, Math random range 1 - 15
	let randomPosition = squares[Math.floor(Math.random() * 15)];
	randomPosition.classList.add('mole');

	//assign id of randomPosition to hitPosition for use later
	hitPosition = randomPosition.id;
	maxScore++;
	maxHits.textContent = maxScore;
}

squares.forEach((square) => {
	square.addEventListener('mousedown', () => {
		if (square.id == hitPosition) {
			result++;
			let randomAudio = new Audio(audioArray[Math.floor(Math.random() * 5)]);
			randomAudio.play();
			score.textContent = result;
			hitPosition = null;
		} else {
			let missAudio = new Audio('sounds/qubodupImpactWood.ogg');
			missAudio.play();
			hitPosition = null;
		}
	});
});

function moveMole() {
	timerId = setInterval(randomSquare, 1000);
}
moveMole();

function countDown() {
	currentTime--;
	timeLeft.textContent = currentTime;

	if (currentTime === 0) {
		clearInterval(countDownTimerId);
		clearInterval(timerId);
		let finalScore = Math.floor((result / maxScore) * 100);
		const playOption = window.confirm(
			`GAME OVER! Your final score is ${finalScore}%. Would you like to play again?`
		);
		if (playOption) {
			window.location.reload();
		}
	}
}

let countDownTimerId = setInterval(countDown, 1000);

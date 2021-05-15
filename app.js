// prevent animation
setTimeout(() => {
  document.body.classList.remove('preload');
}, 500);

// DOM
const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

const CHOICES = [
  {
    name: "paper",
    beats: "rock"
  },
  {
    name: "scissors",
    beats: "paper"
  },
  {
    name: "rock",
    beats: "scissors"
  }
];

const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.results');
const resultDiv = document.querySelectorAll('.results__result');

const resultWinner = document.querySelector('.results__winner');
const resultText = document.querySelector('.results__text');
const playAgainBtn = document.querySelector('.play-again');

const scoreNumber = document.querySelector('.score__number');
let score = 0;


// game logic

choiceButtons.forEach( button => {
  button.addEventListener('click', () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find(choice => choice.name === choiceName);
    choose(choice);
  })
})

const choose = (choice) => {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
};

const aiChoose = () => {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
};

const displayResults = (results) => {
  resultDiv.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}" >
          <img src="./images/icon-${results[idx].name}.svg" alt="${results[idx].name}" >
        </div>`;
    }, idx * 1000);
  });

  gameDiv.classList.toggle('hidden');
  resultsDiv.classList.toggle('hidden');
};

const displayWinner = (results) => {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if(userWins){
      resultText.textContent = "you win";
      resultDiv[0].classList.toggle('winner');
      keepScore(1);
    }else if(aiWins) {
      resultText.textContent = "you loose";
      resultDiv[1].classList.toggle('winner');
      keepScore(-1);
    }else{
      resultText.textContent = "draw";
    }
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('show-winner');
  }, 1000);

}

const isWinner = (results) => {
  return results[0].beats === results[1].name;
}

const keepScore = (point) => {
  score += point;
  scoreNumber.textContent = score;
}

playAgainBtn.addEventListener('click', () => {
  gameDiv.classList.toggle('hidden');
  resultsDiv.classList.toggle('hidden');

  resultDiv.forEach(result => {
    result.textContent = "";
    result.classList.remove('winner');
  });

  resultText.textContent = "";
  resultWinner.classList.toggle('hidden');
  resultsDiv.classList.toggle('show-winner');
})

btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
})

btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal');
})
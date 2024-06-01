let currentMoleTile,
  currentMoleNo,
  currentPlantNo,
  currentPlantTile,
  plantInterval,
  moleInterval,
  score;

window.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < 9; i++) {
    const tile = document.importNode(
      document.getElementById('game-tile').content,
      true
    );
    tile.querySelector('.tile').setAttribute('id', `tile-${i}`);
    tile
      .querySelector('.mole')
      .setAttribute('onclick', `whackTheMole('tile-${i}')`);
    tile
      .querySelector('.plant')
      .setAttribute('onclick', `whackThePlant('tile-${i}')`);
    document.querySelector('.game-wrapper').appendChild(tile);
  }
});

const startGame = () => {
  score = 0;
  document
    .querySelectorAll('.mole img')
    .forEach((el) => el.classList.add('hidden'));
  document
    .querySelectorAll('.plant img')
    .forEach((el) => el.classList.add('hidden'));
  moleInterval = setInterval(showMole, 1500);
  plantInterval = setInterval(showPlant, 1500);
  document.querySelector('.score').textContent = `Score: ${score}`;
  document.querySelector('.score').classList.remove('hidden');
  document.querySelector('.start-button').textContent = `Restart`;
  document.querySelector('.game-wrapper').classList.remove('disabled');
};

const pauseGame = () => {
  clearInterval(plantInterval);
  clearInterval(moleInterval);
};

const continueGame = () => {
  moleInterval = setInterval(showMole, 1500);
  plantInterval = setInterval(showPlant, 1500);
};

const whackTheMole = (id) => {
  currentMoleTile = document.getElementById(id);
  currentMoleTile.querySelector('.mole img').classList.add('hidden');
  score += 10;
  document.querySelector('.score').textContent = `Score: ${score}`;
};

const whackThePlant = (id) => {
  currentMoleTile = document.getElementById(id);
  gameOver = true;
  clearInterval(plantInterval);
  clearInterval(moleInterval);
  document.querySelector(
    '.score'
  ).textContent = `Game Over! Your total score: ${score}`;
  document.querySelector('.game-wrapper').classList.add('disabled');
  const bestScore = Math.max(
    Number(localStorage.getItem('whack-a-mole-best-score') || 0),
    score
  );
  localStorage.setItem('whack-a-mole-best-score', bestScore);
  document.querySelector(
    '.best-score'
  ).textContent = `Best Score: ${bestScore}`;
  document.querySelector('.best-score').classList.remove('hidden');
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 9);
};

const showMole = () => {
  currentMoleNo = getRandomNumber();
  if (currentMoleTile) {
    currentMoleTile.querySelector('.mole img').classList.add('hidden');
  }
  if (currentPlantNo === currentMoleNo) return;
  currentMoleTile = document.getElementById(`tile-${currentMoleNo}`);
  currentMoleTile.querySelector('.mole img').classList.remove('hidden');
};

const showPlant = () => {
  currentPlantNo = getRandomNumber();
  if (currentPlantTile) {
    currentPlantTile.querySelector('.plant img').classList.add('hidden');
  }
  if (currentPlantNo === currentMoleNo) return;
  currentPlantTile = document.getElementById(`tile-${currentPlantNo}`);
  currentPlantTile.querySelector('.plant img').classList.remove('hidden');
};

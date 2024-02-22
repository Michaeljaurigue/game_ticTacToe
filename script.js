const HERO_CLASS = 'hero';
const VILLAIN_CLASS = 'villain';
const VICTORY_PATHS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const battlegrounds = document.querySelectorAll('[data-cell]');
const arena = document.getElementById('board');
const finaleBanner = document.getElementById('winningMessage');
const newBattleButton = document.getElementById('restartButton');
const victoryMessage = document.querySelector('[data-winning-message-text]');
let villainTurn;

launchEpicBattle();

newBattleButton.addEventListener('click', launchEpicBattle);

function launchEpicBattle() {
    villainTurn = false;
    battlegrounds.forEach(field => {
        field.classList.remove(HERO_CLASS);
        field.classList.remove(VILLAIN_CLASS);
        field.removeEventListener('click', onHeroicClick);
        field.addEventListener('click', onHeroicClick, { once: true });
    });
    prepareArena();
    finaleBanner.classList.remove('show');
}

function onHeroicClick(e) {
    const field = e.target;
    const currentClass = villainTurn ? VILLAIN_CLASS : HERO_CLASS;
    markTerritory(field, currentClass);
    if (checkForVictory(currentClass)) {
        concludeEpic(currentClass, false);
    } else if (isStalemate()) {
        concludeEpic(currentClass, true);
    } else {
        swapHeroesAndVillains();
        prepareArena();
    }
}

function concludeEpic(currentClass, draw) {
    if (draw) {
        victoryMessage.innerText = 'It\'s a Draw!';
    } else {
        victoryMessage.innerText = `${villainTurn ? "Villains" : "Heroes"} Triumph!`;
    }
    finaleBanner.classList.add('show');
}

function isStalemate() {
    return [...battlegrounds].every(field => {
        return field.classList.contains(HERO_CLASS) || field.classList.contains(VILLAIN_CLASS);
    });
}

function markTerritory(field, currentClass) {
    field.classList.add(currentClass);
}

function swapHeroesAndVillains() {
    villainTurn = !villainTurn;
}

function prepareArena() {
    arena.classList.remove(HERO_CLASS);
    arena.classList.remove(VILLAIN_CLASS);
    if (villainTurn) {
        arena.classList.add(VILLAIN_CLASS);
    } else {
        arena.classList.add(HERO_CLASS);
    }
}

function checkForVictory(currentClass) {
    return VICTORY_PATHS.some(path => {
        return path.every(index => {
            return battlegrounds[index].classList.contains(currentClass);
        });
    });
}

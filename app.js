// state
// scoer
// player pich
// ai pick


const playerWinsLSKey = "playerWin";
const AIWinsLSKey = "AIWins";

let state = {
    playerWins: localStorage.getItem(playerWinsLSKey) || 0,
    AIWins: localStorage.getItem(AIWinsLSKey) || 0,
    playerPick: null,
    AIPick: null,
};

const renderScore = () => {
    const pointsElement = document.querySelector(".points");
    pointsElement.innerText = state.playerWins - state.AIWins;
};

const bindPickEvents = () => {
    document.querySelectorAll(".options button")
        .forEach((button) => {
        button.addEventListener("click", pick);
    });
};

const pick = e => {
    pickByPlayer(e.currentTarget.dataset.pick);
    pickByAI();
    hideOptions();
    showBattle();
};

const pickByPlayer = (pickedOption) => {
    state = {
        ...state,
        playerPick: pickedOption,
    };
};

const pickByAI = (pickedOption) => {
    const options = ["paper", "rock", "scissors"];
    const AIPick = options[Math.floor(Math.random() * options.length)];
    state = {
        ...state,
        AIPick: pickedOption,
    };
};

const hideOptions = () => {
    document.querySelector(".options").classList.add("hidden");
};

const showBattle = () => {
    document.querySelector(".battle").classList.remove("hidden");
    createElementPickedByPlayer();
    createElementPickedByAI();
};

const createElementPickedByPlayer = () => {
    const playerPick = state.playerPick;
    
    const pickContainerElement = document.querySelector("pick__container--player");
    pickContainerElement.innerHTML = "";
    pickContainerElement.appendChild(createPickElement(playerPick));
};

const createElementPickedByAI = () => {
    const AIPick = state.AIPick;
    const pickContainerElement = document.querySelector("pick__container--ai");
    pickContainerElement.innerHTML = "";
    pickContainerElement.appendChild(createPickElement(AIPick));
};

const createPickElement = (option) => {
    const pickElement = document.createElement("div");
    pickElement.classList.add("button", `button--${option}`);
    
    const imageContainerElement = documnet.createElement("div");
    imageContainerElement.classList.add("button__image-container");
    
    const imageElement = document.createElement("img");
    imageElement.src = `./images/icon-${option}.svg`;
    imageElement.alt = option;

    imageContainerElement.appendChild(imageElement);
    pickElement.appendChild(imageContainerElement);

    return pickElement;
}

const init = () => {
    renderScore();
    bindPickEvents();
};

init();



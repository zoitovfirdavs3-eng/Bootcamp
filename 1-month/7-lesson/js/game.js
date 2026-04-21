// Game State Management
const GameState = {
    playerPokemon: null,
    enemyPokemon: null,
    gameStarted: false,
    currentTurn: 'player',
    battleActive: false,
    playerDefending: false,
    enemyDefending: false
};

// DOM Elements
const elements = {
    // Screens
    selectionScreen: document.getElementById('selection-screen'),
    battleScreen: document.getElementById('battle-screen'),
    loadingScreen: document.getElementById('loading'),
    
    // Search
    searchName: document.querySelector('.search-name'),
    searchType: document.querySelector('.search-type'),
    clearBtn: document.querySelector('.clear-btn'),
    pokemonList: document.getElementById('pokemon-list'),
    noResults: document.getElementById('no-results'),
    
    // Selection
    selectedName: document.getElementById('selected-name'),
    startBattleBtn: document.getElementById('start-battle'),
    
    // Battle
    playerName: document.getElementById('player-name'),
    playerImage: document.getElementById('player-image').querySelector('img'),
    playerHpText: document.getElementById('player-hp-text'),
    playerHpBar: document.getElementById('player-hp-bar'),
    playerAttack: document.getElementById('player-attack'),
    playerDefense: document.getElementById('player-defense'),
    playerSpeed: document.getElementById('player-speed'),
    
    enemyName: document.getElementById('enemy-name'),
    enemyImage: document.getElementById('enemy-image').querySelector('img'),
    enemyHpText: document.getElementById('enemy-hp-text'),
    enemyHpBar: document.getElementById('enemy-hp-bar'),
    enemyAttack: document.getElementById('enemy-attack'),
    enemyDefense: document.getElementById('enemy-defense'),
    enemySpeed: document.getElementById('enemy-speed'),
    
    // Controls
    attackBtn: document.getElementById('attack-btn'),
    defendBtn: document.getElementById('defend-btn'),
    specialBtn: document.getElementById('special-btn'),
    restartBtn: document.getElementById('restart-btn'),
    backBtn: document.getElementById('back-btn'),
    
    // Game Status
    gameStatus: document.getElementById('game-status'),
    battleLog: document.getElementById('battle-log'),
    
    // Modal
    gameOverModal: document.getElementById('game-over-modal'),
    gameResult: document.getElementById('game-result'),
    gameMessage: document.getElementById('game-message'),
    modalRestart: document.getElementById('modal-restart'),
    modalBack: document.getElementById('modal-back')
};

// Initialize Game
function initGame() {
    renderPokemonList(enhancedPokemons);
    setupEventListeners();
    loadLastSelectedPokemon();
    hideLoading();
}

// Render Pokemon List
function renderPokemonList(pokemons) {
    elements.pokemonList.innerHTML = '';
    
    if (pokemons.length === 0) {
        elements.noResults.style.display = 'block';
        return;
    }
    
    elements.noResults.style.display = 'none';
    
    pokemons.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        elements.pokemonList.appendChild(card);
    });
}

// Create Pokemon Card
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.dataset.pokemonId = pokemon.id;
    
    const types = pokemon.type.map(type => 
        `<span class="pokemon-type" style="background: ${getTypeColor(type)}">${type}</span>`
    ).join('');
    
    card.innerHTML = `
        <img src="${pokemon.img}" alt="${pokemon.name}">
        <h3 class="pokemon-name">${pokemon.name}</h3>
        <span class="pokemon-id">#${pokemon.num}</span>
        <div class="pokemon-types">${types}</div>
        <div class="pokemon-stats-preview">
            <div class="stat">HP: ${pokemon.hp}</div>
            <div class="stat">ATK: ${pokemon.attack}</div>
            <div class="stat">DEF: ${pokemon.defense}</div>
            <div class="stat">SPD: ${pokemon.speed}</div>
        </div>
    `;
    
    // Add type animation
    if (pokemon.type.length > 0) {
        const animationClass = getTypeAnimation(pokemon.type[0]);
        if (animationClass) {
            card.classList.add(animationClass);
        }
    }
    
    card.addEventListener('click', () => selectPokemon(pokemon, card));
    
    return card;
}

// Select Pokemon
function selectPokemon(pokemon, card) {
    // Remove previous selection
    document.querySelectorAll('.pokemon-card.selected').forEach(c => 
        c.classList.remove('selected')
    );
    
    // Add selection to clicked card
    card.classList.add('selected');
    
    // Update game state
    GameState.playerPokemon = pokemon;
    
    // Update UI
    elements.selectedName.textContent = pokemon.name;
    elements.startBattleBtn.disabled = false;
    
    // Save to localStorage
    saveLastSelectedPokemon(pokemon.id);
    
    addLogEntry(`${pokemon.name} tanlandi!`, 'special');
}

// Start Battle
function startBattle() {
    if (!GameState.playerPokemon) return;
    
    showLoading();
    
    // Select random enemy
    const availableEnemies = enhancedPokemons.filter(p => 
        p.id !== GameState.playerPokemon.id
    );
    GameState.enemyPokemon = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
    
    // Initialize battle state
    GameState.gameStarted = true;
    GameState.battleActive = true;
    GameState.playerDefending = false;
    GameState.enemyDefending = false;
    
    // Determine first turn based on speed
    GameState.currentTurn = GameState.playerPokemon.speed >= GameState.enemyPokemon.speed ? 'player' : 'enemy';
    
    // Setup battle UI
    setupBattleUI();
    
    // Switch to battle screen
    switchScreen('battle');
    
    // Start battle
    setTimeout(() => {
        addLogEntry(`Jang boshlandi! ${GameState.playerPokemon.name} vs ${GameState.enemyPokemon.name}`, 'special');
        
        if (GameState.currentTurn === 'enemy') {
            setTimeout(() => enemyTurn(), 1000);
        } else {
            enableBattleButtons();
        }
        
        hideLoading();
    }, 500);
}

// Setup Battle UI
function setupBattleUI() {
    // Player Pokemon
    elements.playerName.textContent = GameState.playerPokemon.name;
    elements.playerImage.src = GameState.playerPokemon.img;
    elements.playerAttack.textContent = GameState.playerPokemon.attack;
    elements.playerDefense.textContent = GameState.playerPokemon.defense;
    elements.playerSpeed.textContent = GameState.playerPokemon.speed;
    updateHP('player');
    
    // Enemy Pokemon
    elements.enemyName.textContent = GameState.enemyPokemon.name;
    elements.enemyImage.src = GameState.enemyPokemon.img;
    elements.enemyAttack.textContent = GameState.enemyPokemon.attack;
    elements.enemyDefense.textContent = GameState.enemyPokemon.defense;
    elements.enemySpeed.textContent = GameState.enemyPokemon.speed;
    updateHP('enemy');
    
    // Reset buttons
    elements.attackBtn.disabled = false;
    elements.defendBtn.disabled = false;
    elements.specialBtn.disabled = false;
}

// Update HP Display
function updateHP(target) {
    const pokemon = target === 'player' ? GameState.playerPokemon : GameState.enemyPokemon;
    const hpText = target === 'player' ? elements.playerHpText : elements.enemyHpText;
    const hpBar = target === 'player' ? elements.playerHpBar : elements.enemyHpBar;
    
    const hpPercent = (pokemon.hp / pokemon.maxHp) * 100;
    
    hpText.textContent = `${pokemon.hp}/${pokemon.maxHp}`;
    hpBar.style.width = `${hpPercent}%`;
    
    // Update color based on HP percentage
    hpBar.classList.remove('low', 'medium');
    if (hpPercent <= 30) {
        hpBar.classList.add('low');
    } else if (hpPercent <= 60) {
        hpBar.classList.add('medium');
    }
}

// Player Attack
function playerAttack() {
    if (!GameState.battleActive || GameState.currentTurn !== 'player') return;
    
    disableBattleButtons();
    
    const damage = calculateDamage(GameState.playerPokemon, GameState.enemyPokemon);
    const actualDamage = GameState.enemyDefending ? Math.floor(damage * 0.5) : damage;
    
    GameState.enemyPokemon.hp = Math.max(0, GameState.enemyPokemon.hp - actualDamage);
    
    // Animation
    animateAttack('player');
    
    addLogEntry(`${GameState.playerPokemon.name} ${actualDamage} zarba berdi!`, 'damage');
    
    updateHP('enemy');
    
    // Check for victory
    if (GameState.enemyPokemon.hp <= 0) {
        endBattle('player');
        return;
    }
    
    // Switch to enemy turn
    GameState.currentTurn = 'enemy';
    GameState.enemyDefending = false;
    
    setTimeout(() => enemyTurn(), 1000);
}

// Player Defend
function playerDefend() {
    if (!GameState.battleActive || GameState.currentTurn !== 'player') return;
    
    disableBattleButtons();
    
    GameState.playerDefending = true;
    
    addLogEntry(`${GameState.playerPokemon.name} mudofaa holatiga o'tdi!`, 'special');
    
    // Switch to enemy turn
    GameState.currentTurn = 'enemy';
    GameState.enemyDefending = false;
    
    setTimeout(() => enemyTurn(), 1000);
}

// Player Special Attack
function playerSpecial() {
    if (!GameState.battleActive || GameState.currentTurn !== 'player') return;
    
    disableBattleButtons();
    
    const damage = calculateDamage(GameState.playerPokemon, GameState.enemyPokemon) * 1.5;
    const actualDamage = GameState.enemyDefending ? Math.floor(damage * 0.5) : Math.floor(damage);
    
    GameState.enemyPokemon.hp = Math.max(0, GameState.enemyPokemon.hp - actualDamage);
    
    // Animation
    animateAttack('player');
    
    addLogEntry(`${GameState.playerPokemon.name} maxsus hujum! ${actualDamage} zarba!`, 'special');
    
    updateHP('enemy');
    
    // Check for victory
    if (GameState.enemyPokemon.hp <= 0) {
        endBattle('player');
        return;
    }
    
    // Switch to enemy turn
    GameState.currentTurn = 'enemy';
    GameState.enemyDefending = false;
    
    setTimeout(() => enemyTurn(), 1000);
}

// Enemy Turn
function enemyTurn() {
    if (!GameState.battleActive || GameState.currentTurn !== 'enemy') return;
    
    // Simple AI logic
    const random = Math.random();
    
    if (random < 0.1) {
        // 10% chance to defend
        enemyDefend();
    } else if (random < 0.2) {
        // 10% chance to use special attack
        enemySpecial();
    } else {
        // 80% chance to attack
        enemyAttack();
    }
}

// Enemy Attack
function enemyAttack() {
    const damage = calculateDamage(GameState.enemyPokemon, GameState.playerPokemon);
    const actualDamage = GameState.playerDefending ? Math.floor(damage * 0.5) : damage;
    
    GameState.playerPokemon.hp = Math.max(0, GameState.playerPokemon.hp - actualDamage);
    
    // Animation
    animateAttack('enemy');
    
    addLogEntry(`${GameState.enemyPokemon.name} ${actualDamage} zarba berdi!`, 'damage');
    
    updateHP('player');
    
    // Check for defeat
    if (GameState.playerPokemon.hp <= 0) {
        endBattle('enemy');
        return;
    }
    
    // Switch to player turn
    GameState.currentTurn = 'player';
    GameState.playerDefending = false;
    enableBattleButtons();
}

// Enemy Defend
function enemyDefend() {
    GameState.enemyDefending = true;
    
    addLogEntry(`${GameState.enemyPokemon.name} mudofaa holatiga o'tdi!`, 'special');
    
    // Switch to player turn
    GameState.currentTurn = 'player';
    GameState.playerDefending = false;
    enableBattleButtons();
}

// Enemy Special Attack
function enemySpecial() {
    const damage = calculateDamage(GameState.enemyPokemon, GameState.playerPokemon) * 1.5;
    const actualDamage = GameState.playerDefending ? Math.floor(damage * 0.5) : Math.floor(damage);
    
    GameState.playerPokemon.hp = Math.max(0, GameState.playerPokemon.hp - actualDamage);
    
    // Animation
    animateAttack('enemy');
    
    addLogEntry(`${GameState.enemyPokemon.name} maxsus hujum! ${actualDamage} zarba!`, 'special');
    
    updateHP('player');
    
    // Check for defeat
    if (GameState.playerPokemon.hp <= 0) {
        endBattle('enemy');
        return;
    }
    
    // Switch to player turn
    GameState.currentTurn = 'player';
    GameState.playerDefending = false;
    enableBattleButtons();
}

// Animate Attack
function animateAttack(attacker) {
    const container = attacker === 'player' ? 
        elements.playerImage.parentElement.parentElement :
        elements.enemyImage.parentElement.parentElement;
    
    container.classList.add('damaged');
    container.classList.add('attacking');
    
    setTimeout(() => {
        container.classList.remove('damaged');
        container.classList.remove('attacking');
    }, 500);
}

// End Battle
function endBattle(winner) {
    GameState.battleActive = false;
    disableBattleButtons();
    
    const modal = elements.gameOverModal;
    const result = elements.gameResult;
    const message = elements.gameMessage;
    
    if (winner === 'player') {
        result.textContent = ' G\'alaba! ';
        result.style.color = '#27ae60';
        message.textContent = `${GameState.playerPokemon.name} jangda g\'alaba qozondi!`;
        addLogEntry(` Siz g'alaba qozondingiz! `, 'special');
    } else {
        result.textContent = ' Mag\'lubiyat! ';
        result.style.color = '#e74c3c';
        message.textContent = `${GameState.enemyPokemon.name} jangda g'alaba qozondi!`;
        addLogEntry(` Siz mag'lub bo'ldingiz! `, 'damage');
    }
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 1000);
}

// Restart Battle
function restartBattle() {
    // Reset HP
    GameState.playerPokemon.hp = GameState.playerPokemon.maxHp;
    GameState.enemyPokemon.hp = GameState.enemyPokemon.maxHp;
    
    // Reset state
    GameState.battleActive = true;
    GameState.currentTurn = GameState.playerPokemon.speed >= GameState.enemyPokemon.speed ? 'player' : 'enemy';
    GameState.playerDefending = false;
    GameState.enemyDefending = false;
    
    // Hide modal
    elements.gameOverModal.classList.remove('active');
    
    // Clear battle log
    elements.battleLog.innerHTML = '<div class="log-entry">Jang qayta boshlanmoqda...</div>';
    
    // Setup battle UI
    setupBattleUI();
    
    addLogEntry(`Jang qayta boshlandi!`, 'special');
    
    if (GameState.currentTurn === 'enemy') {
        setTimeout(() => enemyTurn(), 1000);
    }
}

// Back to Selection
function backToSelection() {
    // Hide modal
    elements.gameOverModal.classList.remove('active');
    
    // Reset game state
    GameState.playerPokemon = null;
    GameState.enemyPokemon = null;
    GameState.gameStarted = false;
    GameState.battleActive = false;
    
    // Reset UI
    elements.selectedName.textContent = 'Hech qaysi';
    elements.startBattleBtn.disabled = true;
    
    // Clear battle log
    elements.battleLog.innerHTML = '<div class="log-entry">Jangga tayyorlaning...</div>';
    
    // Switch to selection screen
    switchScreen('selection');
    
    // Re-render pokemon list
    renderPokemonList(enhancedPokemons);
}

// Switch Screen
function switchScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    if (screenName === 'selection') {
        elements.selectionScreen.classList.add('active');
    } else if (screenName === 'battle') {
        elements.battleScreen.classList.add('active');
    }
}

// Enable/Disable Battle Buttons
function enableBattleButtons() {
    elements.attackBtn.disabled = false;
    elements.defendBtn.disabled = false;
    elements.specialBtn.disabled = false;
}

function disableBattleButtons() {
    elements.attackBtn.disabled = true;
    elements.defendBtn.disabled = true;
    elements.specialBtn.disabled = true;
}

// Add Log Entry
function addLogEntry(message, type = '') {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = message;
    
    elements.battleLog.appendChild(logEntry);
    elements.battleLog.scrollTop = elements.battleLog.scrollHeight;
}

// Search Functions
function searchPokemons() {
    const nameQuery = elements.searchName.value.trim().toLowerCase();
    const typeQuery = elements.searchType.value.trim().toLowerCase();
    
    let filtered = enhancedPokemons;
    
    if (nameQuery) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(nameQuery)
        );
    }
    
    if (typeQuery) {
        filtered = filtered.filter(p => 
            p.type.some(type => type.toLowerCase().includes(typeQuery))
        );
    }
    
    renderPokemonList(filtered);
}

function clearSearch() {
    elements.searchName.value = '';
    elements.searchType.value = '';
    renderPokemonList(enhancedPokemons);
}

// Loading Functions
function showLoading() {
    elements.loadingScreen.classList.add('active');
}

function hideLoading() {
    elements.loadingScreen.classList.remove('active');
}

// Local Storage Functions
function saveLastSelectedPokemon(pokemonId) {
    localStorage.setItem('lastSelectedPokemon', pokemonId);
}

function loadLastSelectedPokemon() {
    const lastSelectedId = localStorage.getItem('lastSelectedPokemon');
    if (lastSelectedId) {
        const pokemon = enhancedPokemons.find(p => p.id == lastSelectedId);
        if (pokemon) {
            const card = document.querySelector(`[data-pokemon-id="${lastSelectedId}"]`);
            if (card) {
                selectPokemon(pokemon, card);
            }
        }
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    elements.searchName.addEventListener('input', searchPokemons);
    elements.searchType.addEventListener('input', searchPokemons);
    elements.clearBtn.addEventListener('click', clearSearch);
    
    // Selection
    elements.startBattleBtn.addEventListener('click', startBattle);
    
    // Battle Controls
    elements.attackBtn.addEventListener('click', playerAttack);
    elements.defendBtn.addEventListener('click', playerDefend);
    elements.specialBtn.addEventListener('click', playerSpecial);
    elements.restartBtn.addEventListener('click', restartBattle);
    elements.backBtn.addEventListener('click', backToSelection);
    
    // Modal
    elements.modalRestart.addEventListener('click', restartBattle);
    elements.modalBack.addEventListener('click', backToSelection);
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);

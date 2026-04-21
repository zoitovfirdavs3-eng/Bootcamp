// Enhanced Pokemon data with battle stats
const enhancedPokemons = pokemons.map(pokemon => ({
    ...pokemon,
    hp: 100,
    maxHp: 100,
    attack: Math.floor(Math.random() * 21) + 10, // 10-30
    defense: Math.floor(Math.random() * 16) + 5,  // 5-20
    speed: Math.floor(Math.random() * 16) + 5,   // 5-20
    level: Math.floor(Math.random() * 20) + 1,    // 1-20
    exp: 0,
    maxExp: 100
}));

// Type effectiveness chart
const typeEffectiveness = {
    'Fire': {
        'strong': ['Grass', 'Ice', 'Bug', 'Steel'],
        'weak': ['Water', 'Fire', 'Rock', 'Dragon'],
        'immune': []
    },
    'Water': {
        'strong': ['Fire', 'Ground', 'Rock'],
        'weak': ['Water', 'Grass', 'Dragon'],
        'immune': []
    },
    'Grass': {
        'strong': ['Water', 'Ground', 'Rock'],
        'weak': ['Fire', 'Grass', 'Poison', 'Flying', 'Bug', 'Dragon', 'Steel'],
        'immune': []
    },
    'Electric': {
        'strong': ['Water', 'Flying'],
        'weak': ['Electric', 'Grass', 'Dragon'],
        'immune': ['Ground']
    },
    'Psychic': {
        'strong': ['Fighting', 'Poison'],
        'weak': ['Psychic', 'Steel'],
        'immune': ['Dark']
    },
    'Ice': {
        'strong': ['Grass', 'Ground', 'Flying', 'Dragon'],
        'weak': ['Fire', 'Water', 'Ice', 'Steel'],
        'immune': []
    },
    'Dragon': {
        'strong': ['Dragon'],
        'weak': ['Steel'],
        'immune': ['Fairy']
    },
    'Dark': {
        'strong': ['Psychic', 'Ghost'],
        'weak': ['Fighting', 'Dark', 'Fairy'],
        'immune': []
    },
    'Fairy': {
        'strong': ['Fighting', 'Dragon', 'Dark'],
        'weak': ['Fire', 'Poison', 'Steel'],
        'immune': []
    },
    'Normal': {
        'strong': [],
        'weak': ['Rock', 'Steel'],
        'immune': ['Ghost']
    },
    'Fighting': {
        'strong': ['Normal', 'Ice', 'Rock', 'Dark', 'Steel'],
        'weak': ['Flying', 'Poison', 'Bug', 'Psychic', 'Fairy'],
        'immune': ['Ghost']
    },
    'Flying': {
        'strong': ['Fighting', 'Bug', 'Grass'],
        'weak': ['Electric', 'Rock', 'Steel'],
        'immune': []
    },
    'Poison': {
        'strong': ['Grass', 'Fairy'],
        'weak': ['Poison', 'Ground', 'Rock', 'Ghost'],
        'immune': []
    },
    'Ground': {
        'strong': ['Fire', 'Electric', 'Poison', 'Rock', 'Steel'],
        'weak': ['Grass', 'Bug'],
        'immune': ['Flying']
    },
    'Rock': {
        'strong': ['Fire', 'Ice', 'Flying', 'Bug'],
        'weak': ['Fighting', 'Ground', 'Steel'],
        'immune': []
    },
    'Bug': {
        'strong': ['Grass', 'Psychic', 'Dark'],
        'weak': ['Fire', 'Fighting', 'Poison', 'Flying', 'Steel', 'Fairy'],
        'immune': []
    },
    'Ghost': {
        'strong': ['Psychic', 'Ghost'],
        'weak': ['Dark', 'Steel'],
        'immune': ['Normal']
    },
    'Steel': {
        'strong': ['Ice', 'Rock', 'Fairy'],
        'weak': ['Fire', 'Water', 'Electric', 'Steel'],
        'immune': []
    }
};

// Calculate damage with type effectiveness
function calculateDamage(attacker, defender, moveType = 'normal') {
    let damage = attacker.attack;
    
    // Apply defense reduction
    damage = Math.max(1, damage - Math.floor(defender.defense / 2));
    
    // Apply type effectiveness
    if (Array.isArray(attacker.type)) {
        let effectiveness = 1;
        for (let type of attacker.type) {
            if (typeEffectiveness[type]) {
                if (typeEffectiveness[type].strong.includes(defender.type[0])) {
                    effectiveness *= 2;
                }
                if (typeEffectiveness[type].weak.includes(defender.type[0])) {
                    effectiveness *= 0.5;
                }
                if (typeEffectiveness[type].immune.includes(defender.type[0])) {
                    effectiveness *= 0;
                }
            }
        }
        damage = Math.floor(damage * effectiveness);
    }
    
    // Add random factor (±20%)
    const randomFactor = 0.8 + Math.random() * 0.4;
    damage = Math.floor(damage * randomFactor);
    
    return Math.max(1, damage);
}

// Get type color for UI
function getTypeColor(type) {
    const colors = {
        'Fire': '#ff6b6b',
        'Water': '#4dabf7',
        'Grass': '#51cf66',
        'Electric': '#ffd43b',
        'Psychic': '#cc5de8',
        'Ice': '#74c0fc',
        'Dragon': '#7950f2',
        'Dark': '#495057',
        'Fairy': '#ff6ec7',
        'Normal': '#868e96',
        'Fighting': '#fa5252',
        'Flying': '#a5d8ff',
        'Poison': '#be4bdb',
        'Ground': '#fab005',
        'Rock': '#868e96',
        'Bug': '#8ce99a',
        'Ghost': '#9775fa',
        'Steel': '#868e96'
    };
    return colors[type] || '#868e96';
}

// Get type animation class
function getTypeAnimation(type) {
    const animations = {
        'Fire': 'fire-glow',
        'Water': 'wave-effect',
        'Electric': 'flash-effect',
        'Grass': 'rotate-effect',
        'Ghost': 'fade-effect',
        'Psychic': 'psychic-effect',
        'Ice': 'ice-effect',
        'Dragon': 'dragon-effect'
    };
    return animations[type] || '';
}

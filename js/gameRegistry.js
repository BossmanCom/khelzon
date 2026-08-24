import { storage } from './storage.js';

export const gameRegistry = [
  {
    id: 'marble-solo',
    name: 'Marble Quest Solo',
    description: 'Jackaroo-inspired card & marble race vs CPU. Play cards to move your gold marbles home before the crimson AI wins.',
    icon: '🏁',
    category: 'Strategy',
    tags: ['strategy', 'cards'],
    controls: ['Click card → click marble', 'Ace/King: enter board', 'Jack: swap marbles', 'Beat CPU to win'],
    instructions: {
      objective: 'Be the first to move all 4 gold marbles completely around the board and into your home zone before the CPU does.',
      howToPlay: [
        'On your turn, click one of your hand cards to select it.',
        'Then click one of your marbles on the board (or in base) to apply the card action.',
        'Use Ace or King to bring a marble from base onto the track.',
        'Number cards move a marble forward (4 moves backward).',
        'Jack swaps your marble with any marble on the track.',
        'If you land on an opponent marble, send it back to base.',
        'When a marble completes the full circuit, it enters home and is safe.',
      ],
      rules: [
        'You and the CPU each control 4 marbles starting in base.',
        'A marble must enter the track with an Ace or King before it can move.',
        'Marbles move clockwise around the 40-space circular track.',
        'Safe zones (teal dots) exist every 10 spaces — marbles can still be captured on most spaces.',
        'You must make a valid move if possible; otherwise the card is discarded.',
        'The first player to get all 4 marbles home wins the game.',
      ],
      scoring: 'Win = saved as a victory. Losses are tracked in your session stats.',
    },
    load: () => import('./games/marble-solo.js'),
  },
  {
    id: 'snake-rush',
    name: 'Snake Rush',
    description: 'Guide the glowing serpent to collect gems. Speed increases as you grow. Don\'t bite yourself!',
    icon: '🐍',
    category: 'Arcade',
    tags: ['arcade', 'classic'],
    controls: ['↑ ↓ ← → or WASD', 'On-screen D-pad (mobile)', 'Start / Pause buttons'],
    instructions: {
      objective: 'Eat as many gems as possible to grow your snake and score points without crashing into walls or yourself.',
      howToPlay: [
        'Press Start to begin the game.',
        'Use arrow keys, WASD, or the on-screen D-pad to steer the snake.',
        'Move into a gem to eat it — your snake grows and you gain 10 points.',
        'After each gem, the snake speeds up slightly.',
        'Use Pause if you need a break.',
      ],
      rules: [
        'Hitting a wall ends the game immediately.',
        'Running into your own tail ends the game.',
        'The snake moves continuously — you only control direction.',
        'You cannot reverse direction directly into yourself (180° turns are blocked).',
      ],
      scoring: '10 points per gem eaten. Your highest score is saved locally.',
    },
    load: () => import('./games/snake-rush.js'),
  },
  {
    id: 'cascade',
    name: 'Number Cascade',
    description: 'Slide and merge tiles to reach 4096. A fresh twist on the classic merge puzzle with warm tile colors.',
    icon: '🔢',
    category: 'Puzzle',
    tags: ['puzzle'],
    controls: ['Arrow keys / WASD', 'Swipe on mobile', 'D-pad buttons'],
    instructions: {
      objective: 'Combine matching number tiles by sliding them until you create the 4096 tile.',
      howToPlay: [
        'Press New Game to start with two tiles on the board.',
        'Swipe or use arrow keys to slide all tiles in one direction.',
        'When two tiles with the same number touch, they merge into one with double the value.',
        'After each move, a new tile (2 or 4) appears in a random empty cell.',
        'Keep merging until you reach 4096 or run out of moves.',
      ],
      rules: [
        'Tiles slide as far as possible in the chosen direction.',
        'Only one merge happens per tile per move (no chain merges in the same slide).',
        'The game ends when the board is full and no adjacent tiles match.',
        'You can continue playing after reaching 4096 to maximize your score.',
      ],
      scoring: 'Score increases by the value of every merged tile. Highest score is saved.',
    },
    load: () => import('./games/cascade.js'),
  },
  {
    id: 'memory-matrix',
    name: 'Memory Matrix',
    description: 'Flip cards and find matching pairs before time runs out. Train your recall across 3 difficulty levels.',
    icon: '🧠',
    category: 'Puzzle',
    tags: ['puzzle', 'memory'],
    controls: ['Click / tap cards to flip', 'Choose difficulty before starting'],
    instructions: {
      objective: 'Find all matching emoji pairs before the timer reaches zero.',
      howToPlay: [
        'Select a difficulty: Easy (6 pairs), Medium (8 pairs), or Hard (10 pairs).',
        'Click a card to flip it and reveal its emoji.',
        'Click a second card — if they match, both stay face-up.',
        'If they don\'t match, both flip back after a short delay.',
        'Match every pair to win before time runs out.',
      ],
      rules: [
        'Easy mode gives 90 seconds, Medium 75 seconds, Hard 60 seconds.',
        'Each pair of wrong flips counts as one move.',
        'You can only flip two cards at a time.',
        'Matched pairs cannot be flipped again.',
      ],
      scoring: 'Score = 1000 − (moves × 10) + (remaining seconds × 2). Higher is better.',
    },
    load: () => import('./games/memory-matrix.js'),
  },
  {
    id: 'orbit-breaker',
    name: 'Orbit Breaker',
    description: 'Bounce the energy ball to destroy orbiting blocks. Clear all bricks to advance levels.',
    icon: '🧱',
    category: 'Arcade',
    tags: ['arcade'],
    controls: ['← → or A/D keys', 'Mouse / touch to move paddle', 'Start to launch ball'],
    instructions: {
      objective: 'Clear every brick on screen by bouncing the ball with your paddle, then advance through 5 levels.',
      howToPlay: [
        'Press Start to launch the ball.',
        'Move the paddle left/right with arrow keys, A/D, or mouse/touch.',
        'Bounce the ball into bricks to destroy them — each brick may need multiple hits on higher levels.',
        'Clear all bricks to advance to the next level with more rows.',
        'Don\'t let the ball fall below the paddle!',
      ],
      rules: [
        'You start with 3 lives.',
        'Missing the ball costs one life; the ball resets on your paddle.',
        'The ball angle changes based on where it hits the paddle.',
        'Higher levels have tougher bricks (more HP) and more rows.',
        'Game ends when you lose all lives or beat level 5.',
      ],
      scoring: '10 × current level points per brick destroyed. Total score saved as your best.',
    },
    load: () => import('./games/orbit-breaker.js'),
  },
  {
    id: 'star-drift',
    name: 'Star Drift',
    description: 'Pilot your ship through asteroid fields. Shoot debris and survive escalating waves solo.',
    icon: '🚀',
    category: 'Action',
    tags: ['action', 'shooter'],
    controls: ['← → or A/D to move', 'Spacebar to shoot', 'Launch to start'],
    instructions: {
      objective: 'Destroy asteroids, survive incoming waves, and rack up the highest score possible.',
      howToPlay: [
        'Press Launch to start your mission.',
        'Move left/right with arrow keys or A/D.',
        'Press Spacebar to fire energy shots upward.',
        'Destroy asteroids before they collide with your ship.',
        'Clear all asteroids in a wave to advance — each wave spawns more enemies.',
      ],
      rules: [
        'You start with 100 HP.',
        'Colliding with an asteroid costs 15 HP.',
        'Asteroids bounce off side walls and drift downward.',
        'Larger asteroids are worth more points when destroyed.',
        'The game ends when HP reaches zero.',
      ],
      scoring: 'Points equal the size of destroyed asteroids. Highest total score is saved.',
    },
    load: () => import('./games/star-drift.js'),
  },
  {
    id: 'tap-sequence',
    name: 'Tap Sequence',
    description: 'Watch the colored pads light up and repeat the pattern. How long can your memory chain grow?',
    icon: '🎵',
    category: 'Reflex',
    tags: ['reflex', 'memory'],
    controls: ['Click the colored pads', 'Start Round to begin', 'Watch then repeat'],
    instructions: {
      objective: 'Memorize and repeat an ever-growing sequence of colored pad flashes.',
      howToPlay: [
        'Press Start Round to begin.',
        'Watch carefully as pads light up one by one with a sound.',
        'When it\'s your turn, click the pads in the exact same order.',
        'Each successful round adds one more step to the sequence.',
        'One wrong pad ends the game.',
      ],
      rules: [
        'You cannot click pads while the sequence is playing.',
        'The sequence always starts fresh when you press Start Round.',
        'Pads flash in random order — the pattern changes each game.',
        'There is no time limit, but hesitation won\'t help your memory!',
      ],
      scoring: 'Your best = longest sequence completed. Each correct round saves progress.',
    },
    load: () => import('./games/tap-sequence.js'),
  },
  {
    id: 'territory-clash',
    name: 'Territory Clash',
    description: 'Expand your gold territory on a grid vs the CPU. Claim adjacent tiles and control the board.',
    icon: '🏰',
    category: 'Strategy',
    tags: ['strategy', 'turn-based'],
    controls: ['Click adjacent empty cells', 'Expand from your tiles', 'Beat CPU tile count'],
    instructions: {
      objective: 'Control more grid tiles than the CPU by expanding from your territory each turn.',
      howToPlay: [
        'You start with one tile at the bottom-left; CPU starts top-right.',
        'On your turn, click any empty cell that touches your gold tiles.',
        'The CPU then claims a random valid tile touching its crimson tiles.',
        'Play continues until no empty expandable cells remain.',
      ],
      rules: [
        'You can only claim cells orthogonally adjacent to your existing territory.',
        'The CPU plays immediately after your move.',
        'Highlighted cells show valid moves on your turn.',
        'Most tiles controlled at the end wins.',
      ],
      scoring: 'Your score = tiles you control at game end. Higher is better.',
    },
    load: () => import('./games/territory-clash.js'),
  },
  {
    id: 'neon-dodge',
    name: 'Neon Dodge',
    description: 'Dodge falling neon blocks in three lanes. Survive and rack up dodge points.',
    icon: '⚡',
    category: 'Arcade',
    tags: ['arcade', 'reflex'],
    controls: ['← → or A/D', 'On-screen left/right buttons', 'Start to begin'],
    instructions: {
      objective: 'Move between lanes and survive falling obstacles as long as possible.',
      howToPlay: [
        'Press Start to begin.',
        'Move left/right with arrow keys, A/D, or the on-screen buttons.',
        'Each obstacle you successfully dodge adds to your score.',
        'Collision ends the run instantly.',
      ],
      rules: [
        'Three fixed lanes — you snap between them.',
        'Obstacle speed increases slightly as your score grows.',
        'New obstacles spawn continuously.',
        'One hit ends the game.',
      ],
      scoring: '1 point per obstacle dodged. Highest run score is saved.',
    },
    load: () => import('./games/neon-dodge.js'),
  },
  {
    id: 'slide-quest',
    name: 'Slide Quest',
    description: 'Classic sliding tile puzzle — order tiles 1 through 8 with the fewest moves.',
    icon: '🧩',
    category: 'Puzzle',
    tags: ['puzzle', 'logic'],
    controls: ['Click tiles adjacent to the empty space', 'Shuffle for a new board'],
    instructions: {
      objective: 'Arrange numbered tiles in order from 1 to 8 with the empty space at the bottom-right.',
      howToPlay: [
        'Press Shuffle to scramble the board.',
        'Click any tile next to the empty space to slide it.',
        'Only one tile moves per click.',
        'Keep sliding until the board reads 1–8 in order.',
      ],
      rules: [
        'Tiles can only move into the single empty cell.',
        'Every move counts toward your total.',
        'Fewer moves yields a higher score.',
        'There is no time limit.',
      ],
      scoring: 'Score = max(100, 1000 − moves × 15). Higher is better.',
    },
    load: () => import('./games/slide-quest.js'),
  },
  {
    id: 'meteor-run',
    name: 'Meteor Run',
    description: 'Pilot your ship through a meteor shower. Dodge debris and survive for a high score.',
    icon: '☄️',
    category: 'Action',
    tags: ['action', 'dodge'],
    controls: ['← → or A/D to steer', 'Launch to start', 'On-screen left/right'],
    instructions: {
      objective: 'Survive the meteor shower as long as possible without losing all HP.',
      howToPlay: [
        'Press Launch to start flying.',
        'Steer left/right to avoid falling meteors.',
        'Your score increases every frame you stay alive.',
        'Meteors spawn faster as time goes on.',
      ],
      rules: [
        'You start with 100 HP.',
        'Each meteor collision costs 25 HP.',
        'At 0 HP the run ends.',
        'No weapons — dodging only.',
      ],
      scoring: 'Score = survival time in frames/points. Highest run is saved.',
    },
    load: () => import('./games/meteor-run.js'),
  },
  {
    id: 'target-tap',
    name: 'Target Tap',
    description: 'Tap glowing targets before they disappear. Miss five and you\'re out.',
    icon: '🎯',
    category: 'Reflex',
    tags: ['reflex', 'speed'],
    controls: ['Click / tap targets quickly', 'Start to begin'],
    instructions: {
      objective: 'Tap as many targets as possible before they fade away.',
      howToPlay: [
        'Press Start to begin.',
        'Targets appear at random positions in the arena.',
        'Click or tap a target before it vanishes.',
        'Targets spawn faster as your score rises.',
      ],
      rules: [
        'Each missed target counts as one miss.',
        'Five misses ends the game.',
        'Targets have a limited lifetime that shrinks as score increases.',
        'Only one target needs to be hit at a time.',
      ],
      scoring: '1 point per target tapped. Highest score is saved.',
    },
    load: () => import('./games/target-tap.js'),
  },
];

export function getGame(id) {
  return gameRegistry.find(g => g.id === id);
}

export function getCategories() {
  return ['All', ...new Set(gameRegistry.map(g => g.category))];
}

export function getGamesByCategory(category) {
  if (category === 'All') return gameRegistry;
  return gameRegistry.filter(g => g.category === category);
}

export function getTotalPlays() {
  const scores = storage.getAllScores();
  return Object.values(scores).reduce((sum, s) => sum + (s.plays || 0), 0);
}

export function getGamesPlayedCount() {
  const scores = storage.getAllScores();
  return Object.values(scores).filter(s => s.plays > 0).length;
}

export function renderGameInstructions(game) {
  const ins = game.instructions;
  if (!ins) return '';

  return `
    <h2 class="instructions-heading">${game.icon} How to Play</h2>
    <div class="objective-box">
      <h3>Objective</h3>
      <p>${ins.objective}</p>
    </div>

    <h3>How to Play</h3>
    <ol>
      ${ins.howToPlay.map(step => `<li>${step}</li>`).join('')}
    </ol>

    <h3>Rules</h3>
    <ul>
      ${ins.rules.map(rule => `<li>${rule}</li>`).join('')}
    </ul>

    <h3>Controls</h3>
    <ul class="controls-list">
      ${game.controls.map(c => `<li>${c}</li>`).join('')}
    </ul>

    <h3>Scoring</h3>
    <p>${ins.scoring}</p>
  `;
}

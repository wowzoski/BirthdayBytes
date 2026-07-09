/* =============================================
   script.js — Happy Birthday: Blow the Candle
   State machine, event handlers, and animation
   sequencing for the candle-blow interaction.

   Animation strategy: style.animation is set directly via
   JS to bypass CSS specificity conflicts. setTimeout is used
   for the extinguish step since animationend is unreliable
   when transitioning away from an infinite animation.
   ============================================= */

// ── State enum ──
// Represents the three possible states of the candle interaction.
const State = { LIT: 'lit', ANIMATING: 'animating', MODAL_OPEN: 'modalOpen' };

// ── Current state ──
// Tracks which state the application is currently in.
let currentState = State.LIT;

// ── DOM element references ──
const blowBtn       = document.getElementById('blow-btn');       // The "Blow the Candle" button
const flame         = document.getElementById('flame');          // The candle flame element
const smoke         = document.getElementById('smoke');          // The smoke puff element
const modalBackdrop = document.getElementById('modal-backdrop'); // The full-screen modal backdrop
const wishText      = document.getElementById('wish-text');      // The paragraph displaying the wish
const closeBtn      = document.getElementById('close-btn');      // The modal dismiss button

// ── Animation durations (ms) — must match CSS keyframe durations ──
const EXTINGUISH_MS = 400;  // matches: animation: extinguish 0.4s
const SMOKE_MS      = 1700; // matches: animation: smokeRise 1.7s

// Wish pool — 10 birthday wishes (Requirements 5.2)
const wishes = [
  "Wishing you a day filled with love, laughter, and all your favorite things!",
  "May this new year of your life bring you endless happiness and beautiful surprises.",
  "Happy Birthday! May all your dreams and wishes come true this year.",
  "Here's to another year of amazing memories and adventures ahead!",
  "May your birthday be the start of your best year yet, full of joy and success.",
  "Sending you warm wishes and lots of love on your special day!",
  "Happy Birthday! May you be blessed with good health, happiness, and prosperity.",
  "Cheers to you! May this year bring more smiles than tears, and more joy than worries.",
  "Wishing you a wonderful birthday and an even more wonderful year ahead!",
  "Happy Birthday! Never stop shining as bright as you do.",
];

// ── selectRandomWish ──
// Pure function — selects one random wish from the given pool array.
// Property 1: Wish selection always draws from the pool (design.md)
// Validates: Requirements 4.3, 5.1, 5.7
function selectRandomWish(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// Expose for testing without a bundler
window.selectRandomWish = selectRandomWish;

// ── lightCandle ──
// Sets the flame to its lit/flickering state using style.animation.
// Called on page init and on reset.
function lightCandle() {
  flame.style.display = '';          // ensure flame is visible
  flame.style.opacity = '';          // clear any leftover inline opacity
  flame.style.transform = '';        // clear any leftover inline transform
  // Force a reflow so the animation restarts from frame 0
  void flame.offsetWidth;
  flame.style.animation = 'flicker 0.6s ease-in-out infinite';
}

// ── onBlow ──
// Called when the "Blow the Candle" button is clicked.
// Guard: only run if the candle is currently lit.
function onBlow() {
  if (currentState !== State.LIT) return; // guard — ignore clicks in wrong state

  currentState = State.ANIMATING;
  blowBtn.disabled = true;

  // Step 1: Switch flame animation to extinguish
  // Using style.animation overrides any CSS animation regardless of specificity.
  void flame.offsetWidth; // force reflow so new animation starts cleanly
  flame.style.animation = 'extinguish 0.4s ease-in forwards';

  // Step 2: After extinguish duration, hide flame and show smoke
  // Using setTimeout because animationend is unreliable when overriding
  // an infinite animation — the event may fire for the old animation or not at all.
  setTimeout(onExtinguishEnd, EXTINGUISH_MS);
}

// ── onExtinguishEnd ──
// Called after the extinguish animation duration has elapsed.
// Hides the flame and triggers the smoke rise animation.
function onExtinguishEnd() {
  // Hide flame completely
  flame.style.display = 'none';

  // Show smoke element and start its rise animation
  smoke.style.display = 'block';
  void smoke.offsetWidth; // force reflow so animation starts from frame 0
  smoke.style.animation = 'smokeRise 1.7s ease-out forwards';

  // Step 3: Wait for smoke animation to finish, then show modal
  // smokeRise is a one-shot animation starting fresh, so animationend is reliable here.
  smoke.addEventListener('animationend', onSmokeEnd, { once: true });

  // Safety fallback: if animationend doesn't fire (e.g. element hidden mid-play),
  // show the modal after the expected duration anyway.
  setTimeout(() => {
    if (currentState === State.ANIMATING) onSmokeEnd();
  }, SMOKE_MS + 100);
}

// ── onSmokeEnd ──
// Called when the smoke rise animation completes.
// Hides the smoke, selects a random wish, and shows the modal.
function onSmokeEnd() {
  if (currentState !== State.ANIMATING) return; // guard against double-fire from fallback

  // Hide smoke
  smoke.style.display = 'none';
  smoke.style.animation = '';

  // Pick and display a random birthday wish (Requirements 4.3, 5.1)
  wishText.textContent = selectRandomWish(wishes);

  // Show the modal backdrop — needs flex for centering (CSS has display:none base)
  modalBackdrop.style.display = 'flex';

  currentState = State.MODAL_OPEN;
}

// ── reset ──
// Restores the page to the initial Lit state.
// Requirements: 6.1, 6.2, 6.3, 6.4
function reset() {
  // Hide the modal backdrop
  modalBackdrop.style.display = 'none';

  // Hide and clean up smoke
  smoke.style.display = 'none';
  smoke.style.animation = '';

  // Relight the candle with flicker animation
  lightCandle();

  // Re-enable the button
  blowBtn.disabled = false;

  currentState = State.LIT;
}

// ── onClose ──
// Called when the modal Close button is clicked. (Requirements 5.4)
function onClose() {
  reset();
}

// ── onBackdropClick ──
// Called when the modal backdrop is clicked.
// Only closes if the click target is the backdrop itself, not the modal content.
// (Requirements 5.5)
function onBackdropClick(e) {
  if (e.target === modalBackdrop) reset();
}

// ── Event listeners ──
blowBtn.addEventListener('click', onBlow);
closeBtn.addEventListener('click', onClose);
modalBackdrop.addEventListener('click', onBackdropClick);

// ── Initialise ──
// Start the flame flickering on page load.
lightCandle();

# Implementation Plan: Happy Birthday - Blow the Candle

## Overview

Implement the single-page birthday website as three files: `index.html`, `style.css`, and `script.js`. The implementation follows the state machine defined in the design — Lit → Animating → ModalOpen → Lit — and is built with Tailwind CSS (CDN) and vanilla JavaScript. Tasks progress incrementally: structure first, then styling, then animation logic, then the modal and reset, and finally wiring and testing.

---

## Tasks

- [x] 1. Set up project file structure and base HTML
  - Create `index.html` with semantic HTML5 boilerplate
  - Add `<link>` for Google Fonts ("Press Start 2P") in `<head>`
  - Add Tailwind CSS CDN `<script>` tag in `<head>`
  - Add `<link rel="stylesheet" href="style.css">` in `<head>`
  - Add `<script src="script.js" defer></script>` before `</body>`
  - Scaffold all required DOM elements with their IDs: `#title`, `#cake-wrapper`, `#cake`, `#candle`, `#wick`, `#flame`, `#smoke`, `#prompt-text`, `#blow-btn`, `#modal-backdrop`, `#modal`, `#wish-text`, `#close-btn`
  - Create empty `style.css` and `script.js` files
  - Add HTML comments labeling each major section
  - _Requirements: 7.1, 7.2, 7.6, 1.1, 1.2, 1.3, 1.4_

- [x] 2. Implement pixel-art visual design and layout styles
  - [x] 2.1 Define CSS custom properties for the color palette
    - Add `:root` block with `--color-cream`, `--color-peach`, `--color-soft-orange`, `--color-light-brown`, `--color-pastel-pink`, `--color-shadow` variables
    - Apply `font-family: 'Press Start 2P', monospace` to `body`
    - _Requirements: 2.1, 2.2_

  - [x] 2.2 Style the page background and main layout
    - Apply warm-tone gradient to `body` background using the palette colors
    - Center `#app` content vertically and horizontally using Tailwind flex utilities
    - Ensure full-height viewport coverage
    - _Requirements: 1.5, 1.7_

  - [x] 2.3 Build the pixel-art cake illustration with CSS
    - Style `#cake-tier-bottom` as a wide, short colored rectangle with pixel border
    - Style `#cake-tier-top` as a narrower, shorter rectangle stacked above
    - Style `#candle` as a narrow tall rectangle in light brown tones
    - Style `#wick` as a thin dark line at the top of the candle
    - Style `#flame` as a teardrop shape using `clip-path` or `border-radius` in orange/yellow
    - Position `#smoke` as a narrow element above the wick, initially `display: none`
    - Add CSS comments explaining each element's construction
    - _Requirements: 1.2, 3.1_

  - [x] 2.4 Style the pixel-art button
    - Create `.pixel-btn` CSS class with thick square border (4px solid), 8-bit box-shadow (4px 4px 0px), and `border-radius: 0`
    - Apply `.pixel-btn` class to `#blow-btn` in HTML
    - Add `:hover` rule: shift shadow to 6px, translate up-left by 1px
    - Add `:active` rule: reduce shadow to 1px, translate down-right by 3px
    - Add `:disabled` rule: muted opacity and `cursor: not-allowed`
    - _Requirements: 2.3, 2.4, 2.5_

  - [x] 2.5 Style the wish modal
    - Style `#modal-backdrop` as a full-screen fixed overlay with semi-transparent dark background
    - Style `#modal` as a centered card using pixel-art border and palette colors (cream background, brown border, 8-bit shadow)
    - Apply `font-family` to `#wish-text`
    - Style `#close-btn` using `.pixel-btn` class
    - Add `.hidden` utility class (`display: none`) to `style.css`
    - Add CSS comment marking the modal section
    - _Requirements: 2.6, 5.3, 5.6_

  - [x] 2.6 Add responsive mobile styles
    - Add media query or Tailwind responsive class to scale down font size and cake dimensions on small viewports
    - Verify `#modal` has `max-width: 90vw` and appropriate padding for small screens
    - _Requirements: 1.6_

- [x] 3. Checkpoint — Open `index.html` in a browser and verify visual layout matches the design
  - Ensure the cake, candle, flame, button, and title are all visible and correctly positioned
  - Ensure the pixel font loads and is applied
  - Ask the user if the visual result looks correct before proceeding.

- [x] 4. Implement CSS keyframe animations
  - [x] 4.1 Write the flame flicker animation
    - Define `@keyframes flicker` with 5 keyframe steps: scale, rotate, and opacity variation
    - Apply the animation to `#flame` as class `.flicker`: `animation: flicker 0.6s ease-in-out infinite`
    - Add `.flicker` class to `#flame` in the initial HTML so the flame flickers on page load
    - _Requirements: 3.2, 3.3, 3.4_

  - [x] 4.2 Write the flame extinguish animation
    - Define `@keyframes extinguish` that scales the flame from full height to zero over ~0.4s
    - Create `.extinguish` class applying this animation once with `animation-fill-mode: forwards`
    - Add CSS comment explaining the animation
    - _Requirements: 4.1_

  - [x] 4.3 Write the smoke rise animation
    - Define `@keyframes smokeRise` that translates the smoke element upward (~50px) while expanding width and fading opacity to 0, over ~1.7s
    - Create `.smokeRise` class applying this animation once with `animation-fill-mode: forwards`
    - Add CSS comment explaining the animation
    - _Requirements: 4.2_

- [x] 5. Implement the JavaScript state machine and blow interaction
  - [x] 5.1 Set up state management and DOM references in `script.js`
    - Define `const State = { LIT: 'lit', ANIMATING: 'animating', MODAL_OPEN: 'modalOpen' }`
    - Define `let currentState = State.LIT`
    - Obtain all element references via `document.getElementById`
    - Add JS comments identifying each constant and reference
    - _Requirements: 7.3_

  - [x] 5.2 Define the wish pool array
    - Define `const wishes = [...]` with all 10 specified wish strings exactly as written in requirements
    - Add a comment: `// Wish pool — 10 birthday wishes (Requirements 5.2)`
    - _Requirements: 5.2_

  - [x] 5.3 Implement `selectRandomWish` as a pure, exportable function
    - Write `function selectRandomWish(pool) { return pool[Math.floor(Math.random() * pool.length)]; }`
    - Export or expose this function so it can be tested independently
    - Add JS comment referencing Property 1 from the design document
    - _Requirements: 4.3, 5.1_

  - [x] 5.4 Implement the `onBlow` handler and extinguish sequence
    - Write `onBlow()`: guard on `currentState !== State.LIT`, set state to `ANIMATING`, disable button
    - Remove `.flicker` class from flame, add `.extinguish` class
    - Attach `animationend` listener with `{ once: true }` calling `onExtinguishEnd`
    - Write `onExtinguishEnd()`: hide flame, show smoke, add `.smokeRise` class
    - Attach `animationend` listener with `{ once: true }` calling `onSmokeEnd`
    - Add JS comments for each step
    - _Requirements: 4.1, 4.2, 4.4, 4.5_

  - [x] 5.5 Implement `onSmokeEnd` and modal display
    - Write `onSmokeEnd()`: remove `.smokeRise`, hide smoke, set `wish-text` to `selectRandomWish(wishes)`, remove `.hidden` from `#modal-backdrop`, set state to `MODAL_OPEN`
    - _Requirements: 4.3, 5.1, 5.3_

  - [x] 5.6 Implement `reset`, `onClose`, and `onBackdropClick`
    - Write `reset()`: hide modal backdrop, hide smoke, remove `.hidden` and `.extinguish` from flame, add `.flicker`, re-enable button, set state to `State.LIT`
    - Write `onClose()`: call `reset()`
    - Write `onBackdropClick(e)`: if `e.target === modalBackdrop`, call `reset()`
    - Register all event listeners at script load time
    - Add JS comments for the reset flow
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 5.4, 5.5_

- [x] 6. Checkpoint — Test the full interaction flow manually
  - Open `index.html` in a browser
  - Verify: candle flickers on load, button is enabled, clicking triggers extinguish → smoke → modal with a wish, Close and backdrop click both reset the candle, button re-enables after reset
  - Ask the user to confirm the interaction works as expected.

- [ ] 7. Write automated tests
  - [ ]* 7.1 Set up testing framework
    - Install [Vitest](https://vitest.dev/) as a dev dependency (`npm install -D vitest`)
    - Create `package.json` if it doesn't exist with `"test": "vitest --run"`
    - Create `tests/` directory
    - _Requirements: 7.3_

  - [ ]* 7.2 Write unit tests for initial page state
    - Test: `#flame` has `.flicker` class on load
    - Test: `#blow-btn` is not disabled on load
    - Test: `#smoke` has `.hidden` class on load
    - Test: `#modal-backdrop` has `.hidden` class on load
    - _Requirements: 1.2, 3.1, 3.2_

  - [ ]* 7.3 Write unit tests for the blow interaction sequence
    - Test: after `onBlow()`, button is disabled and `.extinguish` is on flame
    - Test: after `onExtinguishEnd()`, flame is hidden and `.smokeRise` is on smoke
    - Test: after `onSmokeEnd()`, modal is visible and wish text is non-empty
    - Test: guard — calling `onBlow()` while `ANIMATING` causes no state change
    - Test: guard — calling `onBlow()` while `MODAL_OPEN` causes no state change
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 7.4 Write unit tests for reset behavior
    - Test: after `reset()`, modal is hidden, flame has `.flicker`, button is enabled, smoke is hidden
    - Test: `onBackdropClick` only calls `reset()` when `e.target` is the backdrop element
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 5.4, 5.5_

  - [ ]* 7.5 Write unit test for wish pool integrity
    - Test: `wishes.length === 10`
    - Test: each of the 10 specified wish strings is present in the array (exact string match)
    - _Requirements: 5.2_

  - [ ]* 7.6 Write property-based test for wish selection
    - Install `fast-check` as a dev dependency (`npm install -D fast-check`)
    - Create `tests/wishSelection.property.test.js`
    - Write property test: for any integer seed (100 runs), `selectRandomWish(wishes)` returns a value strictly contained in `wishes`
    - Annotate with tag: `// Feature: birthday-blow-candle, Property 1: Wish selection always draws from the pool`
    - **Property 1: Wish selection always draws from the pool**
    - **Validates: Requirements 4.3, 5.1, 5.7**
    - _Requirements: 4.3, 5.1, 5.7_

- [ ] 8. Final checkpoint — Run all tests and verify
  - Run `npm test` (Vitest) and confirm all tests pass
  - Review HTML, CSS, and JS files to ensure code comments are present throughout
  - Verify file structure is clean: `index.html`, `style.css`, `script.js`, `tests/`, `package.json`
  - Ask the user if there are any final adjustments needed before the project is complete.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster visual-only MVP
- `selectRandomWish` should be a pure function for testability — the JS file can use a module pattern or expose it on `window` for browser compatibility without a bundler
- CSS animation timing can be tuned after visual review in Phase 3 checkpoint
- All 10 wish strings must match requirements exactly (verbatim) — copy from `requirements.md`
- Property tests validate correctness of wish selection logic independent of the DOM

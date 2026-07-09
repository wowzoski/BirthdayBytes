# Requirements Document

## Introduction

A single-page birthday website with a pixel art / retro 8-bit aesthetic. The page features a birthday cake with a lit, animated candle. When the user clicks "Blow the Candle", the flame extinguishes with a smoke animation, and a modal appears showing a random birthday wish. The candle resets when the modal is dismissed, allowing repeated interactions. Built with HTML5, Tailwind CSS (via CDN), and vanilla JavaScript — no external JS libraries required.

## Glossary

- **Page**: The single HTML webpage that constitutes the entire application.
- **Cake_Illustration**: The pixel-art birthday cake rendered using CSS or SVG.
- **Candle**: The candle element on the cake, which has a lit and an unlit state.
- **Flame**: The animated fire element on top of the candle; visible when the candle is lit.
- **Wick**: The top portion of the candle, visible after the flame is extinguished.
- **Smoke**: The animated rising-smoke element that appears after the flame is extinguished.
- **Blow_Button**: The interactive button labeled "Blow the Candle 🎂".
- **Wish_Modal**: The overlay pop-up that displays a random birthday wish after the candle is blown out.
- **Wish_Pool**: The fixed list of 10 birthday wish strings from which a random wish is selected.
- **Pixel_Style**: A visual style characterized by thick square borders, 8-bit drop shadows, and no border-radius.
- **Reset**: The action of relighting the candle and restoring the page to its initial interactive state.

---

## Requirements

### Requirement 1: Page Layout and Visual Structure

**User Story:** As a visitor, I want to see a well-structured birthday page with a clear title, cake, and prompt text, so that I immediately understand the purpose and context of the page.

#### Acceptance Criteria

1. THE Page SHALL display a prominent title reading "Happy Birthday to You!" at the top of the viewport.
2. THE Page SHALL render the Cake_Illustration with the Candle centered on the page below the title.
3. THE Page SHALL display the text "Make a wish before you blow the candle" below the Cake_Illustration.
4. THE Page SHALL display the Blow_Button below the prompt text.
5. THE Page SHALL use a warm-tone gradient or birthday-themed pixel background (confetti or balloons) for the background.
6. WHEN the Page is loaded on a mobile device, THE Page SHALL arrange all content in a single responsive column without horizontal overflow.
7. WHEN the Page is loaded on a desktop device, THE Page SHALL center all content horizontally within the viewport.

---

### Requirement 2: Visual Design and Styling

**User Story:** As a visitor, I want the page to have a consistent pixel-art / retro 8-bit look and feel, so that the experience feels fun and cohesive.

#### Acceptance Criteria

1. THE Page SHALL apply the "Press Start 2P" or "Pixelify Sans" Google Font to all text elements.
2. THE Page SHALL use a color palette restricted to cream, peach, soft orange, light brown, and pastel pink tones.
3. THE Blow_Button SHALL use Pixel_Style: thick square border, 8-bit drop shadow, and no border-radius.
4. WHEN the cursor hovers over the Blow_Button, THE Blow_Button SHALL change its visual appearance to indicate an interactive hover state (e.g., shift in shadow offset or slight color change).
5. WHEN the Blow_Button is pressed (active state), THE Blow_Button SHALL visually depress using a pressed/active CSS style (e.g., reduced shadow and slight downward translate).
6. THE Wish_Modal SHALL use Pixel_Style consistent with the overall design theme.

---

### Requirement 3: Flame Animation (Lit State)

**User Story:** As a visitor, I want to see a realistic flickering flame on the candle, so that the cake feels alive and engaging before I interact with it.

#### Acceptance Criteria

1. WHEN the Page loads, THE Flame SHALL be visible on top of the Candle.
2. WHILE the candle is in the lit state, THE Flame SHALL continuously play a flicker animation using CSS keyframes.
3. THE Flame animation SHALL loop indefinitely until the candle is blown out.
4. THE Flame SHALL be implemented using CSS/SVG only, without external animation libraries.

---

### Requirement 4: Blow the Candle Interaction

**User Story:** As a visitor, I want to click the button to blow out the candle and trigger the full animation sequence, so that I experience the fun interactive birthday moment.

#### Acceptance Criteria

1. WHEN the Blow_Button is clicked and the candle is in the lit state, THE Flame SHALL play an extinguish animation (flame shrinks then disappears).
2. WHEN the Flame extinguish animation completes, THE Smoke SHALL appear at the Wick and play a rising-and-fading animation lasting approximately 1.5 to 2 seconds.
3. WHEN the Smoke animation completes, THE Wish_Modal SHALL appear displaying one randomly selected wish from the Wish_Pool.
4. WHILE the candle is in the unlit state (after being blown), THE Blow_Button SHALL be disabled so that it cannot trigger another blow sequence until the candle resets.
5. WHEN the Blow_Button is clicked and the candle is already in the unlit state, THE Page SHALL take no action.

---

### Requirement 5: Birthday Wish Modal

**User Story:** As a visitor, I want to see a birthday wish in a styled pop-up, so that I feel a personal and joyful message after blowing the candle.

#### Acceptance Criteria

1. THE Wish_Modal SHALL display exactly one wish string selected at random from the Wish_Pool each time it is shown.
2. THE Wish_Pool SHALL contain exactly these 10 wish strings:
   - "Wishing you a day filled with love, laughter, and all your favorite things!"
   - "May this new year of your life bring you endless happiness and beautiful surprises."
   - "Happy Birthday! May all your dreams and wishes come true this year."
   - "Here's to another year of amazing memories and adventures ahead!"
   - "May your birthday be the start of your best year yet, full of joy and success."
   - "Sending you warm wishes and lots of love on your special day!"
   - "Happy Birthday! May you be blessed with good health, happiness, and prosperity."
   - "Cheers to you! May this year bring more smiles than tears, and more joy than worries."
   - "Wishing you a wonderful birthday and an even more wonderful year ahead!"
   - "Happy Birthday! Never stop shining as bright as you do."
3. THE Wish_Modal SHALL contain a visible "Close" button.
4. WHEN the "Close" button is clicked, THE Wish_Modal SHALL dismiss and THE Page SHALL trigger a Reset.
5. WHEN the user clicks outside the Wish_Modal (on the overlay backdrop), THE Wish_Modal SHALL dismiss and THE Page SHALL trigger a Reset.
6. THE Wish_Modal SHALL be centered on the screen over a semi-transparent overlay backdrop.
7. IF a subsequent Blow_Button press occurs after a Reset, THE Wish_Modal SHALL display a new randomly selected wish (which MAY be the same wish if randomly chosen).

---

### Requirement 6: Candle Reset

**User Story:** As a visitor, I want the candle to relight after I dismiss the wish modal, so that I can blow it out again and receive a new birthday wish.

#### Acceptance Criteria

1. WHEN the Wish_Modal is dismissed (via "Close" button or backdrop click), THE Candle SHALL transition back to the lit state with the Flame visible and animating.
2. WHEN the Reset occurs, THE Blow_Button SHALL become enabled and interactive again.
3. WHEN the Reset occurs, THE Smoke element SHALL be hidden and its animation SHALL be cleared.
4. THE Reset transition SHALL occur immediately upon modal dismissal without requiring a page reload.

---

### Requirement 7: Technical Implementation Constraints

**User Story:** As a developer, I want the project structured cleanly and built with specified technologies, so that the code is maintainable and ready to push to a GitHub repository.

#### Acceptance Criteria

1. THE Page SHALL be implemented as either a single `index.html` file or split into three files: `index.html`, `style.css`, and `script.js`.
2. THE Page SHALL use Tailwind CSS (via CDN) for layout and utility styles.
3. THE Page SHALL use only vanilla JavaScript — no external JS libraries or frameworks.
4. THE Page SHALL use only CSS keyframe animations for the Flame flicker, Flame extinguish, and Smoke animations — no external animation libraries.
5. THE Page SHALL include code comments throughout HTML, CSS, and JS files to explain key sections and ease future modification.
6. THE Page SHALL load the "Press Start 2P" or "Pixelify Sans" font via Google Fonts link tag.

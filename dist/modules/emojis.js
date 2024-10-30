"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomEmojis = generateRandomEmojis;
function generateRandomEmojis(count, modalContent) {
    const emojiRange = [0x1F600, 0x1F64F]; // Діапазон емодзі
    const emojiContainer = document.createElement("div");
    emojiContainer.className = "emojis";
    for (let i = 0; i < count; i++) {
        const randomCodePoint = Math.floor(Math.random() * (emojiRange[1] - emojiRange[0] + 1)) + emojiRange[0];
        const emoji = String.fromCodePoint(randomCodePoint);
        const emojiSpan = document.createElement("span");
        emojiSpan.textContent = emoji;
        emojiSpan.style.fontSize = "24px";
        emojiSpan.style.margin = "5px";
        emojiContainer.appendChild(emojiSpan);
    }
    modalContent.appendChild(emojiContainer);
}

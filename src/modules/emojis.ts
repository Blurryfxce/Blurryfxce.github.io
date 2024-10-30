export function generateRandomEmojis(count: number, modalContent: HTMLElement): void {
    const emojiRange: [number, number] = [0x1F600, 0x1F64F]; // Діапазон емодзі
    const emojiContainer: HTMLDivElement = document.createElement("div");
    emojiContainer.className = "emojis";

    for (let i = 0; i < count; i++) {
        const randomCodePoint: number = Math.floor(Math.random() * (emojiRange[1] - emojiRange[0] + 1)) + emojiRange[0];
        const emoji: string = String.fromCodePoint(randomCodePoint);

        const emojiSpan: HTMLSpanElement = document.createElement("span");
        emojiSpan.textContent = emoji;
        emojiSpan.style.fontSize = "24px";
        emojiSpan.style.margin = "5px";

        emojiContainer.appendChild(emojiSpan);
    }

    modalContent.appendChild(emojiContainer);
}

import { generateRandomEmojis } from './emojis';
export const openModalButton = document.getElementById("openModal");
export const modal = document.getElementById("modal");
export const closeModalButton = document.getElementById("closeModal");
export const modalContent = document.querySelector(".modal-content");
export function setupModal() {
    if (!openModalButton || !modal || !closeModalButton || !modalContent)
        return;
    openModalButton.addEventListener("click", () => {
        modal.style.display = "block";
        generateRandomEmojis(5, modalContent); // Генеруємо 5 рандомних емодзі при відкритті модального вікна
    });
    closeModalButton.addEventListener("click", () => {
        var _a;
        modal.style.display = "none";
        (_a = modalContent.querySelector(".emojis")) === null || _a === void 0 ? void 0 : _a.remove(); // Видалення попередніх емодзі при закритті
    });
    window.addEventListener("click", (event) => {
        var _a;
        if (event.target === modal) {
            modal.style.display = "none";
            (_a = modalContent.querySelector(".emojis")) === null || _a === void 0 ? void 0 : _a.remove(); // Видалення емодзі при закритті
        }
    });
}

import { generateRandomEmojis } from './emojis';

export const openModalButton: HTMLElement | null = document.getElementById("openModal");
export const modal: HTMLElement | null = document.getElementById("modal");
export const closeModalButton: HTMLElement | null = document.getElementById("closeModal");
export const modalContent: HTMLElement | null = document.querySelector(".modal-content");

export function setupModal(): void {
    if (!openModalButton || !modal || !closeModalButton || !modalContent) return;

    openModalButton.addEventListener("click", () => {
        modal.style.display = "block";
        generateRandomEmojis(5, modalContent); // Генеруємо 5 рандомних емодзі при відкритті модального вікна
    });

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
        modalContent.querySelector(".emojis")?.remove(); // Видалення попередніх емодзі при закритті
    });

    window.addEventListener("click", (event: MouseEvent) => {
        if (event.target === modal) {
            modal.style.display = "none";
            modalContent.querySelector(".emojis")?.remove(); // Видалення емодзі при закритті
        }
    });
}

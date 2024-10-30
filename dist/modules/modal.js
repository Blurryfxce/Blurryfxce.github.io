"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalContent = exports.closeModalButton = exports.modal = exports.openModalButton = void 0;
exports.setupModal = setupModal;
const emojis_1 = require("./emojis");
exports.openModalButton = document.getElementById("openModal");
exports.modal = document.getElementById("modal");
exports.closeModalButton = document.getElementById("closeModal");
exports.modalContent = document.querySelector(".modal-content");
function setupModal() {
    if (!exports.openModalButton || !exports.modal || !exports.closeModalButton || !exports.modalContent)
        return;
    exports.openModalButton.addEventListener("click", () => {
        exports.modal.style.display = "block";
        (0, emojis_1.generateRandomEmojis)(5, exports.modalContent); // Генеруємо 5 рандомних емодзі при відкритті модального вікна
    });
    exports.closeModalButton.addEventListener("click", () => {
        var _a;
        exports.modal.style.display = "none";
        (_a = exports.modalContent.querySelector(".emojis")) === null || _a === void 0 ? void 0 : _a.remove(); // Видалення попередніх емодзі при закритті
    });
    window.addEventListener("click", (event) => {
        var _a;
        if (event.target === exports.modal) {
            exports.modal.style.display = "none";
            (_a = exports.modalContent.querySelector(".emojis")) === null || _a === void 0 ? void 0 : _a.remove(); // Видалення емодзі при закритті
        }
    });
}

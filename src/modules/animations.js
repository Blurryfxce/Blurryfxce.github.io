"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = void 0;
exports.setupHeaderScrollAnimation = setupHeaderScrollAnimation;
exports.header = document.getElementById("header");
function setupHeaderScrollAnimation() {
    if (!exports.header)
        return;
    window.addEventListener("scroll", () => {
        exports.header.style.backgroundColor = window.scrollY > 50 ? "#555" : "#333";
    });
}

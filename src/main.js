"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Налаштовуємо модальне вікно
(0, setupModal)();
// Налаштовуємо анімацію при скролі
(0, setupHeaderScrollAnimation)();
// Завантажуємо дані через fetch
(0, fetchPosts)();

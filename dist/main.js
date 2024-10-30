"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = require("./modules/modal");
const animations_1 = require("./modules/animations");
const dataFetch_1 = require("./modules/dataFetch");
// Налаштовуємо модальне вікно
(0, modal_1.setupModal)();
// Налаштовуємо анімацію при скролі
(0, animations_1.setupHeaderScrollAnimation)();
// Завантажуємо дані через fetch
(0, dataFetch_1.fetchPosts)();

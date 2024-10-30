import { setupModal } from './modules/modal';
import { setupHeaderScrollAnimation } from './modules/animations';
import { fetchPosts } from './modules/dataFetch';
// Налаштовуємо модальне вікно
setupModal();
// Налаштовуємо анімацію при скролі
setupHeaderScrollAnimation();
// Завантажуємо дані через fetch
fetchPosts();

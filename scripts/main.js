"use strict";
// валідатор для статей
const articleValidator = {
    validate: (data) => {
        const errors = [];
        if (!data.title || data.title.length < 5) {
            errors.push('Title must be at least 5 characters.');
        }
        if (!data.body) {
            errors.push('Body is required.');
        }
        return {
            isValid: errors.length === 0,
            errors: errors.length ? errors : undefined,
        };
    },
};
// валідатор для товарів
const productValidator = {
    validate: (data) => {
        const errors = [];
        if (!data.name) {
            errors.push('Name is required.');
        }
        if (data.price < 0) {
            errors.push('Price must be a positive number.');
        }
        return {
            isValid: errors.length === 0,
            errors: errors.length ? errors : undefined,
        };
    },
};
// функція для створення нової версії
function createNewVersion(content, updates) {
    const updatedContent = Object.assign(Object.assign(Object.assign({}, content), updates), { updatedAt: new Date() });
    return Object.assign(Object.assign({}, updatedContent), { version: content.version + 1, previousVersions: [...content.previousVersions, content] });
}
// приклад використання версіонування
const initialArticle = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: undefined,
    status: 'draft',
    title: 'Init title',
    body: 'Init body',
    author: 'Some Author',
    tags: ['initial', 'article'],
    version: 1,
    previousVersions: [],
};
const updatedArticle = createNewVersion(initialArticle, {
    title: 'Updated Title',
    body: 'Updated Body',
});
// приклад масиву статей
const articles = [
    {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
        title: 'Article One',
        body: 'This is first article wowzers',
        author: 'Oleg Randomchenko',
        tags: ['tag1', 'tag2'],
    },
];
// операції з контентом
const articleOperations = {
    create: (content) => {
        const newArticle = Object.assign(Object.assign({}, content), { id: String(Date.now()), createdAt: new Date(), updatedAt: new Date() });
        articles.push(newArticle);
        return newArticle;
    },
    update: (id, updates) => {
        const articleIndex = articles.findIndex((a) => a.id === id);
        if (articleIndex === -1)
            throw new Error('Article not found');
        const updatedArticle = Object.assign(Object.assign(Object.assign({}, articles[articleIndex]), updates), { updatedAt: new Date() });
        articles[articleIndex] = updatedArticle;
        return updatedArticle;
    },
    delete: (id) => {
        const articleIndex = articles.findIndex((a) => a.id === id);
        if (articleIndex === -1)
            return false;
        articles.splice(articleIndex, 1);
        return true;
    },
    get: (id) => articles.find((a) => a.id === id) || null,
};
// приклад створення нової статті
const newArticle = articleOperations.create({
    title: 'Definitely new article!',
    body: 'New article body.',
    author: 'Oleg Randomchenko',
    status: 'draft',
});
console.log(newArticle);
console.log(articleOperations.get('1'));

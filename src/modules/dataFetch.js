"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsContainer = void 0;
exports.fetchPosts = fetchPosts;
exports.postsContainer = document.getElementById("posts");
function fetchPosts() {
    if (!exports.postsContainer)
        return;
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=15")
        .then((response) => response.json())
        .then((posts) => {
        exports.postsContainer.innerHTML = "";
        posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            exports.postsContainer.appendChild(postElement);
        });
    })
        .catch((error) => {
        exports.postsContainer.innerHTML = "Помилка завантаження даних.";
        console.error(error);
    });
}

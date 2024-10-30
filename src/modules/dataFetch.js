export const postsContainer = document.getElementById("posts");
export function fetchPosts() {
    if (!postsContainer)
        return;
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=15")
        .then((response) => response.json())
        .then((posts) => {
        postsContainer.innerHTML = "";
        posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            postsContainer.appendChild(postElement);
        });
    })
        .catch((error) => {
        postsContainer.innerHTML = "Помилка завантаження даних.";
        console.error(error);
    });
}

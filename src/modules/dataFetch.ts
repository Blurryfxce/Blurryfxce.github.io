import { Post } from '../types/generalTypes';

export const postsContainer: HTMLElement | null = document.getElementById("posts");

export function fetchPosts(): void {
    if (!postsContainer) return;

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=15")
        .then((response: Response) => response.json())
        .then((posts: Post[]) => {
            postsContainer.innerHTML = "";
            
            posts.forEach((post: Post) => {
                const postElement: HTMLDivElement = document.createElement("div");
                postElement.className = "post";
                postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                postsContainer.appendChild(postElement);
            });
        })
        .catch((error: any) => {
            postsContainer.innerHTML = "Помилка завантаження даних.";
            console.error(error);
        });
}

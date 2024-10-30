export const header: HTMLElement | null = document.getElementById("header");

export function setupHeaderScrollAnimation(): void {
    if (!header) return;

    window.addEventListener("scroll", () => {
        header.style.backgroundColor = window.scrollY > 50 ? "#555" : "#333";
    });
}

export const header = document.getElementById("header");
export function setupHeaderScrollAnimation() {
    if (!header)
        return;
    window.addEventListener("scroll", () => {
        header.style.backgroundColor = window.scrollY > 50 ? "#555" : "#333";
    });
}

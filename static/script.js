// Character Counter

const textarea = document.querySelector("textarea");

const counter = document.createElement("p");

counter.style.textAlign = "right";
counter.style.marginTop = "8px";
counter.style.color = "#ffffff";
counter.style.fontSize = "14px";

textarea.parentNode.insertBefore(counter, textarea.nextSibling);

textarea.addEventListener("input", () => {
    counter.textContent = `${textarea.value.length} characters`;
});

// Loading Animation

const form = document.querySelector("form");
const button = document.querySelector("button");

form.addEventListener("submit", () => {

    button.innerHTML = "⏳ Translating...";
    button.disabled = true;

});
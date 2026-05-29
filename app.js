const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let currentLetter = "A";

// Load saved data from phone/browser
let data = JSON.parse(localStorage.getItem("alphabetBook")) || {};

// Initialize empty letters if missing
alphabet.forEach(letter => {
    if (!data[letter]) {
        data[letter] = "";
    }
});

const editor = document.getElementById("editor");
const currentLetterEl = document.getElementById("currentLetter");
const tabsContainer = document.getElementById("tabs");

// Render alphabet tabs
function renderTabs() {
    tabsContainer.innerHTML = "";

    alphabet.forEach(letter => {
        const tab = document.createElement("div");
        tab.className = "tab";
        tab.textContent = letter;

        if (letter === currentLetter) {
            tab.classList.add("active");
        }

        tab.onclick = () => {
            switchLetter(letter);
        };

        tabsContainer.appendChild(tab);
    });
}

// Switch letter page
function switchLetter(letter) {
    saveCurrent();

    currentLetter = letter;
    currentLetterEl.textContent = letter;

    editor.innerHTML = data[letter];

    renderTabs();
}

// Save current page
function saveCurrent() {
    data[currentLetter] = editor.innerHTML;
    localStorage.setItem("alphabetBook", JSON.stringify(data));
}

// Auto-save while typing
editor.addEventListener("input", () => {
    saveCurrent();
});

// Initialize app
function init() {
    editor.innerHTML = data[currentLetter];
    currentLetterEl.textContent = currentLetter;
    renderTabs();
}

init();

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

init();// EXPORT BACKUP

document.getElementById("exportBtn").addEventListener("click", () => {

    const backupData = JSON.stringify(data, null, 2);

    const blob = new Blob(
        [backupData],
        { type: "application/json" }
    );

    const link = document.createElement("a");

    const date = new Date()
        .toISOString()
        .split("T")[0];

    link.href = URL.createObjectURL(blob);

    link.download =
        `GrandmasAlphabetBook-${date}.json`;

    link.click();
});

// IMPORT BACKUP

document.getElementById("importBtn").addEventListener("click", () => {

    const fileInput =
        document.getElementById("importFile");

    const file = fileInput.files[0];

    if (!file) {
        alert("Please choose a backup file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {

        try {

            const importedData =
                JSON.parse(event.target.result);

            data = importedData;

            localStorage.setItem(
                "alphabetBook",
                JSON.stringify(data)
            );

            switchLetter(currentLetter);

            alert("Backup restored!");

        } catch {

            alert("Invalid backup file.");
        }
    };

    reader.readAsText(file);
});

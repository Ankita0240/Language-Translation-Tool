const HISTORY_KEY = "translationHistory";

// ==========================
// Get History
// ==========================

function getHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}

// ==========================
// Save History
// ==========================

function saveHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// ==========================
// Add Translation
// ==========================

function addHistory(original, translated, source, target) {

    if (!original || !translated) return;

    let history = getHistory();

    const exists = history.some(item =>
        item.original === original &&
        item.translated === translated &&
        item.source === source &&
        item.target === target
    );

    if (exists) return;

    history.unshift({
        original,
        translated,
        source,
        target,
        time: new Date().toLocaleString()
    });

    saveHistory(history);

    loadHistory();

}

// ==========================
// Load History
// ==========================

function loadHistory() {

    const historyList = document.getElementById("historyList");

    if (!historyList) return;

    const history = getHistory();

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML =
        `<p class="no-history">No translation history yet.</p>`;

        return;

    }

    history.forEach((item,index)=>{

        historyList.innerHTML += `

        <div class="history-card">

            <div class="history-top">

                <h3>${item.source} ➜ ${item.target}</h3>

                <button
                    class="delete-btn"
                    onclick="deleteHistory(${index})">

                    Delete

                </button>

            </div>

            <p class="history-time">

                ${item.time}

            </p>

            <div class="history-item">

                <strong>Original</strong>

                <p>${item.original}</p>

            </div>

            <div class="history-item">

                <strong>Translated</strong>

                <p>${item.translated}</p>

            </div>

        </div>

        `;

    });

}

// ==========================
// Delete One History
// ==========================

function deleteHistory(index){

    let history=getHistory();

    history.splice(index,1);

    saveHistory(history);

    loadHistory();

}

// ==========================
// Clear History
// ==========================

function clearHistory(){

    if(confirm("Delete all translation history?")){

        localStorage.removeItem(HISTORY_KEY);

        loadHistory();

    }

}

// ==========================
// Clear Translator
// ==========================

function clearForm(){

    // Clear textarea
    document.querySelector("textarea").value="";

    // Reset dropdowns
    document.querySelector("select[name='source_lang']").selectedIndex=0;
    document.querySelector("select[name='target_lang']").selectedIndex=0;

    // Hide translated output
    const output=document.querySelector(".output");

    if(output){

        output.style.display="none";

    }

}

// ==========================
// Initialize
// ==========================

document.addEventListener("DOMContentLoaded",()=>{

    loadHistory();

    const original=document.querySelector(".original-text");

    const translated=document.querySelector(".translated-text");

    if(original && translated){

        const source=document.querySelector("select[name='source_lang']").selectedOptions[0].text;

        const target=document.querySelector("select[name='target_lang']").selectedOptions[0].text;

        addHistory(

            original.innerText.trim(),

            translated.innerText.trim(),

            source,

            target

        );

    }

});

// Make functions available globally

window.deleteHistory = deleteHistory;

window.clearHistory = clearHistory;

window.clearForm = clearForm;
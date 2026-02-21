let originalData = [];
let headers = [];

window.onload = function () {
    fetch("students.csv")
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split("\n");

            headers = rows[0].split(",");
            originalData = rows.slice(1).map(row => row.split(","));

            displayTable(originalData);
        });
};

function displayTable(data) {
    const thead = document.querySelector("#dataTable thead");
    const tbody = document.querySelector("#dataTable tbody");

    thead.innerHTML = "";
    tbody.innerHTML = "";

    // Create Header
    const headerRow = document.createElement("tr");
    headers.forEach(header => {
        const th = document.createElement("th");
        th.innerText = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create Rows
    data.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
            const td = document.createElement("td");
            td.innerText = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function searchStudent() {
    const input = document.getElementById("searchInput").value.toLowerCase();

    const filtered = originalData.filter(row =>
        row.some(cell => cell.toLowerCase().includes(input))
    );

    displayTable(filtered);
}

function calculateAverage() {
    let total = 0;
    let count = 0;

    originalData.forEach(row => {
        row.forEach(cell => {
            if (!isNaN(cell) && cell.trim() !== "") {
                total += Number(cell);
                count++;
            }
        });
    });

    let average = (total / count).toFixed(2);
    document.getElementById("result").innerText =
        "Average Score: " + average;
}

function highlightLowScores() {
    const rows = document.querySelectorAll("#dataTable tbody tr");

    rows.forEach(row => {
        row.querySelectorAll("td").forEach(cell => {
            if (!isNaN(cell.innerText) && Number(cell.innerText) < 25) {
                row.classList.add("low-score");
            }
        });
    });
}
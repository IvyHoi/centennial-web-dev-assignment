function clickHere() {
    let rows = document.getElementById('rows').value;
    let columns = document.getElementById('columns').value;
    if (rows > 10 || columns > 10) {
        alert("Please enter number within 10!");} 
    else {
        const container = document.getElementById('table');
        while (table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < columns; j++) {
                const cell = document.createElement('td');
                const cellText = document.createTextNode((i + 1) * (j + 1));

                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            container.appendChild(row);
        }
    }
}
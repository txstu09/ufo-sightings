var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $SearchBtn = document.querySelector("#search");

$dtSearchBtn.addEventListener("click", handleSearch);

var filteredSightings = data;

function renderTable() {
    $tbody.innerHTML = "";
    for(var x = 0; x < filteredSightings.length; x++) {
        var sighting = filteredSightings[x];
        var fields = Object.keys(sighting);
        var $row = $tbody.insertRow(x);
        for(var y = 0; y < fields.length; y++) {
            var field = fields[y];
            var $cell = $row.insertCell(y);
            $cell.innerText = sighting[field];
        }
    }
}
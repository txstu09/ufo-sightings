var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $SearchBtn = document.querySelector("#search");

$SearchBtn.addEventListener("click", handleSearch);

var filteredSightings = dataSet;

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
        console.log(x);
    }
}

function handleSearch() {
    var filterDate = $dateInput.nodeValue;
    filteredSightings = dataSet.filter(function(sighting) {
        var sightingDate = sighting.datetime;
        return sightingDate === filterDate;
    });
    renderTable();
}

renderTable();
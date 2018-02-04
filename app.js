var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $searchBtn = document.querySelector("#search");

$searchBtn.addEventListener("click", handleSearch);

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
    }
}

function handleSearch() {
    var filterDate = $dateInput.value;
    console.log(filterDate);
    if(filterDate == "") {
        renderTable();
    }
    else {
        filteredSightings = dataSet.filter(function(sighting) {
            var sightingDate = sighting.datetime;
            //console.log(test);
            return sightingDate === filterDate;
        });
        renderTable();
    }
    filteredSightings = dataSet;
}

renderTable();
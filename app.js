var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $searchBtn = document.querySelector("#search");

$searchBtn.addEventListener("click", handleSearch);

var filteredSightings = dataSet;

renderTable();

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
/*
function handleSearch() {
    var filterDate = $dateInput.value;
    var filterCity = $cityInput.value.toLowerCase();

    if(filterDate == "" && filterCity == "") {
        renderTable();
    }
    else {
        filteredSightings = dataSet.filter(function(sighting) {
            var sightingDate = sighting.datetime;
            var sightingCity = sighting.city;
            
            return sightingDate === filterDate && sightingCity === filterCity;
        });
        renderTable();
    }
    filteredSightings = dataSet;
}
*/

function handleSearch() {
    var filterArray = [{
        "key":"datetime",
        "value":$dateInput.value
    },{
        "key":"city",
        "value":$cityInput.value.toLowerCase()
    }];
    
    var tableData = dataSet;

    filterArray.forEach(input => {
        var filterKey = input.key;
        var filterValue = input.value;
        
        if(filterValue == "") {
            return;
        } else {
            tableData = tableData.filter(sighting => {
                return filterValue === sighting[filterKey];
            });
        };
        
    });
    filteredSightings = tableData;
    renderTable();
    /*
    if(filterDate == "" && filterCity == "") {
        renderTable();
    }
    else {
        filteredSightings = dataSet.filter(function(sighting) {
            var sightingDate = sighting.datetime;
            var sightingCity = sighting.city;
            
            return sightingDate === filterDate && sightingCity === filterCity;
        });
        renderTable();
    }
    filteredSightings = dataSet;
    */
}
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $searchBtn = document.querySelector("#search");
var dropdownGroups = ["city","state", "country", "shape"];

const states = [...new Set(dataSet.map(item => item.state))];
const countries = [...new Set(dataSet.map(item => item.country))];
const shapes = [...new Set(dataSet.map(item => item.shape))];


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

/*d3.select("#search-menu")
    .append("input")
    .attr("type", "text")
    .attr("class", "form-control")
    .attr("id", "newinput")
    .attr("placeholder", "newinput");
*/
function searchMenu() {
    var fields = ["date1","city1","state1","country1","shape1"];
    for(let i = 0; i < fields.length; i++) {
        let input = d3.select("#search-menu").append("input");
        input
            .attr("type", "text")
            .attr("class", "form-control")
            .attr("id", fields[i])
            .attr("placeholder", fields[i]);
    }
}
searchMenu();

function searchDropdown(list, name) {
    var dropdown = d3.select("#search-menu").append("select")
    dropdown
        .attr("id", name)
        .append("option")
        .attr("value", "")
        .attr("selected", "selected")
        .text("Select " + name);

    for(let i = 0; i < list.length; i++) {
        let options = d3.select("#"+name).append("option");
        options
            .attr("value", list[i])
            .text(list[i]);
    }
}
//searchDropdown(countries, "country-dropdown");
//searchDropdown(shapes, "shape-dropdown");
//searchDropdown(states, "state-dropdown");

function dropdownListCreate(dataKey) {
    var dropList = [...new Set(dataSet.map(item => item[dataKey]))];
    dropList = dropList.sort();
    return dropList;
}

for(let i = 0; i < dropdownGroups.length; i++) {
    searchDropdown(dropdownListCreate(dropdownGroups[i]), dropdownGroups[i]);
}

function dropdownFilterValue(selectID) {
    var filterValue = document.getElementById(selectID).value;
    return [selectID, filterValue];
}


var filteredDropdownData = dataSet;

function dropdownFilterData(selectionArray) {
    var key = selectionArray[0];
    var value = selectionArray[1];

    filteredDropdownData = dataSet.filter(function(data) {
        var filterData = data[key];
        return filterData == value;
    })
    return filteredDropdownData;
}
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $searchBtn = document.querySelector("#search");
var dropdownGroups = ["city","state", "country", "shape"];

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
renderTable();

var filteredDropdownData = dataSet;

function dropdownFilterData(selectionArray) {
    var key = selectionArray[0];
    var value = selectionArray[1];
    if(key == "") {
        filteredDropdownData = dataSet;
    }
    else {
        filteredDropdownData = dataSet.filter(function(data) {
            var filterData = data[key];
            return filterData == value;
        });
    }
    
    return [key, filteredDropdownData];
}

function dropdownListCreate(filterData) {
    let dataKey = filterData[0];
    let dataset = filterData[1];
    var dropList = [...new Set(dataset.map(item => item[dataKey]))];
    dropList = dropList.sort();
    return [dropList, dataKey];
}

function searchDropdown(dropdownArray) {
    var list = dropdownArray[0];
    var name = dropdownArray[1];


    var dropdown = d3.select("#search-menu").append("select")
    dropdown
        .attr("id", name)
        .on("change", onchange)
        .attr("class", "select-dropdown")
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

for(let i = 0; i < dropdownGroups.length; i++) {
    searchDropdown(dropdownListCreate([dropdownGroups[i], filteredDropdownData]));
}

function dropdownFilterValue(selectID) {
    var filterValue = document.getElementById(selectID).value;
    return [selectID, filterValue];
}

function onchange() {
    console.log("this.id " + this.id);
    let filterValue = dropdownFilterValue(this.id);
    console.log(filterValue);
    let filterData = dropdownFilterData(filterValue);
    console.log(filterData);
    let dropdownList = dropdownListCreate(filterData);
    console.log(dropdownList);
    //NOTE: need to delete existing dropdowns before creating new ones, or update existing options...?
    var element = document.getElementById("search-menu");
    element.innerHTML = "";
    searchDropdown(dropdownList);
}
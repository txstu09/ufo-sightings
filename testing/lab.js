var filteredSightings = dataSet;
var filteredDropdownData = dataSet;
var dropdownNames = ["city","state", "country", "shape"];

//var allStates = [...new Set(dataSet.map(item => item.state))];
//var allCountries = [...new Set(dataSet.map(item => item.country))];
//var allShapes = [...new Set(dataSet.map(item => item.shape))];
//var allStates = [...new Set(dataSet.map(item => item.state))];
var searchGroups = {};
dropdownNames.forEach(function(key) {
    let valueList = dataSet.map(obj => obj[key]);
    let uniqueList = Array.from(new Set(valueList));
    uniqueList = uniqueList.sort();
    uniqueList.unshift("");
    searchGroups[key] = uniqueList;
})


function createDropdowns() {
    dropdownNames.forEach(function(item) {
        var menu = d3.select("#search-menu").append("select")
        
        menu.attr("id", item)
            //.on("change", onchange)
            .attr("class", "select-dropdown")
            .append("option")
            .attr("value", "")
            .attr("selected", "selected")
            .text("Select " + item);
        
        menu.selectAll("option")
            .data(searchGroups[item])
            .enter()
            .append("option")
            .attr("value", d => d)
            .text(d => d);
    })
}
createDropdowns();

function updateDropdowns(selectedValue) {
    if(selectedValue == "") {
        filteredDropdownData = dataSet;
    }
    else {
        filteredDropdownData = dataSet.filter(function(data) {
            var filterData = data[key];
            return filterData === selectedValue;
        });
    }
}
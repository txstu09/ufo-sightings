var filteredSightings = dataSet;
var filteredDropdownData = dataSet;
var dropdownGroups = ["city","state", "country", "shape"];

//var allStates = [...new Set(dataSet.map(item => item.state))];
//var allCountries = [...new Set(dataSet.map(item => item.country))];
//var allShapes = [...new Set(dataSet.map(item => item.shape))];
//var allStates = [...new Set(dataSet.map(item => item.state))];
var searchGroups = {};
dropdownGroups.forEach(function(key) {
    let valueList = dataSet.map(obj => obj[key]);
    let uniqueList = Array.from(new Set(valueList));
    uniqueList = uniqueList.sort();
    uniqueList.unshift("");
    searchGroups[key] = uniqueList;
})


function createDropdowns() {
    dropdownGroups.forEach(function(item) {
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
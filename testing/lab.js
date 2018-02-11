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
            .on("change", onchange)
            .attr("class", "select-dropdown")
            .append("option")
            .attr("value", "")
            .attr("selected", "selected")
            .text("All " + item);
        
        menu.selectAll("option")
            .data(searchGroups[item])
            .enter()
            .append("option")
            .attr("value", d => d)
            .text(d => d);
    })
}
createDropdowns();

//Place this within onchange func.  Grab select ID in onchange and pass to this func alogn with value
function filterDropdown(selectedValue, selectedKey) {
    if(selectedValue == "") {
        filteredDropdownData = dataSet;
    }
    else {
        filteredDropdownData = dataSet.filter(function(data) {
            var filterData = data[selectedKey];
            return filterData === selectedValue;
        });
    }
    return [filteredDropdownData, selectedKey];
}

function onchange() {
    let value = document.getElementById(this.id).value;
    let key = this.id;

    var filterList = filterDropdown(value, key)
    updateDropdowns(filterList[0], filterList[1]);
}

function updateDropdowns(dropdownData, selectedKey) {
    var searchGroups = {};
    var newDropdownNames = dropdownNames.filter(function(data) {
        return selectedKey != data;
    });
    newDropdownNames.forEach(function(key) {
        let valueList = dropdownData.map(obj => obj[key]);
        let uniqueList = Array.from(new Set(valueList));
        uniqueList = uniqueList.sort();
        uniqueList.unshift("");
        searchGroups[key] = uniqueList;
    })
    newDropdownNames.forEach(function(item) {
        var menu = d3.select(`#${item}`)
        
        menu.selectAll("option")
            .data(searchGroups[item])
            .exit()
            .remove()
            .enter()
            .append("option")
            .attr("value", d => d)
            .text(d => d);
    })
}
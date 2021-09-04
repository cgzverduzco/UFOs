// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

// For get the number of sights
var numberSight = tableData.length;
document.getElementById("numberSight").innerHTML = numberSight;

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {}

// 3. Use this function to update the filters. 
function updateFilters() {
    // 4a. Save the element that was changed as a variable.    
  let changedElement = d3.select(this);
  //console.log("elemet: " + changedElement);

  // 4b. Save the value that was changed as a variable.
  let elementValue = changedElement.property("value");
  //console.log("valor-------" + elementValue);

  // 4c. Save the id of the filter that was changed as a variable.
  let filterId = changedElement.attr("id");
  console.log("filtro:" + filterId);

  // Add button for clean filters
  if (filterId === "clean-btn") {
    filters = {};
    document.getElementById("datetime").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("country").value = "";
    document.getElementById("shape").value = "";
    numberSight = tableData.length;
    document.getElementById("numberSight").innerHTML = numberSight;

  }
  else {

    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
      filters[filterId] = elementValue;
    }
    else {
      delete filters[filterId];
    }

  }
  // 6. Call function to apply all filters and rebuild the table
  filterTable();

}

// 7. Use this function to filter the table when data is entered.
function filterTable() {

  // 8. Set the filtered data to the tableData.
  let filteredData = tableData;

  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  //  Loop through an object
  for (let userFilter in filters) {
    filteredData = filteredData.filter(row => row[userFilter] === filters[userFilter]);
    numberSight = filteredData.length;
    document.getElementById("numberSight").innerHTML = numberSight;

    /* if (p.length === 0 || p === "/" || p.match(/^\/?indexMe/)) {
      document.getElementById("numberSight").innerHTML = numberSight;
    } */
  }

  // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);
}

// Upgrade page.
const uniqueDate = [...new Set(data.map(item => item.datetime))].sort();
const uniqueCity = [...new Set(data.map(item => item.city))].sort();
const uniqueState = [...new Set(data.map(item => item.state))].sort();
const uniqueCountry = [...new Set(data.map(item => item.country))].sort();
const uniqueSphape = [...new Set(data.map(item => item.shape))].sort();

// Extra function for create the optionList
function createOptionBox(optionArray, idTAg, labelTag, nameSelect) {
  let select = document.createElement("select");
  //let select = document.getElementById(arguments[3])
  select.name = "countryName";
  select.id = arguments[1]

  var option = document.createElement("option");
  option.value = "";
  option.attributes = "selected disabled hidden"
  //console.log(val);
  option.text = "Choose here";
  select.appendChild(option);

  for (const val of arguments[0]) {
    let option = document.createElement("option");
    option.value = val;
    //console.log(val);
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }

  document.getElementById(arguments[3]).appendChild(select);
}

createOptionBox(uniqueDate, "datetime", "Date", "dateOptions");
createOptionBox(uniqueCity, "city", "City", "cityOptions");
createOptionBox(uniqueState, "state", "State", "stateOptions");
createOptionBox(uniqueCountry, "country", "Country", "countryOptions");
createOptionBox(uniqueSphape, "shape", "Shape", "shapeOptions");

// 2. Attach an event to listen for changes to each filter
// The listener for the upgrade page
d3.selectAll("select").on("change", updateFilters);
d3.selectAll("#clean-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);
/**
 * Created by urid on 23/7/15.
 */
function tabulate(data, columns, section) {
    var table = d3.select(section).append("table")
            .attr("style", "margin-left: 50px");
    var thead = table.append("thead");
    var tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
        .attr("style", "font-family: Courier")
        .html(function(d) { return d.value; });

    return table;
}

function tabulatecsv(csvpath,section,columns){
    d3.csv(csvpath,function(data){
        tabulate(data,columns,section);
    });
}

// render the table
//var table = tabulate(data, ["key", "value", "date"]);

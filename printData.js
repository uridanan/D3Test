/**
 * Created by urid on 23/7/15.
 */
function printData(csvpath, section, columns){

    d3.csv(csvpath, function(data){
        return printTable(data, section, columns);
    });

}

function printTable(inputrows, section, columns){
    var table = d3.select(section).append("table");
    var rows = table.selectAll("tr").data(inputrows).enter().append("tr");


    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
        .text(function(d) { return d.value; });

//    var cells = rows.rows.selectAll("td").data(function(r){
//            r.date = format.parse(r.date);
//            r.value = +r.value;
//        })
//        .enter()
//        .append("td")
//        .html(function(d){return d.value;});

    return table;
};


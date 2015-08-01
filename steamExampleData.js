/**
 * Created by Home on 26/07/2015.
 */
function myFormatData(data){

    var format = d3.time.format("%m/%d/%y");

    data.forEach(function(d) {
        d.date = format.parse(d.date);
        d.value = +d.value;
    });

    //data.toString().replace("NO AGE", "NO AGE, NO AGE, NO AGE");

    var nest = d3.nest().key(function(d) { return d.key; });
    return nest.entries(data);
}
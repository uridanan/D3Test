/**
 * Created by Home on 26/07/2015.
 */
function jessyData(data){

    var format = d3.time.format("%m/%d/%Y");
    var format2 = d3.time.format("%m-%d-%y");

    data.forEach(function(d) {
        //Format the date
        var date = format2.parse(d["Intake Date"]);
        if(date == null){
            date = format.parse(d["Intake Date"]);
        }
        d["Intake Date"] = date;

        //Fix the NO AGE entries
        var age = d["Years Old"];
        if (age.toString().indexOf("NO AGE") > -1){
            var condition = d["Months Old"];
            var breed = d["Days Old"];
            var color = d["Intake Condition"];
            d["Months Old"] = "NO AGE";
            d["Days Old"] = "NO AGE";
            d["Intake Condition"] = condition;
            d["Breed"] = breed;
            d["Coat Color Pattern"] = color;
        }

    });


    //Group by intake type, then intake date and count
    var nest = d3.nest()
        .key(function(d){return d["Intake Type"]; })
        .key(function(d){return d["Intake Date"];}).sortKeys(d3.ascending)
        .rollup(function(leaves) {return leaves.length;})
        //.rollup(function(leaves) { return {"value": leaves.length, "date": leaves[0]["Intake Date"]};})
        .entries(data);

    var flat = nest.entries().map(function(d){
        return d.value.entries().map(function(e){
            return {
                "date": e.key,
                "value": e.values,
                "key": d.key
            };
        })
    }).reduce(function(d1,d2){ return d1.concat(d2) },[]);

    return flat;

    //http://stackoverflow.com/questions/14270011/flatten-an-object-hierarchy-created-with-d3-js-nesting
    //http://stackoverflow.com/questions/27589618/flatten-nested-array-created-with-d3-nest-to-create-stacked-bar

    //Next: fill in blank dates
}
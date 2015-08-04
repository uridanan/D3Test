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
        .entries(data);

    //Fix the layers to fit the stack
    var flat = nest.map(function(d){
        return{
            "key": d.key,
            "values": d.values.map(function(f){
                return {
                    "date": f.key,
                    "value": f.values,
                    "key": d.key
                };
            })
        };
    }).reduce(function(d1,d2){ return d1.concat(d2) },[]);

    //return flat;

    //Array.apply(null, Array(5)).map(Number.prototype.valueOf,0);
    //http://stackoverflow.com/questions/14270011/flatten-an-object-hierarchy-created-with-d3-js-nesting
    //http://stackoverflow.com/questions/27589618/flatten-nested-array-created-with-d3-nest-to-create-stacked-bar
    //http://stackoverflow.com/questions/17415406/filling-the-gaps-in-d3-array-nesting

    //Next: fill in blank dates
    var dates = d3.nest()
        .key(function(d){return d["Intake Date"];}).sortKeys(d3.ascending)
        .rollup(function(leaves) {return 0;})
        .entries(data);

    var makeAllKeys = function(day) {
        allKeys = [];
        for(var i = 0; i<365; i++) {
            allKeys.push(yMFormat(new Date(year,i,1)));
        }
        return allKeys;
    }

    nestedData = nestedData.map(function(yearObj) {
        return {
            values: makeAllKeys(+yearObj.key).map(function(k) {
                value = yearObj.values.filter(function(v) { return v.key == k; })[0];
                return value || ({key: k, values: 0});
            })
        };
    });
}
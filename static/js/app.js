function buildMap() {
    const url = "/states/api";
    d3.json(url).then(function(state){
        stat = "Age"

        keys = []

        Object.keys(state[0]).map(function (key, i) {
            if((i > 0) && (i < 47)) {
                keys.push(key)
            }
        });


        console.log(keys);  



        
    });
}
buildMap();
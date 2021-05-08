function buildMap() {
    const url = "/";
    d3.json('./json/usa_ballers.json').then(function(response){
        console.log(response);
    });
}
buildMap();
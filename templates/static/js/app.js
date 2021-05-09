d3.csv("./.csv").then(function(nbaPlayers) {

    console.log(nbaPlayers);

    // log a list of names
    var names = nbaPlayers.map(data => data.name);
    console.log("names", names);

    // Cast each hours value in tvData as a number using the unary + operator
    playerData.forEach(function(data) {
        data.location = +data.location;
        console.log("Name:", data.name);
        console.log("Location:", data.location);
    });
}).catch(function(error) {
    console.log(error);
});
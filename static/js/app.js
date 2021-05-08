function getPlayers() {
      /* data route */
  const url = "/players";
  d3.json(url).then(function(response) {
    console.log(response);

    const data = response;
      
  });

}
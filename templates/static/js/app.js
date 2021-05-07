function buildPlot() {
    /* data route */
    const url = "/intro.html";
    d3.json(url).then(function(response) {
  
      console.log(response);
  
    });
  }
  
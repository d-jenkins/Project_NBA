function buildMap() {


    var stat = "PTS";

    // Creating map object
    var map = L.map("map", {
      center: [37.8, -96],
      zoom: 5.3
    });

    // Adding tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 10,
      zoomOffset: -1,
      id: "mapbox/dark-v9",
      accessToken: API_KEY
    }).addTo(map);

    const url = "/players";

    // d3.json(url).then(function (data){
    //   console.log(data);
    // }
    // )

    // d3.json(url)
    // .then(function(data){
    //   // Code from your callback goes here...
    // });

    d3.json(url)
    .then(function(data) {
      console.log(data);
    })
    // .catch(function(error) {
    //   // Do some error handling.
    // })

  }

  buildMap();


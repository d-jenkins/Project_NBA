  
// first Map
var myMap = L.map('map', {
    center: [39.8283, 98.5795],
    zoom: 9,
  });
  
  //////tile layer
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: 'mapbox/streets-v11',
      accessToken: API_KEY,
    },
  ).addTo(myMap)
  
  // An array containing each player name, location, and pos
  var cities = [
      {


      }
  ];
  
  ////name and num add it to the map
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i]
    L.marker(city.location)
      .bindPopup("<h2>" + city.name + "</h2> <h2>num " + city.num + "</h2>")
      .addTo(myMap)
  }
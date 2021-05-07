var queryUrl = "static/js/states.geojson";

// Creating map object
var map = L.map("map", {
  center: [37.8, -96],
  zoom: 5.4
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v9",
  accessToken: API_KEY
}).addTo(map);


hoopStates = []
states = []

d3.json(queryUrl).then(function (data) {


  d3.csv("../csv/state_df.csv").then(function (states) {
    states.forEach(s => hoopStates.push(s.State))
    

    data.features.forEach(s => {
      if (hoopStates.includes(s.properties.name) == true) {
        states.push(s)
      } 
    })


    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
        color: '#FFFFFF',
        dashArray: '',
        fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }

      info.update(layer.feature.properties);
    }

    var geojson;

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
      info.update();
    }

    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    }

    geojson = L.geoJson(states, {
      onEachFeature: onEachFeature
    }).addTo(map);


  });

});




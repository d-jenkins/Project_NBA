d3.json("../json/states.geojson").then(function (data) {

  d3.json("../json/state_df.json").then(function (state) {

    stat = "Age"

    keys = []

    Object.keys(state[0]).map(function (key, i) {
      if ((i > 0) && (i < 47)) {
        keys.push(key)
      }
    });

    console.log(keys)

    // Initialize the button
    var dropdownButton = d3.select("#dataviz_builtWithD3")
      .append('select')

    // add the options to the button
    dropdownButton // Add a button
      .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
      .data(keys)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button


    // When the button is changed, run the updateChart function
    dropdownButton.on("change", function (d) {

      var selectedOption = d3.select(this).property("value")

      stat = selectedOption

      d3.select("#map")
        .remove()

      d3.select('body')
        .append('div')
        .attr("id", "map")

      // Creating map object
      var map = L.map("map", {
        center: [37.8, -96],
        zoom: 5.3
      });

      // Adding tile layer
      var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 10,
        zoomOffset: -1,
        id: "mapbox/dark-v9",
        accessToken: API_KEY
      }).addTo(map);

      hoopStates = []
      states = []

      state.forEach(s => hoopStates.push(s.State))

      data.features.forEach(s => {
        if (hoopStates.includes(s.properties.name) == true) {
          states.push(s)
        }
      })

      colorScale = d3.scaleLinear()
        .domain(d3.extent(state.map(s => s[stat])))
        .range(['blue', 'red']);

      opacityScale = d3.scaleLinear()
        .domain(d3.extent(state.map(s => s.Baller_Counts)))
        .range([0.3, 1]);

      function style(feature) {
        return {
          weight: 2,
          opacity: 1,
          color: 'white',
          fillOpacity: opacityScale(state.filter(s => s.State == feature.properties.name)[0].Baller_Counts),
          fillColor: colorScale(state.filter(s => s.State == feature.properties.name)[0][stat])
        };
      }

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

      // function zoomToFeature(e) {
      //   map.fitBounds(e.target.getBounds());
      // }

      function onEachFeature(feature, layer) {
        trueState = state.filter(s => s.State == feature.properties.name)[0]
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          // click: zoomToFeature
        });
        layer.bindPopup(String(trueState.State) + "<hr>Average " + stat + ": " + String(trueState[stat]) + "<br>Rank in " + stat + ": " + String(trueState[`Rank_in_${stat}`]) + "<br>%ile in " + stat + ": " + String(trueState[`Percentile_in_${stat}`]));
      }

      geojson = L.geoJson(states, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(map);

      var overlayMaps = {
        PTS: geojson,
        AST: geojson
      };

      L.control.layers(darkmap, overlayMaps, {
        collapsed: false
      }).addTo(map);

    });

    // Creating map object
    var map = L.map("map", {
      center: [37.8, -96],
      zoom: 5.3
    });

    // Adding tile layer
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 10,
      zoomOffset: -1,
      id: "mapbox/dark-v9",
      accessToken: API_KEY
    }).addTo(map);

    hoopStates = []
    states = []

    console.log(state)

    state.forEach(s => hoopStates.push(s.State))

    data.features.forEach(s => {
      if (hoopStates.includes(s.properties.name) == true) {
        states.push(s)
      }
    })

    colorScale = d3.scaleLinear()
      .domain(d3.extent(state.map(s => s[stat])))
      .range(['blue', 'red']);

    opacityScale = d3.scaleLinear()
      .domain(d3.extent(state.map(s => s.Baller_Counts)))
      .range([0.3, 1]);

    function style(feature) {
      return {
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: opacityScale(state.filter(s => s.State == feature.properties.name)[0].Baller_Counts),
        fillColor: colorScale(state.filter(s => s.State == feature.properties.name)[0][stat])
      };
    }

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

    // function zoomToFeature(e) {
    //   map.fitBounds(e.target.getBounds());
    // }

    function onEachFeature(feature, layer) {
      trueState = state.filter(s => s.State == feature.properties.name)[0]
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        // click: zoomToFeature
      });
      layer.bindPopup(String(trueState.State) + "<hr>Average " + stat + ": " + String(trueState[stat]) + "<br>Rank in " + stat + ": " + String(trueState[`Rank_in_${stat}`]) + "<br>%ile in " + stat + ": " + String(trueState[`Percentile_in_${stat}`]));
    }

    geojson = L.geoJson(states, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map);

    var overlayMaps = {
      PTS: geojson,
      AST: geojson
    };

    L.control.layers(darkmap, overlayMaps, {
      collapsed: false
    }).addTo(map);

  });

});




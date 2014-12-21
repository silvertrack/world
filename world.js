var po = org.polymaps;

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .center({lat: 40, lon: 0})
    .zoomRange([1, 4])
    .zoom(2)
    .add(po.interact());

map.add(po.image()
    .url("http://s3.amazonaws.com/com.modestmaps.bluemarble/{Z}-r{Y}-c{X}.jpg"));

map.add(po.geoJson()
    .url("world.json")
    .tile(false)
    .zoom(3)
    .on("load", load));

map.add(po.compass().pan("none"));

map.container().setAttribute("class", "YlOrRd");

/** Set feature class and add tooltip on tile load. */
function load(e) {
    for (var i = 0; i < e.features.length; i++) {
        var feature = e.features[i];
        n = feature.data.properties.name;
        n$(feature.element)
            .attr("id", n)
            .attr("class", "q" + ~~(0) + "-" + 9)
            .add("svg:title")
            .text(n + ": " + percent(0));
    }
    //console.log(typeof(socket));
    io().emit('init', '');
}

function percent(v) {
  return (v * 100).toPrecision(Math.min(2, 2 - Math.log(v) / Math.LN2)) + "%";
}

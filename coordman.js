let attribution = '<a href="https://github.com/rebane2001/coordman">Coordman</a> by Rebane';
let tileSize = 512;

// Layers for different dimensions
let tileLayers = {
"nether": L.tileLayer(
  'tiles/{DIM}/{z}/{x},{y}.png', {
    attribution,
    tileSize,
    maxZoom: 0,
    minZoom: -16,
    DIM: "DIM-1"
  }),

"netherbg": L.tileLayer(
  'tiles/{DIM}/{z}/{x},{y}.png', {
    attribution,
    tileSize,
    maxZoom: 0,
    minZoom: -16,
    zoomOffset: 3,
    DIM: "DIM-1"
  }),

"overworld": L.tileLayer(
  'tiles/{DIM}/{z}/{x},{y}.png', {
    attribution,
    tileSize,
    maxZoom: 0,
    minZoom: -16,
    DIM: "DIM0"
  }),


"end": L.tileLayer(
  'tiles/{DIM}/{z}/{x},{y}.png', {
    attribution,
    tileSize,
    maxZoom: 0,
    minZoom: -16,
    DIM: "DIM1"
  })
};

let layers = {
    "Overworld+Nether": L.layerGroup([tileLayers['netherbg'],tileLayers['overworld']]),
    "Overworld": tileLayers['overworld'],
    "Nether": tileLayers['nether'],
    "The End": tileLayers['end']
};

// Guide overlays
let worldBorder = L.polyline([
    [-30000000, -30000000],
    [-30000000, 30000000],
    [30000000, 30000000],
    [30000000, -30000000],
    [-30000000, -30000000]
], {color: 'red'});

let mainHighways = L.polyline([
    [0, 0],
    [-30000000, 0],
    [0, 0],
    [30000000, 0],
    [0, 0],
    [0, -30000000],
    [0, 0],
    [0, 30000000],
    [0, 0]
], {color: 'LimeGreen'});

let diagHighways = L.polyline([
    [0, 0],
    [-30000000, -30000000],
    [0, 0],
    [30000000, -30000000],
    [0, 0],
    [-30000000, 30000000],
    [0, 0],
    [30000000, 30000000],
    [0, 0]
], {color: 'MediumSpringGreen'});

let disabledLayer = L.tileLayer("",{minZoom: 99});
let waypoints = {
    "- Guides -": disabledLayer,
    "Worldborder": worldBorder,
    "Main Highways": mainHighways,
    "Diag. Highways": diagHighways
};

let defaultLayers = [tileLayers['overworld'], worldBorder];

// Create the map
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -16,
    layers: defaultLayers
}).setView([0,0], 0);

L.control.layers(layers, waypoints).addTo(map);

// Set coord overlay on the bottom
map.on('mousemove', function(ev) {
    let coords = [Math.round(ev.latlng.lng),Math.round(-ev.latlng.lat)];
    document.getElementById("coordstext").innerText = "Coords: " + coords;
});
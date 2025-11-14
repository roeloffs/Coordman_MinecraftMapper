let attribution = '<a href="https://github.com/rebane2001/coordman">Coordman</a> by Rebane';
let tileSize = 512;

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

let defaultLayers = [worldBorder, mainHighways, diagHighways];

// Create the map
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -16,
  layers: defaultLayers
}).setView([0,0], 0);

L.control.layers(null, waypoints).addTo(map);

// Set coord overlay on the bottom
map.on('mousemove', function (ev) {
  let coords = [Math.round(ev.latlng.lng), Math.round(-ev.latlng.lat)];
  let coordsN = [Math.round(ev.latlng.lng / 8), Math.round(-ev.latlng.lat / 8)];
  document.getElementById("coordstext").innerText = "Coords: " + numberSeperator(coords) + "\r\nNether: " + numberSeperator(coordsN) + "";
});

function numberSeperator(num) {
  num = "X: " + num.toString().replace(",", "   Z: ")
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function toggleCoords() {
  let displayStyle = document.getElementById("coordstext").style.display == "none" ? "block" : "none";
  document.getElementById("coordstext").style.display = displayStyle;
}

function openLayers() {
  window.chrome.webview.postMessage("OpenLayers");
}

function openSettings() {
  window.chrome.webview.postMessage("OpenSettings");
}
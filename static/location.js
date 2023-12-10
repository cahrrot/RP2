
let lat = 0;
let lon = 0;
let zoomLevel = 15;
let map; // Leaflet map object loaded on initPosition()
let currentRegionPolygon;

function getPosition() {
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res, rej, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0});
    } else {
      showError("Your browser does not support Geolocation!");
    }
  });
}

function res(pos) {
  // SUCCESS
}

function rej(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function mapMoved(){
  zoomLevel = map.getZoom();
  if (zoomLevel < 12){

  } else {

  } 
  console.log(`Top Left: ${map.unproject(map.getPixelBounds().getTopLeft())}, Bottom Right: ${map.unproject(map.getPixelBounds().getBottomRight())}, Zoom: ${zoomLevel}`);
}

async function initPosition(){
  
  // TODO: should ask for the user permition first

  let position = await getPosition();
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  map = L.map('map').setView([lat, lon], zoomLevel);
  map.addLayer(
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    })
  );
  document.querySelectorAll(".leaflet-attribution-flag").forEach(el => el.remove()); // Tira essa bandeirinha inútil
  map.on("moveend", mapMoved);
}

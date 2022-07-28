import mapboxgl from '!mapbox-gl';

function buildMapNewPoint() {
  var coords;


  if (document.querySelector(".map-edit-point")) {

    const latitude = parseFloat(document.querySelector("#point_latitude").value);
    const longitude = parseFloat(document.querySelector("#point_longitude").value);
    coords = [longitude, latitude];

  } else {
    //if (document.getElementById('new-form')) {
    const teste = document.getElementById('new-form');

    // teste.insertAdjacentHTML('beforeend', `<div class="form-group mt-4 mb-4 float optional occurrence_latitude">
    //                                                 <input class="form-control numeric float optional" placeholder="Latitude"
    //                                                 type="hidden" step="any" name="occurrence[latitude]"
    //                                                 id="occurrence_latitude" value=${coords[0]} readonly="readonly" >
    //                                               </div>`);



    // teste.insertAdjacentHTML('beforeend', `<div class="form-group float optional occurrence_longitude">
    //                                                   <input class="form-control numeric float optional" placeholder="Longitude"
    //                                                   type="hidden" step="any" name="occurrence[longitude]"
    //                                                   id="occurrence_longitude" value=${coords[1]} readonly="readonly">
    //                                                 </div>`);
    //}

    coords = [parseFloat(teste.querySelector(".occurrence_longitude").querySelector(".form-control").value),
      parseFloat(teste.querySelector(".occurrence_latitude").querySelector(".form-control").value)];
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoicGpmZXJuYW5kZXMiLCJhIjoiY2t1c291Z3lzNWg2bzJvbW5kNWNhbnZhaCJ9.eYxvagOUGuS5qDo-zOfRCA';

  if (document.getElementById("new_point") || document.getElementById("map-new-point")) {
    let map = new mapboxgl.Map({
      container: 'map-new-point',
      style: "mapbox://styles/mapbox/satellite-v9",
      center: coords,
      zoom: 4
    });

    var el = document.createElement('div');
    el.id = 'marker';

    var marker = new mapboxgl.Marker();
    marker
      .setLngLat(coords)
      .addTo(map);

    function add_marker(event) {
      marker.remove()
      var coordinates = event.lngLat;
      document.getElementById("occurrence_longitude").value = coordinates.lng;
      document.getElementById("occurrence_latitude").value = coordinates.lat;
      marker.remove().setLngLat(coordinates).addTo(map);
    }

    map.on('click', add_marker);
    return map;
  }
}

export { buildMapNewPoint };

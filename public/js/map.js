let map, markers, coords, paths, attractions

markers = [[]]
coords = [[]]
paths = [[]]
attractions = [[]]

const icons = {
  vape: './icons/smoke.png',
  bar: './icons/drop.png',
  spirit: './icons/om.png'
}

const draw = (attraction, type) => {
  // define day num
  let day = $('.nav.nav-pills li.active a').data('id')
  // map attraction to order in day
  if(!attractions[day-1]) attractions[day-1] =[]
  attractions[day-1].push(attraction.id)
  // save coords
  if(!coords[day-1]) coords[day-1] = []
  coords[day-1].push(new google.maps.LatLng(attraction.location.lat, attraction.location.lng))
  // new marker
  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(attraction.location.lat, attraction.location.lng),
    draggable: true,
    title: attraction.name,
    icon: './icons/om.png',
    animation: google.maps.Animation.DROP
  })
  // save marker
  markers[day-1].push(marker)
  // drop the marker
  marker.setMap(map)
  // call createPath
  createPath(day)
}

const createPath = (day) => {
  // new path
  let path = new google.maps.Polyline({
    path: coords[day-1],
    geodesic: true,
    strokeColor: 'grey',
    strokeOpacity: 0.8,
    strokeWeight: 1,
  })
  // save path
  if(!paths[day-1]) paths[day-1] = []
  paths[day-1].push(path)
  // drop path
  path.setMap(map)
}


const initialize = () => {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, {
          center: myLatlng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#fcfaf4'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#fcfaf4'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#d3bf8d'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#000000'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f441b0'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#fcfaf4'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#000000'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#fcfaf4'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#fcfaf4'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#fcfaf4'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#fcfaf4'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#fcfaf4'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#f4edd9'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f4edd9'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#f4edd9'}]
            },
            {
              featureType: "administrative",
              elementType: "labels",
              stylers: [
                { visibility: "on" }
              ]
            },{
              featureType: "poi",
              elementType: "labels",
              stylers: [
                { visibility: "off" }
              ]
            },{
              featureType: "transit",
              elementType: "labels",
              stylers: [
                { visibility: "off" }
              ]
            },{
              featureType: "road",
              elementType: "labels",
              stylers: [
                { visibility: "off" }
              ]
            }
          ]
        });
}

$(()=>{
  initialize();
})

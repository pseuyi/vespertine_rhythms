let map, draw, markers, coords, paths

markers = [[]]
coords = [[]]
paths = [[]]

draw = (attraction, type) => {
  // define day num
  let day = $('.nav.nav-pills li.active a').data('id')
  // save coords
  if(!coords[day-1]) coords[day-1] = []
  coords[day-1].push(new google.maps.LatLng(...attraction.place.location))
  // new marker
  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(...attraction.place.location),
    draggable: true,
    title: attraction.name,
    icon: icons[type],
    animation: google.maps.Animation.DROP
  })
  // save marker
  markers[day-1].push(marker)
  // drop the marker
  marker.setMap(map)

  // new path
  let path = new google.maps.Polyline({
    path: coords[day-1],
    geodesic: true,
    strokeColor: '#f441b0',
    strokeOpacity: 0.2,
    strokeWeight: 5
  })
  // save path
  if(!paths[day-1]) paths[day-1] = []
  paths[day-1].push(path)
  // drop path
  path.setMap(map)
}

const icons = {
  hotel: './icons/hotel.png',
  restaurant: './icons/restaurant.png',
  activity: './icons/activity.png'
}

initialize = () => {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, {
          center: myLatlng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
}

$(()=>{
  initialize();
})

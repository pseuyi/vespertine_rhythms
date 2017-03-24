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
    icon: './icons/empty.png',
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
    strokeColor: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
    strokeOpacity: 0.8,
    strokeWeight: Math.random()*42,
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
            {elementType: 'geometry', stylers: [{color: '#f4edd9'}]},
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
              stylers: [{color: '#f4edd9'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#000000'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#f4edd9'}]
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
              stylers: [{color: '#f4edd9'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#fcfaf4'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: 'black'}]
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
  draw({"id":"3fd66200f964a52000e71ee3","name":"Fat Cat","contact":{"twitter":"fatcatnyc","facebook":"111852795539531","facebookUsername":"fatcatjazz","facebookName":"Fat Cat Music"},"location":{"address":"75 Christopher St","crossStreet":"btwn 7th Ave S & Bleecker St","lat":40.73363340462003,"lng":-74.00287943703214,"distance":557,"postalCode":"10014","cc":"US","city":"New York","state":"NY","country":"United States","formattedAddress":["75 Christopher St (btwn 7th Ave S & Bleecker St)","New York, NY 10014","United States"]},"categories":[{"id":"4bf58dd8d48988d1e7931735","name":"Jazz Club","pluralName":"Jazz Clubs","shortName":"Jazz Club","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/arts_entertainment/musicvenue_jazzclub_","suffix":".png"},"primary":true}],"verified":true,"stats":{"checkinsCount":35500,"usersCount":23769,"tipCount":334},"url":"http://www.fatcatmusic.org/","hasMenu":true,"menu":{"type":"Prices","label":"Prices","anchor":"View Prices","url":"https://foursquare.com/v/fat-cat/3fd66200f964a52000e71ee3/menu","mobileUrl":"https://foursquare.com/v/3fd66200f964a52000e71ee3/device_menu"},"allowMenuUrlEdit":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"venuePage":{"id":"63135974"},"storeId":"","referralId":"v-1489725281","venueChains":[],"hasPerk":false}, 'bar')
  draw({"id":"4b565de5f964a520670d28e3","name":"Greenpoint Reformed Church","contact":{"phone":"7183835941","formattedPhone":"(718) 383-5941"},"location":{"address":"138 Milton St","lat":40.72922373576921,"lng":-73.9548589747077,"labeledLatLngs":[{"label":"display","lat":40.72922373576921,"lng":-73.9548589747077}],"distance":3570,"postalCode":"11222","cc":"US","city":"Brooklyn","state":"NY","country":"United States","formattedAddress":["138 Milton St","Brooklyn, NY 11222","United States"]},"categories":[{"id":"4bf58dd8d48988d132941735","name":"Church","pluralName":"Churches","shortName":"Church","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/building/religious_church_","suffix":".png"},"primary":true}],"verified":false,"stats":{"checkinsCount":360,"usersCount":169,"tipCount":0},"url":"http://www.greenpointchurch.org","venueRatingBlacklisted":true,"beenHere":{"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"referralId":"v-1489725281","venueChains":[],"hasPerk":false}, 'spirit')
})

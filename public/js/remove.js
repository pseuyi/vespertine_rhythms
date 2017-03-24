'use strict'

// would prefer to use below function bound to this inside jquery onclick
// const removeFromItinerary = () => {
// }

$(()=>{
  // remove list item
  $('#plans').on('click', 'div.tab-content div.tab-pane ul.list button', function removeFromItinerary () {

    // capture $thing data and remove from list
    let $thing = $(this).parent()
    let placeId = $thing.val()
    let type = $thing.data('type')
    console.log('getting the type', type)
    $thing.remove()

    // define current day
    let currDay = $('#plans ul li.active a').data('id')

    // remove all from map
    markers[currDay-1].forEach(marker=>marker.setMap(null))
    paths[currDay-1].forEach(path=>path.setMap(null))

    // remove from markers at correct idx from markers, paths, coords, attractions)
    let idx = attractions[currDay-1].indexOf($thing.val())
    attractions[currDay-1].splice(idx, 1)
    markers[currDay-1].splice(idx,1)
    coords[currDay-1].splice(idx,1)
    paths[currDay-1] = []

    // redraw markers if there are markers on this day
    markers[currDay-1] && markers[currDay - 1].forEach(marker=>marker.setMap(map))
    // creating paths, paths[active] is array of latlngs, create only if exists
    createPath(currDay)

    // repopulate the options list
    // console.log('is model defined', model)
    let attraction = model[type].find(ele => +ele.placeId === +placeId)
    let $list = $options.find(`#${type}-opts`)
    $list.append(`<option value=${attraction.id}>${attraction.name}</option>`)
  })

})

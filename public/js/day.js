'use strict'

const addMarkerArr = () => {
  markers.push([])
}

// function to switch active tab
const switchDay = (active, activeContent) => {
  let $curr = $('#plans ul li.active')
  let $currContent = $('#plans div div.active')
  let currDay = $('#plans ul li.active a').data('id')
  let activeDay = active.children().data('id')
  // toggle active class
  $curr.toggleClass('active')
  $currContent.toggleClass('active')
  active.toggleClass('active')
  activeContent.toggleClass('active')
  // reset markers and path
  markers[currDay-1].forEach(marker=>marker.setMap(null))
  // redraw markers if there are marker on this day
  markers[activeDay-1] && markers[activeDay - 1].forEach(marker=>marker.setMap(map))
  // reset paths
  paths[currDay-1].forEach(path=>path.setMap(null))
  // creating paths, paths[active] is array of latlngs, create only if exists
  paths[activeDay-1] && paths[activeDay-1].forEach(path=>path.setMap(map))
}

const addDay = () => {
  let next = $('.nav.nav-pills').children().length
  //add a nav pill
  let tab = `<li class=\'\'><a href=\'#${next}\' data-id=${next} data-toggle=\'tab\'>${next}</a></li>`
  $('#add-day').before(tab)
  //add the tab content
  let content =
  `<div class=\"tab-pane\" id=\"${next}\">
      <h1>plans</h1>
        <ul class=\'list my-vape\'>
        </ul>
        <ul class=\'list my-bar\'>
        </ul>
        <ul class=\'list my-spirit\'>
        </ul>
    </div>`
  $('#plans div.tab-content:last').append(content)
  // change active tab
  let active = $('#add-day').prev()
  let activeContent = $(`#plans div#${next}`)
  addMarkerArr() // creates marker storage for new day
  switchDay(active, activeContent)
}

$(()=>{
  $('#plans ul.nav.nav-pills').on('click', 'li a', function () {
    let id = $(this).data('id')
    let active = $(this).parent()
    let activeContent = $(`#plans div.tab-content div.tab-pane#${id}`)
    //add day or switch
    //check first if this is the add day button
    if(id==='add-link') addDay()
    else switchDay(active, activeContent)
  })
})

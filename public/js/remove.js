'use strict'

$(()=>{
  // remove list item
  $('#plans').on('click', 'div.tab-content div.tab-pane ul.list button', function () {
    let $thing = $(this).parent()
    $thing.remove()
  })
  // remove from day
  
  // remove from map
})

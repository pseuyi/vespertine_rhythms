'use strict'

$(()=>{
  let $thing
  // remove list item
  $('#plans').on('click', 'div.tab-content div.tab-pane ul.list button', function () {
    $thing = $(this).parent()
    $thing.remove()
  })
  console.log('what is being removed', $thing)
  // remove from day

  // remove from map
})

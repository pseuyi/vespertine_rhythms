'use strict'

$(()=>{
  const $options = $('#options-panel')
  const $hotels = $options.find('#hotel-opts')
  const $restaurants = $options.find('#restaurant-opts')
  const $activities = $options.find('#activity-opts')

  const model = {
    hotel: hotels,
    restaurant: restaurants,
    activity: activities
  }
  hotels.forEach(hotel => {
    $hotels.append(`<option value=${hotel.id}>${hotel.name}</option>`)
  })
  restaurants.forEach(restaurant => {
    $restaurants.append(`<option value=${restaurant.id}>${restaurant.name}</option>`)
  })
  activities.forEach(activity => {
    $activities.append(`<option value=${activity.id}>${activity.name}</option>`)
  })

  $('#add-hotel').click(()=>addToItinerary('hotel', 'hotels'))
  $('#add-restaurant').click(()=>addToItinerary('restaurant', 'restaurants'))
  $('#add-activity').click(()=>addToItinerary('activity', 'activities'))

  const addToItinerary = (type, list) => {
    // select active day's lists
    const activeList = $(`div.tab-pane.active ul.my-${list}`)
    // condition for default option
    if($(`select#${type}-opts option:selected`).text()===`choose ${type}`) return
    // value is the id
    let id = $(`select#${type}-opts option:selected`).val()
    // find the actual attraction
    let attraction = model[type].find(ele => +ele.id === +id)
    // add to correct list
    activeList.append(`<li value=${attraction.id}>
      - ${attraction.name}
      <button type='button' data-id=${attraction.id} data-list=${list} class='btn-default btn-circle remove-btn'><i class="glyphicon glyphicon-remove"></i></button>
      </li>`)

    draw(attraction, type)
  }
})

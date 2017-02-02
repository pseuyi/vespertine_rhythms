'use strict'

const $options = $('#options-panel')
// const $vape = $options.find('#vape-opts')
const $hotel = $options.find('#hotel-opts')
const $restaurant = $options.find('#restaurant-opts')
const $activity = $options.find('#activity-opts')

const model = {
  // vape: vapes,
  hotel: hotels,
  restaurant: restaurants,
  activity: activities
}

const addToItinerary = (type) => {
  // select active day's lists
  const $activeList = $(`div.tab-pane.active ul.my-${type}`)
  const $selection = $(`select#${type}-opts option:selected`)
  // condition for default option
  if($(`select#${type}-opts option:selected`).text()===`choose ${type}`) return
  // value is the id
  let id = $selection.val()
  // find the actual attraction
  let attraction = model[type].find(ele => +ele.id === +id)
  // add to correct list, edit: don't really need all this data
  $activeList.append(`<li value=${attraction.placeId} data-type=${type}>
    - ${attraction.name}
    <button type='button' data-id=${attraction.id} data-list=${type} class='btn btn-default remove-btn'>x</button>
    </li>`)
  // remove the option from select
  $selection.remove()
  draw(attraction, type)
}

const loadOptions = () => {
  // vapes.forEach(vape => $vape.append(`<option value = ${vape.id}>${vape.name}</option>`))

  hotels.forEach(hotel => $hotel.append(`<option value=${hotel.id}>${hotel.name}</option>`))
  restaurants.forEach(restaurant => $restaurant.append(`<option value=${restaurant.id}>${restaurant.name}</option>`))
  activities.forEach(activity => $activity.append(`<option value=${activity.id}>${activity.name}</option>`))
}

$(()=>{
  loadOptions ()
  // $('#add-vape').click(()=>addToItinerary('vape'))
  $('#add-hotel').click(()=>addToItinerary('hotel'))
  $('#add-restaurant').click(()=>addToItinerary('restaurant'))
  $('#add-activity').click(()=>addToItinerary('activity'))

})

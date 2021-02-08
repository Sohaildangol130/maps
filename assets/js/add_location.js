const $parent = $('.location-form');

// var db_all_locations = localStorage.getItem("all_location") == null ? JSON.stringify({}) : JSON.parse(localStorage.getItem("all_locations"));
// var all_locations = db_all_locations;
// console.log(all_locations);

$parent.find('button').on('click', () => {
    var longitude = $parent.find('.longitude input').val();
    var latitude = $parent.find('.latitude input').val();
    var name = $parent.find('.name input').val();
    var price = $parent.find('.price input').val();
    var image = $parent.find('.image input').val();
    var location_index = Object.keys(all_locations).length + 1;

    var location_details = {
                            title: name, 
                            price: parseFloat(price), 
                            image: image, 
                            coordinates: {
                                            lat: parseFloat(latitude), 
                                            lng: parseFloat(longitude)
                                        }
                            };

    all_locations["location-"+location_index] = location_details;
    localStorage.setItem("all_locations", JSON.stringify(all_locations));
})

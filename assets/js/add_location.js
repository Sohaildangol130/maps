const $parent = $('.location-form');

$parent.find('button').on('click', () => {
    var name = $parent.find('.name input').val();
    var price = $parent.find('.price input').val();
    var image = $parent.find('.image input').val();
    var location = $parent.find('location-map input').val();
    var location_index = Object.keys(all_locations).length + 1;
    $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=AIzaSyAg80DUpTGkqPuo4d0ixsfb-SstG_fz06k", (data) => {
            var location_details = {
                            title: name, 
                            price: parseFloat(price), 
                            image: image, 
                            coordinates: data.results[0].geometry.location
                            };
            all_locations["location-"+location_index] = location_details;
            localStorage.setItem("all_locations", JSON.stringify(all_locations));
        })
})



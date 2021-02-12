function search (map){
    var location_title = [];
        var search_locations = [];
        var input = $('.search input');

for (var i in all_locations){
    location_title.push(all_locations[i]["title"].toUpperCase());
}

input.on('keyup', () => {
    search_locations=[];
    $('.all-search-results').empty();
    var filter_value = input.val().toUpperCase();
    if (filter_value != ""){
        $('.search-results').removeClass('hidden');
        location_title.forEach((item) => {
            if (item.includes(filter_value)){
                var c = item.toLowerCase();
                var d = c.charAt(0).toUpperCase()+c.slice(1);
                search_locations.push(d)
            }
        })
        search_locations.forEach((item) => {
            for (var j in all_locations){
                if (all_locations[j]["title"] == item){
                    // console.log(all_locations[j]);
                    var div = `<div class="single-search">
                                    <div class="search-image"></div>
                                    <div class="search-details">
                                        <p class="search-title">`+all_locations[j]["title"]+`</p>
                                        <h5 class="search-price">Rs `+all_locations[j]["price"]+`</h5>
                                    </div>
                                </div>`
                    // console.log(div)

                    $('.all-search-results').append(div);

                    
                }
            }
        })
    } else {
        $('.search-results').addClass('hidden')
    }
    $(document).find('.single-search').on('click', (elem) => {
        // console.log($(elem.currentTarget).find('.search-title').text());
        for (var i in all_locations){
            if (all_locations[i]["title"] === $(elem.currentTarget).find('.search-title').text()){
                map.setCenter(all_locations[i]["coordinates"]);
                map.setZoom(16);
            }
            if (all_locations[i]["title"]===$(elem.target).find('.search-title').text() && !cookie_data.includes(i)){ 
                cookie_data.push(i);
                Cookies.set("locations", cookie_data);
            }
        }
        
        // data = ['swayumbhu', 'manaslu']
        // document.cookie = ('search_queries', data.stringify)
        // var cookie = {
        //     "cook-1": {
        //         title: "Swayambhu",
        //         lat: 
        //     }
        // }
        // document.cookie = JSON.stringify(a);
        // console.log(document.cookie)
        // var b = JSON.parse(document.cookie);
        
        // console.log(b)
    })    
})
}
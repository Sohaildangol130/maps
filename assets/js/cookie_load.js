if(localStorage.getItem("all_locations") == null){
    localStorage.setItem("all_locations", JSON.stringify({}))
}else{
    var all_locations = JSON.parse(localStorage.getItem("all_locations"));
}

var cookie_data = Cookies.get("locations") == undefined ? []:JSON.parse(Cookies.get("locations"));

cookie_data.forEach((index) => {
    var cookie_location_title = all_locations[index]["title"];
    $('.cookies').append("<p>"+cookie_location_title+"</p>")
});



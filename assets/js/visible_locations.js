var id = 0;
for (var i in all_locations){
    id++;
    var div = `<div id="hotel-`+id+`" class="single-hotel">
        <div class="single-hotel__image"></div>
        <div class="single-hotel__details">
            <p>`+all_locations[i]["title"]+`</p>
            <h5>Rs `+all_locations[i]["price"]+`</h5>
        </div>
    </div>`
    // console.log(div)
    $('.related-hotels').append(div);
}
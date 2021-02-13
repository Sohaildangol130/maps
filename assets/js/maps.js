function initMap() {
    
  const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 27.719936621907003, lng: 85.31601948146536 },
      zoom: 12,
      styles: [
      { elementType: "geometry", stylers: [{ color: "#07002b" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#07002b" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
      {
          featureType: "poi",
          elementType: "labels",
          stylers: [
                { visibility: "off" }
          ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });   
  
  search(map);
  var visible_markers = []
  const htmlmarker = (location) => {
    var marker = createHTMLMapMarker({
      latlng: new google.maps.LatLng(location.coords["lat"], location.coords["lng"]),
      map: map,
      html: `<div style="background-color:white; padding:7px 10px; border-radius: 20px">
                <h4>Rs `+location.price+`</h4>
              </div>`,
      title: location.title
    });
    visible_markers.push(marker);
    // console.log(visible_markers);

    const contentString =
    `<div>
      <h2>`+location.title+`</h2>   
      <p>Rs `+location.price+`</p>  
      <div style="background-color: black; background-image: url(`+location.image+`) ;height: 200px; width: 300px; border-radius: 10px; margin-top: 20px"></div>
    </div>`;

    marker.addListener("click", () => {
      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      infowindow.open(map, marker);
    });
  }
  for (var i in all_locations){
    htmlmarker({coords: all_locations[i]["coordinates"],title: all_locations[i]["title"], price: all_locations[i]["price"]});
  }
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds =  map.getBounds();
    //do whatever you want with those bounds
    // visible_markers.forEach((item, index) => {
    //   var mark = index;
    //   console.log(mark)
    //   // if(bounds.contains(mark.getPosition())===true){
    //   //   console.log(item)
    //   // }
    // })
    
    for (let i=0; i < visible_markers.length; i++){
      var m = $('#hotel-'+(i+1));
      console.log(m);
      if(bounds.contains(visible_markers[i].getPosition())===true){
        m.show();
      }else {
        m.hide()
      }
    }
  });



  // search map
  const map2 = new google.maps.Map(document.getElementById("search-map"), {
    center: { lat: 27.719936621907003, lng: 85.31601948146536 },
    zoom: 14
  });

  var marker = new google.maps.Marker({
    position: { lat: 27.719936621907003, lng: 85.31601948146536 },
    map: map2,
    draggable: true
  });

  google.maps.event.addListener(marker, 'dragend', function(evt){
    rev_geocode(evt.latLng.lat(), evt.latLng.lng());
    // console.log(evt.latLng.lat().toFixed(3), evt.latLng.lng().toFixed(3))
  });
  marker.setMap(map2);

  const rev_geocode = (lat, lng) => {
    $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+","+lng+"&key=AIzaSyAg80DUpTGkqPuo4d0ixsfb-SstG_fz06k", (data) => {
      $('.location-map input').val(data.results[0].formatted_address);
    })
  }

}  


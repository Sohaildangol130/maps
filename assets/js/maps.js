function initMap() {
    // Styles a map in night mode.
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 27.719936621907003, lng: 85.31601948146536 },
        zoom: 13,
        styles: [
        { elementType: "geometry", stylers: [{ color: "#07002b" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#07002b" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
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

    const addmarker = (location) => {
        var marker = new google.maps.Marker({
            position: location.coords,
            map:map,
        })
    }

    addmarker({coords: { lat: 27.717947018584546, lng: 85.28958399989122 }});
    addmarker({coords: { lat: 27.701229820361593, lng: 85.35893519589094 }});
    addmarker({coords: { lat: 27.709436621907003, lng: 85.31601948146536 }});
    addmarker({coords: { lat: 27.746208451058834, lng: 85.36357005304936 }});
    addmarker({coords: { lat: 27.67706134361862, lng: 85.32408793651484 }});
    addmarker({coords: { lat: 27.72448122680402, lng: 85.36219676203945 }});
  }
// import createHTMLMapMarker from "./html-map-marker.js";
const createHTMLMapMarker = ({
  OverlayView = google.maps.OverlayView,
  ...args
}) => {
  class HTMLMapMarker extends OverlayView {
    constructor() {
      super();
      this.latlng = args.latlng;
      this.html = args.html;
      this.setMap(args.map);
    }

    createDiv() {
      this.div = document.createElement("div");
      this.div.style.position = "absolute";
      if (this.html) {
        this.div.innerHTML = this.html;
      }
      google.maps.event.addDomListener(this.div, "click", event => {
        google.maps.event.trigger(this, "click");
      });
    }

    appendDivToOverlay() {
      const panes = this.getPanes();
      panes.overlayImage.appendChild(this.div);
    }

    positionDiv() {
      const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
      let offset = 25;
      if (point) {
        this.div.style.left = `${point.x - offset}px`;
        this.div.style.top = `${point.y - offset}px`;
      }
    }

    draw() {
      if (!this.div) {
        this.createDiv();
        this.appendDivToOverlay();
      }
      this.positionDiv();
    }

    remove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      }
    }

    getPosition() {
      return this.latlng;
    }

    getDraggable() {
      return false;
    }
  }

  return new HTMLMapMarker();
};

// function initMap(){
//   const latLng = new google.maps.LatLng(16.7666, -3.0026);
//   const mapOptions = {
//     zoom: 11,
//     center: latLng
//   };
//   const map = new google.maps.Map(document.getElementById("map"), mapOptions);

//   let marker = createHTMLMapMarker({
//     latlng: latLng,
//     map: map,
//     html: `<div style="background-color:white; padding:1px 20px; border-radius: 20px">
//               <p>Hello</h1>
//            </div>`
//   });

//   marker.addListener("click", () => {
//     alert("Partyin Partyin Yeah!");
//   });
// }

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
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
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
  const contentString =
  `<div>
    <h2>Hello world</h2>   
    <p>Hello worldHello worldHello worldHello </p> 
  </div>`;

  function location_details(marker, location){
    const infowindow = new google.maps.InfoWindow({
      content: `<div>
                <h2>`+location.price+`</h2>   
                <p>Hello worldHello worldHello worldHello </p> 
              </div>`,
    });
    infowindow.open(map, marker)
  }
  

    

  // const  addmarker = (location) => {
  //     var marker = new google.maps.Marker({
  //         position: location.coords,
  //         map:map,
  //         icon: "./assets/images/icon.png",
  //         label: {
  //           text: "Rs " + JSON.stringify(all_locations[i]["price"]),
  //           fontSize: "12px",
  //           fontWeight: "bold"
  //         }
  //     })
  //       marker.addListener("click", () => {
  //         infowindow.open(map, marker);
  //       });
  // }

  // for (var i in all_locations){
  //   addmarker({coords: all_locations[i]["coordinates"], price: all_locations[i]["price"]});
  // }

  const htmlmarker = (location) => {
    var marker = createHTMLMapMarker({
      latlng: new google.maps.LatLng(location.coords["lat"], location.coords["lng"]),
      map: map,
      html: `<div style="background-color:white; padding:7px 10px; border-radius: 20px">
                <h4>Rs `+location.price+`</h4>
              </div>`
    });

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
}  
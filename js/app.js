var locations = data;


var ViewModel = function() {
  this.showListings = function() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }
};

var CoffeeShop = function(data) {
  this.title = data.title;
  this.location = {
    lat: data.lat,
    lng: data.lng
  }
}

ko.applyBindings(new ViewModel())

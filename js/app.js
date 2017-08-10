var data = data;

var ViewModel = function() {

  this.menu = new Menu();

  this.locations = ko.observableArray();

  data.forEach((location) => {
    this.locations.push(new CoffeeShop(location))
  })


  this.filterItems = ko.computed(function() {
    var filter = this.menu.inputFilter();
    filter = filter.toLowerCase();
    if (!filter) { return this.locations(); }

    return this.locations().filter(function(i) {
      console.log(i.title)
      return i.title.toLowerCase().indexOf(filter) > -1;
    });
  }, this);


  this.locations().sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0
  })

  // This function will loop through the markers array and display them all.
  this.showListings = function() {
    showListings();
  }

  // This function will loop through the listings and hide them all.
  this.hideListings = function() {
    hideMarkers(markers)
  };

  this.toggleDrawing = function() {
    toggleDrawing(drawingManager);
  }

  this.zoomToArea = function() {
    zoomToArea();
  }

  this.searchWithinTime = function() {
    searchWithinTime();
  }

  // Listen for the event fired when the user selects a prediction and clicks
  // "go" more details for that place.
  this.textSearchPlaces = function() {
    textSearchPlaces();
  }


  this.inputFilterSubmit = function() {
    hideMarkers(markers);
    this.filterItems().forEach((filterLocation) => {
      this.locations().forEach((location) => {
        if (filterLocation.title === location.title) {
          location.itemVisible(true);
          this.viewLocation(location);
        } else if (this.menu.inputFilter() == "") {
          showListings();
          location.itemVisible(true);
        } else {
          location.itemVisible(false);
        }
      })
    })
  }

  this.toggleDisplay = function() {
    console.log(this.locations.length)
    this.menu.optionsBoxVisible(!this.menu.optionsBoxVisible());
    this.menu.coffeeShopList(!this.menu.coffeeShopList());
  }

  this.viewLocation = function(data) {
    // console.log(data);
    markers.forEach((marker) => {
      if (data.id === marker.id) {
        showListing(marker);
      }
    })
  }
};

var Menu = function() {
  this.optionsBoxVisible = ko.observable(false);
  this.coffeeShopList = ko.observable(true);
  this.inputFilter = ko.observable("");
}

var CoffeeShop = function(data) {
  this.title = data.title;
  this.location = data.location;
  this.id = data.id;
  this.itemVisible = ko.observable(true);
}

ko.applyBindings(new ViewModel())

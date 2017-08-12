var data = data;

var ViewModel = function() {

  this.menu = new Menu();

  this.locations = ko.observableArray();

  this.mapModel = new MapModel();

  data.forEach((location) => {
    this.locations.push(new CoffeeShop(location));
  });


  this.filterItems = ko.computed(function() {
    var filter = this.menu.inputFilter();
    filter = filter.toLowerCase();
    if (!filter) { return this.locations(); }

    return this.locations().filter(function(i) {
      return i.title.toLowerCase().indexOf(filter) > -1;
    });
  }, this);


  this.locations().sort((a, b) => a.title > b.title ? 1 : -1);

  // This function will loop through the markers array and display them all.
  this.showListings = function() {
    showListings();
  };

  // This function will loop through the listings and hide them all.
  this.hideListings = function() {
    hideMarkers(markers);
  };

  this.toggleDrawing = function() {
    toggleDrawing(drawingManager);
  };

  this.zoomToArea = function() {
    zoomToArea(this.mapModel.zoomToAreaValue());
  };

  this.searchWithinTime = function() {
    searchWithinTime(this.mapModel.searchWithinTimeValue(),
      this.mapModel.mode(),
      this.mapModel.maxDuration());
  };

  // Listen for the event fired when the user selects a prediction and clicks
  // "go" more details for that place.
  this.textSearchPlaces = function() {
    textSearchPlaces();
  };


  this.inputFilterSubmit = function() {
    hideMarkers(markers);
    if (this.menu.inputFilter() === "") {
      showListings();
      this.locations().forEach((location) => {
        location.itemVisible(true);
      });
    } else {
      var locationsTrue = [];
      this.filterItems().forEach((filterLocation) => {
        this.locations().forEach((location) => {
          if (filterLocation.title === location.title) {
            locationsTrue.push(location.title);
            location.itemVisible(true);
            this.viewLocation(location);
          } else if (locationsTrue.indexOf(location.title) !== -1) {
            return
          } else {
            location.itemVisible(false);
          }
        });
      });
    }
  };

  this.toggleDisplay = function() {
    if (this.menu.invisible() === false) {
      this.menu.optionsBoxVisible(false);
      this.menu.coffeeShopList(true);
      this.menu.invisible(true);
    } else if (this.menu.coffeeShopList() === true) {
      this.menu.coffeeShopList(false);
      this.menu.optionsBoxVisible(true);
    } else if (this.menu.invisible() === true) {
      this.menu.coffeeShopList(false);
      this.menu.optionsBoxVisible(false);
      this.menu.invisible(false);
    }

    if (this.menu.visibility === true) {

    }
  };

  this.viewLocation = function(data) {
    // console.log(data);
    markers.forEach((marker) => {
      if (data.id === marker.id) {
        showListing(marker);
      }
    });
  };
};

var Menu = function() {
  this.invisible = ko.observable(false);
  this.optionsBoxVisible = ko.observable(false);
  this.coffeeShopList = ko.observable(false);
  this.inputFilter = ko.observable("");
};

var MapModel = function() {
  this.zoomToAreaValue = ko.observable();
  this.searchWithinTimeValue = ko.observable();
  this.mode = ko.observable();
  this.maxDuration = ko.observable();
}

var CoffeeShop = function(data) {
  this.title = data.title;
  this.location = data.location;
  this.id = data.id;
  this.itemVisible = ko.observable(true);
};

ko.applyBindings(new ViewModel());

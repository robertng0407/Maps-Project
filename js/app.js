var data = data;

var ViewModel = function() {
  var self = this;

  this.menu = new Menu();

  this.locations = ko.observableArray();

  this.mapModel = new MapModel();

  data.forEach(location => {
    this.locations.push(new CoffeeShop(location));
  });

  this.locations().sort((a, b) => (a.title > b.title ? 1 : -1));

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

  // Listen for the event fired when the user selects a prediction and clicks
  // "go" more details for that place.
  this.textSearchPlaces = function() {
    textSearchPlaces(this.mapModel.placesSearch());
  };

  this.search = function(value) {
    self.locations.removeAll();
    hideMarkers(markers);
    data.forEach(location => {
      if (location.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        self.locations.push(new CoffeeShop(location));
        self.viewLocation(location);
      }
    });
  };

  this.menu.inputFilter.subscribe(this.search);

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

  this.viewLocationData = function(data) {
    self.viewLocation(data, true);
  };

  this.viewLocation = function(data, infoWindow) {
    if (infoWindow) {
      var viewInfo = true;
    }
    markers.forEach(marker => {
      if (data.id === marker.id) {
        showListing(marker, viewInfo);
      } else {
        stopAnimation(marker);
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
  this.placesSearch = ko.observable();
};

var CoffeeShop = function(data) {
  this.title = data.title;
  this.location = data.location;
  this.id = data.id;
};

ko.applyBindings(new ViewModel());

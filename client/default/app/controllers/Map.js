app.controllers.map = new Ext.Controller({

  markers: [], // Keep track of any map markers

  // Remove all markers from the map
  clearMarkers: function() {
    if (this.markers) {
      for (i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
    }
  },

  /*
   * Load cached points from local storage
   */
  loadPoints: function() {
    $fh.data({
      key: 'points'
    }, function(res) {
      console.log(res);

      if (res.val === null) { // No client data found
        app.controllers.map.getPoints();
      } else {
        // Parse the cached data
        var cache = JSON.parse(res.val);
        var hash  = cache.hash;

        app.controllers.map.getPoints(cache, hash);
      }
    });
  },

  /*
   * Get points from the cloud
   */
  getPoints: function(cache, hash) {
    var map = Ext.getCmp("map").map;
    $fh.act({
      act: 'getPoints',
      req: {
        hash: hash,
        timestamp: new Date().getTime()
      }
    }, function(res) {
      if (hash && hash === res.hash) {
        console.log("Client data is at the latest version");
      } else {
        $fh.data({
          act: 'save',
          key: 'points',
          val: JSON.stringify(res)
        });
      }
      var map = Ext.getCmp("map").map;

      for (var i = 0; i < res.data.locations.length; i++) {
        var point = res.data.locations[i];
        var pos   = new google.maps.LatLng(point.lat, point.lon);

        app.controllers.map.markers.push(new google.maps.Marker({
          position: pos,        
          map: map,
          icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (i+1) + '|FF0000|000000'
        })); 
      }
    });
  },

  /*
   * Get the users location and draw a marker at their location
   */
  getLocation: function(options){
    // Instance of the google map
    var map = Ext.getCmp("map").map;
    var pos = {};

    $fh.geo({
      interval: 0
    }, function(res){
      pos = new google.maps.LatLng(res.lat, res.lon);
      map.setCenter(pos);

      // Remove any previously created markers
      app.controllers.map.clearMarkers();

      // Create a marker at the current location
      app.controllers.map.markers.push(new google.maps.Marker({
        position: pos,        
        map: map,
        icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=0|00FF00|000000'
      }));  

      // Get markers from the cloud
      app.controllers.map.loadPoints();
      
    }, function() {
      // We failed to get the users geolocation, fallback to geo ip
      alert("$fh.geo failed");
      alert(JSON.stringify(res.geoip));
    });
  }

});
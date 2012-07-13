app.views.map = new Ext.Map({
  //fullscreen: true,
  layout: {
     type: 'fit'
  },
  id: 'map',
  title: 'Map',
  mapOptions: {
    zoom: 11,
  }
});

app.views.MapView = Ext.extend(Ext.Panel, {
  title: 'Map',
  iconCls: 'home',
  layout: {
   type: 'fit'
  },

  listeners: {
    activate: function() {
      google.maps.event.trigger(Ext.getCmp("map").map, 'resize');
    },
  	show: function() {
      // Get the users location
      Ext.dispatch({
        controller: app.controllers.map,
        action: 'getLocation'
      });
  	}
  },

  dockedItems: [
  	{
  		dock: 'top',
  		xtype: 'toolbar',
      title: '<img class="logo logoOffset" src="app/images/logo.png" />',
  		items: [
  			{
  				text: 'Back',
          ui: 'back',
          hidden: app.hideBack || false,
  				handler: function() {
  					app.views.viewport.setActiveItem(app.views.home, {type: 'slide', direction: 'right'});
  				}
  			}
  		]
  	}
  ],
  
  items: [
  	app.views.map
  ]
});
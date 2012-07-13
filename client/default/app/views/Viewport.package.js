// Hide the back buttons
app.hideBack = true;

/*
app.views.Viewport = Ext.extend(Ext.TabPanel, {
  fullscreen: true,
  //layout: 'fit',
  ui: 'light',

  cardSwitchAnimation: {
    type: 'slide',
    cover: true
  },

  tabBar: new Ext.TabBar({
    dock: 'bottom',
    layout: {
        pack: 'center'
    }
  }),
  defaults: {
    scroll: 'vertical'
  },

  initComponent: function() {

    // Put instances of cards into app.views namespace
    Ext.apply(app.views, {
      //twitter:  new app.views.Twitter(), 
      //map:      new app.views.MapView(),
      //payment:  new app.views.Payment(),
      settings: new app.views.Settings(),
      //camera:   new app.views.Camera()
    });

    Ext.apply(this, {
      items: [
        //app.views.twitter,
        //app.views.map,      
        //app.views.payment,
        app.views.settings,
      ]
    });
    app.views.Viewport.superclass.initComponent.apply(this, arguments);
  },

  layoutOrientation: function(orientation, w, h) {
    app.views.Viewport.superclass.layoutOrientation.call(this, orientation, w, h);
  }
});


*/

app.views.Viewport = Ext.extend(Ext.TabPanel, {
    tabBar: {
      dock: 'bottom',
      layout: {
          pack: 'center'
      }
    },
    fullscreen: true,
    ui: 'light',
    cardSwitchAnimation: {
        type: 'slide',
        cover: true
    },
    
    initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(app.views, {
          twitter:  new app.views.Twitter(), 
          settings: new app.views.Settings(),
          map:      new app.views.MapView(),
          payment:  new app.views.Payment(),
          camera:   new app.views.Camera()
        });
        //put instances of cards into viewport
        Ext.apply(this, {
          items: [
            app.views.twitter,
            app.views.map,      
            app.views.payment,
            app.views.camera,
            app.views.settings,
          ]
        });
        app.views.Viewport.superclass.initComponent.apply(this, arguments);
    },
    layoutOrientation : function(orientation, w, h) {
        app.views.Viewport.superclass.layoutOrientation.call(this, orientation, w, h);        
    }
});

// Loading Spinner
var mask = new Ext.LoadMask(Ext.getBody(), {
  msg: "Loading Data"
});
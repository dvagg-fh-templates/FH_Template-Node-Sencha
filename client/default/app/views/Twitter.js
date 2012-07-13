app.views.Twitter = Ext.extend(Ext.Panel, {
  title: 'Twitter',
  iconCls: 'time',
  width: '100%',
  layout: {
    type: 'vbox'
  },

  listeners: {
  	show: function() {

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
    {
      xtype: 'list',
      width: '100%',
      store: app.stores.twitter,
      itemTpl: '<img style="float: left; margin: 0px 8px 8px 0px;" src="{profile_image_url}" />' + 
      '<strong>{from_user}</strong>' +
      '{text}',
      flex: 1,
      plugins: [{
        ptype: 'pullrefresh'
      }]
    }
  ]
});
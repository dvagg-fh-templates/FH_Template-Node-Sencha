app.controllers.settings = new Ext.Controller({

  /* 
   * Load settings from local storage
   */
  loadSettings: function() {
    $fh.data({
      act: 'load',
      key: 'settings'
    }, function(res) {
      if (res.val === null) return;

      var settings = JSON.parse(res.val);

      Ext.getCmp('title' ).setValue(settings.title);
      Ext.getCmp('name'  ).setValue(settings.fullname);
      Ext.getCmp('toggle').setValue(settings.toggle);
      Ext.getCmp('slider').setValue(settings.slider);
    });
  },

  /*
   * Save settings to local storage
   */
  saveSettings: function() {
    var settings = {
      title:    Ext.getCmp('title').getValue(),
      fullname: Ext.getCmp('name').getValue(),
      toggle:   Ext.getCmp('toggle').getValue(),
      slider:   Ext.getCmp('slider').getValue()
    };

    // Save to local storage
    $fh.data({
      act: 'save',
      key: 'settings',
      val: JSON.stringify(settings)
    });
    Ext.Msg.alert('Success', 'Your settings have been saved.', Ext.emptyFn);
  }

});
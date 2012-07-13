app.views.Payment = Ext.extend(Ext.Panel, {
  title: 'Payment',
  iconCls: 'home',
  layout: 'fit',

  listeners: {
    beforeshow: function() {
    },
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
      xtype: 'form',
      items: [
        {
          xtype: 'fieldset',
          title: 'Payment Info',
          instructions: 'Please enter the payment information above.',
          defaults: {
            labelAlign: 'left',
            labelWidth: '50%'
          },
          items: [
            {
              xtype: 'selectfield',
              id: 'cardtype',
              name: 'cardtype',
              label: 'Card Type',
              options: [{
                text: 'Visa',
                value: 'visa'
              }, {
                text: 'Mastercard',
                value: 'mastercard'
              }]
            },
            {
              xtype: 'textfield',
              id: 'cardnumber',
              name: 'cardnumber',
              label: 'Card Number'
            },
          ]
        },
        {
          xtype: 'button',
          text: 'Validate Card Number',
          handler: function() {
            Ext.dispatch({
              controller: app.controllers.payment,
              action: 'processPayment'
            });
          }
        }
      ]
    }
  ]
});
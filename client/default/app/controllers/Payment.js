app.controllers.payment = new Ext.Controller({

  /*
   * Check if a credit card number if valid
   */
  processPayment: function() {
    var cardType   = Ext.getCmp("cardtype").getValue();
    var cardNumber = Ext.getCmp("cardnumber").getValue();

    if (cardNumber.length !== 16) {
      Ext.Msg.alert('Error', 'Card number must be 16 digits.', Ext.emptyFn);
      return;
    }
    
    // Show loading spinner
    mask.show();

    // Call to the cloud
    $fh.act({
      act: 'payment',
      req: {
        cardType: cardType,
        cardNumber: cardNumber
      }
    }, function(res) {
      alert(JSON.stringify(res));
      console.log(res);

      var regEx  = new RegExp("<\s*string[^>]*>(.*?)<\s*/\s*string>", "g");
      var result = regEx.exec(res.body)[1];

      // Hide loading spinner
      mask.hide();

      // Empty the credit card field
      Ext.getCmp("cardnumber").setValue();

      Ext.Msg.alert('Response', result, Ext.emptyFn);
    });
  }

});
app.models.Twitter = Ext.regModel('app.models.Twitter', {
  fields: ['from_user', 'text', 'profile_image_url', 'from_user_name'],
  proxy: {
    type: 'fhact',
    reader: 'json',
    id: 'getTweets'
  }
});

app.stores.twitter = new Ext.data.Store({
  model: 'app.models.Twitter',
  autoLoad: true,
});
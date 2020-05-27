const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.sendWelcomeEmail = functions
  .region('europe-west1')
  .auth.user().onCreate((user) => {

});

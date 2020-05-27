const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

let db = admin.firestore();

exports.initUser = functions
  .region('europe-west1')
  .auth.user().onCreate((user) => {
    let setDoc = db.collection('users').doc(user.uid).set({});
    return 'ok';
});

exports.onNewTestRun = functions.firestore
  .document('users/{userId}/runs/{runId}')
  .onCreate((snap, context) => {
      const runData = snap.data();

      const challenge = runData.challenge;
      const passed = runData.results.assertions.failed === 0;

      const userRes = db.doc(`challenges/${challenge}/users/${context.params.userId}/`).set({
         passed: passed
      });
      return 'ok';
  });
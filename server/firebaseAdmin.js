const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-key.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-project-id.firebaseio.com",
});

module.exports = admin;

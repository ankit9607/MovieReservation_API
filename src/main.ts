import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import { AppRoute } from './route/app.route';


//init Express Framework
const app = express();


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// parse requests of content-type - application/json
app.use(bodyParser.json());


//Router
app.use('/', AppRoute.instance());



/*********************** BELOW Settings for Deployment on FIREBASE  with DEFAULT PORT *****************************/
//FIREBASE INIT
// admin.initializeApp(functions.config().firebase);
// export const db = admin.firestore();


// //Deploy API to Firebase
// export const udaan_api = functions.https.onRequest(app);


/*********************** BELOW Settings for Deployment on FIREBASE with DEFUALT PORT *****************************/


/*********************** BELOW Settings for Deployment on NODEJS with 9090 PORT *****************************/

//FIREBASE INIT
const serviceAccount = require('../firebase-service-account-key.json');
admin.initializeApp({credential : admin.credential.cert(serviceAccount)});
export const db = admin.firestore();



//Deploy API to Firebase
//export const udaan_api = functions.https.onRequest(app);

//
//EXPRESS 
var port = 9090;
app.listen(port, () => console.log(`UdaanAPI app listening on port ${port}!`))

/*********************** BELOW Settings for Deployment on NODEJS with 9090 PORT *****************************/
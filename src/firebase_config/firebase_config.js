//Firebase Initilazations
import admin from 'firebase-admin';
import serviceAccount from "../../meetwithfellowmate-firebase-adminsdk-o92fn-6936f69345.json" assert { type: "json" };
const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

//firestore  
const db=firebase.firestore();
//Collections
const usersdataCollection=db.collection("users_data");
const eventdataCollections=db.collection("events")


const _auth=firebase.auth();
export {db,usersdataCollection,eventdataCollections,_auth};
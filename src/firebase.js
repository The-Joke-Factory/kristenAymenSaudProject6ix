import firebase from 'firebase/app';
import 'firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyAsZzlfleBeT9bzHKQrOQS1ow9n4156J2o",
    authDomain: "joke-generator-4248a.firebaseapp.com",
    databaseURL: "https://joke-generator-4248a.firebaseio.com",
    projectId: "joke-generator-4248a",
    storageBucket: "joke-generator-4248a.appspot.com",
    messagingSenderId: "250719953187",
    appId: "1:250719953187:web:fea752e43d0798e812ec96"
};

firebase.initializeApp(firebaseConfig);



export default firebase;
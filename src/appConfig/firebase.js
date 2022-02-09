import firebase from 'firebase'

const config = {

    apiKey: "AIzaSyB4WJ_nspMyFA_zsSZ9ky_SoQiS2QOp70I",
    authDomain: "website-ecom-ff223.firebaseapp.com",
    databaseURL: "https://website-ecom-ff223-default-rtdb.firebaseio.com",
    projectId: "website-ecom-ff223",
    storageBucket: "website-ecom-ff223.appspot.com",
    messagingSenderId: "144186283636",
    appId: "1:144186283636:web:62089fbba201d3d19f6321",
    measurementId: "G-VQQ7R9KDWE"

};

const firebaseApp = firebase.initializeApp(config)

export default {
    firebase: firebaseApp,
    dbRef: firebaseApp.database().ref(),
    dbProdutosRef: firebaseApp.database().ref('produtos'),
    dbUsuariosRef: firebaseApp.database().ref('usuarios'),
    auth: firebaseApp.auth()
}
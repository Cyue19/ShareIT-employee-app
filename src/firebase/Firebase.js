import React, { Component } from 'react';

import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

export default class Firebase extends Component {
    //singleton

    static instance;

    static getInstance() {
        if (!Firebase.instance) {
            Firebase.instance = new Firebase();
        }
        return Firebase.instance;
    }

    constructor(props) {
        super(props);

        //initialize firebase
        var firebaseConfig = {
            apiKey: "AIzaSyDUGccJMpPwaHiuDwskKhUJc-Q_UWWe4E8",
            authDomain: "share-it-98090.firebaseapp.com",
            projectId: "share-it-98090",
            storageBucket: "share-it-98090.appspot.com",
            messagingSenderId: "855310610695",
            appId: "1:855310610695:web:0673cad870a4633a3c15a2",
            measurementId: "G-D4K63PBRBX"
        }
        this.firebase = firebase.initializeApp(firebaseConfig);
        this.db = this.firebase.firestore();
        this.auth = this.firebase.auth();
        this.storage = this.firebase.storage();
    }
}

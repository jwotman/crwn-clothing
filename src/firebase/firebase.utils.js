import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config =  {
  apiKey: "AIzaSyC1BTl_j_R_ob_uVl5b_DBKt7CRFLdq0kY",
  authDomain: "crwn2-72391.firebaseapp.com",
  projectId: "crwn2-72391",
  storageBucket: "crwn2-72391.appspot.com",
  messagingSenderId: "323538384559",
  appId: "1:323538384559:web:a02519e4c4fdea89fe865a"
}
  // Initialize Firebase
  
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  //auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth){return;}

    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user',error.message);
      }
    }

    return userRef;
  }

  export default firebase;
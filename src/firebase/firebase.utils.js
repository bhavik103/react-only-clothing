import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBqHCJOIofJiggIYltchgeJgtgPHeCe7Ms",
  authDomain: "only-clothing-db.firebaseapp.com",
  databaseURL: "https://only-clothing-db.firebaseio.com",
  projectId: "only-clothing-db",
  storageBucket: "only-clothing-db.appspot.com",
  messagingSenderId: "340285074097",
  appId: "1:340285074097:web:54e5efddb1a6ea8e035090",
  measurementId: "G-T8CV4ZB9R8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

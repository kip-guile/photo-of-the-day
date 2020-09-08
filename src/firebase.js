import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDS6iRPppyafp96tc3wMAkhLmfo2eAcT5o',
  authDomain: 'nasa-favorites.firebaseapp.com',
  databaseURL: 'https://nasa-favorites.firebaseio.com',
  projectId: 'nasa-favorites',
  storageBucket: 'nasa-favorites.appspot.com',
  messagingSenderId: '221236978269',
  appId: '1:221236978269:web:3396f62fa876ad220463b4',
  measurementId: 'G-PVB310YHGE',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase

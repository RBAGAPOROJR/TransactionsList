
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey              :   'AIzaSyBsdr_LFpFKJo0XXnM2WxeTAzY8jOWJESM',
  authDomain          :   'info6132lab02.firebaseapp.com',
  projectId           :   'info6132lab02',
  storageBucket       :   'info6132lab02.appspot.com',
  messagingSenderId   :   '89458535532',
  appId               :   '1:89458535532:web:a70975925781837892bc49',

}

// Initialize Firebase
const app = initializeApp( firebaseConfig )

export const dbFS = getFirestore( app )

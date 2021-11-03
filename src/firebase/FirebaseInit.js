// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyCl5BbkfzCsCR_mHRfMgQ7KnygeSTq8B2w",
    authDomain: "samarth-website.firebaseapp.com",
    projectId: "samarth-website",
    storageBucket: "samarth-website.appspot.com",
    messagingSenderId: "781185982480",
    appId: "1:781185982480:web:8b8808a2cc37417bc12a95",
    measurementId: "G-VRCECK8WW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app)
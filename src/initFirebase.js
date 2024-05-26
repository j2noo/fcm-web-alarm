import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBX7GSmqE7Q77TIhjLWqYa4pfL2bfCIBdk",
  authDomain: "energiology-4bacb.firebaseapp.com",
  projectId: "energiology-4bacb",
  storageBucket: "energiology-4bacb.appspot.com",
  messagingSenderId: "455206486382",
  appId: "1:455206486382:web:32155521bf5a3bc7b7817f",
  measurementId: "G-PH26F00GP0"
};

export const app = initializeApp(firebaseConfig);
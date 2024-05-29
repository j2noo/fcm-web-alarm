import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBX7GSmqE7Q77TIhjLWqYa4pfL2bfCIBdk",
  authDomain: "energiology-4bacb.firebaseapp.com",
  projectId: "energiology-4bacb",
  storageBucket: "energiology-4bacb.appspot.com",
  messagingSenderId: "455206486382",
  appId: "1:455206486382:web:32155521bf5a3bc7b7817f",
  measurementId: "G-PH26F00GP0",
};

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

isSupported().then((supported) => {
  if (supported) {
    initializeApp(firebaseConfig);
    getMessaging();
  } else {
    console.error("Browser does not support notifications");
  }
});

export function requestPermission() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey:
            "BIEcvjHkojO7bX6UwC4Np2SbgxHwVYR4s2SPY_k3TPiKU7O9y9RRKYeBGixK59Jm673kQUkn6cVWCv0Gd7jN5mA",
        })
          .catch((err) => {
            const error =
              "AbortError: Failed to execute 'subscribe' on 'PushManager': Subscription failed - no active Service Worker";
            if (err.toString() === error) {
              registerServiceWorker();
              return getToken(messaging, {
                vapidKey:
                  "BIEcvjHkojO7bX6UwC4Np2SbgxHwVYR4s2SPY_k3TPiKU7O9y9RRKYeBGixK59Jm673kQUkn6cVWCv0Gd7jN5mA",
              });
            } else {
              reject("");
            }
          })
          .then((currentToken) => {
            if (currentToken) {
              resolve(currentToken);
            } else {
              console.log(
                "No Instance ID token available. Request permission to generate one."
              );
              reject("");
            }
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      } else if (permission === "denied") {
        console.log("푸시 권한 차단");
        resolve("");
      }
    });
  });
}

export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {
          console.log(
            "Service Worker가 scope에 등록되었습니다.22:",
            registration.scope
          );
        })
        .catch(function (err) {
          console.log("Service Worker 등록 실패:", err);
        });
    });
  }
}

// src/firebase-messaging-sw.ts

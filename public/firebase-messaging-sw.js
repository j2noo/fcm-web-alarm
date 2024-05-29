// /public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다. with actitve");
});

const firebaseConfig = {
  apiKey: "AIzaSyBX7GSmqE7Q77TIhjLWqYa4pfL2bfCIBdk",
  authDomain: "energiology-4bacb.firebaseapp.com",
  projectId: "energiology-4bacb",
  storageBucket: "energiology-4bacb.appspot.com",
  messagingSenderId: "455206486382",
  appId: "1:455206486382:web:32155521bf5a3bc7b7817f",
  measurementId: "G-PH26F00GP0",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const LOGO_URL =
  "https://elecprediction.s3.ap-northeast-2.amazonaws.com/capslogo.png";

self.addEventListener("push", function (e) {
  console.log("push event 발생");
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: LOGO_URL,
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// messaging.onBackgroundMessage((payload) => {
//   console.log("백그라운드알림1");
//   const notificationTitle = payload.title;
//   const notificationOptions = {
//     body: payload.body,
//     icon: LOGO_URL,
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// messaging.onMessage(messaging, (payload) => {
//   console.log("포그라운드알림 도1 ", payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   if (Notification.permission === "granted") {
//     new Notification(notificationTitle, notificationOptions);
//   }
// });

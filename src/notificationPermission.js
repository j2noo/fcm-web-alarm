// src/service/notificationPermission.js
import { getToken, getMessaging, isSupported } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { registerServiceWorker } from "./registerServiecWorker";

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

export async function handleAllowNotification() {
  registerServiceWorker(); // 나중에 설명
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BIEcvjHkojO7bX6UwC4Np2SbgxHwVYR4s2SPY_k3TPiKU7O9y9RRKYeBGixK59Jm673kQUkn6cVWCv0Gd7jN5mA",
      });
      if (token) {
        console.log(token);
        // sendTokenToServer(token);// (토큰을 서버로 전송하는 로직)
      } else {
        alert("토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요");
      }
    } else if (permission === "denied") {
      alert(
        "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
      );
    }
  } catch (error) {
    console.error("푸시 토큰 가져오는 중에 에러 발생", error);
  }
}

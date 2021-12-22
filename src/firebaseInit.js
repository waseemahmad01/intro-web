import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBDg-iNi9TEuXDx4MwJJ-CYxOwatSBFvk4",
  authDomain: "coral-mariner-289404.firebaseapp.com",
  databaseURL: "https://coral-mariner-289404.firebaseio.com",
  projectId: "coral-mariner-289404",
  storageBucket: "coral-mariner-289404.appspot.com",
  messagingSenderId: "340022628106",
  appId: "1:340022628106:web:f4d284c5c6610d4418f4f3",
  measurementId: "G-W4J550FM1B",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export var token = "";

export const getToken = async () => {
  const token = await messaging.getToken({
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });
  return token;
};
export function subscribeTokenToTopic(token, topic) {
  const url = `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`;
  fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
    method: "POST",
    headers: new Headers({
      Authorization: `key=${process.env.REACT_APP_FCM_SERVER_KEY}`,
    }),
  })
    .then((response) => {
      if (response.status < 200 || response.status >= 400) {
        console.log(response.status, response);
      }
      console.log(`"${topic}" is subscribed`, url);
    })
    .catch((error) => {
      console.error(error.result);
    });
  return true;
}

export const onMessageListener = () => {
  return new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload.data);
    });
  });
};

import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/firestore";
import "firebase/storage";

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DB_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DB_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging();
export const db = firebase.firestore();
export const cloudStorage = firebase.storage();
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
      console.log(`"${topic}" is subscribed`);
    })
    .catch((error) => {
      console.error(error.result);
    });
  return true;
}

export const onMessageListener = () => {
  try {
    return new Promise((resolve) => {
      messaging.onMessage((payload) => {
        // console.log("message", payload.data);
        resolve(payload.data);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

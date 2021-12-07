importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

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

messaging.onBackgroundMessage(function (payload) {
  console.log("background notification", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    notificationBody: payload.notification.body,
    icon: "/logo192.png",
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

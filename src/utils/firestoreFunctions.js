// import { db, cloudStorage } from "../firebaseInit";

// export const onMessage = (
//   chatId,
//   fromId,
//   toId,
//   message,
//   filename,
//   type,
//   socket
// ) => {
//   const docId = new Date().getTime().toString();
//   let tzoffset = new Date().getTimezoneOffset() * 60000;
//   let timestamp = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
//   const doc = {
//     content: message,
//     filename: filename || "",
//     idFrom: fromId,
//     idTo: toId,
//     thumb: 0,
//     timestamp: timestamp,
//     type: type,
//   };
//   const ref = db
//     .collection("messages")
//     .doc(chatId)
//     .collection(chatId)
//     .doc(docId);
//   ref.set(doc);
//   socket.emit("lastmessage", {
//     // msg: message,
//     // chatId: chatId,
//     // userId: currentUser._id,
//     // firstMsg: chat.length === 0 ? currentUser._id : userId,
//     // lastmsgTime: docId,
//   });
//   return { ref, docId };
// };

// export const onFileUpload = async (file, docId) => {
//   const ref = cloudStorage.ref();
//   const fileRef = ref.child(`${docId}.acc`);
//   await fileRef.put(file);
//   const downloadURL = fileRef.getDownloadURL();
//   return downloadURL;
// };

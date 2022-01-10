import { db, cloudStorage } from "../firebaseInit";

export const onMessage = (payload, chatId, socket, userId, firstMsg) => {
  const date = new Date();
  const doc = { ...payload };
  doc.timestamp = date.toISOString();
  const docId = date.getTime().toString();

  db.collection("messages").doc(chatId).collection(chatId).doc(docId).set(doc);

  const data = {
    msg: doc.type === 0 ? doc.content : "🖼",
    chatId: chatId,
    userId: userId,
    firstMsg: firstMsg,
    lastmsgTime: doc.timestamp,
  };
  socket.emit("lastmessage", data);
};

export const onFileMessage = async (
  payload,
  chatId,
  socket,
  userId,
  firstMsg,
  file
) => {
  const date = new Date();
  const doc = { ...payload };
  doc.timestamp = date.toISOString();
  const docId = date.getTime().toString();
  const docRef = cloudStorage.ref();
  const fileRef = docRef.child(
    doc.type === 2 ? `${docId}.acc` : `${docId}.mp4`
  );
  if (doc.type === 1) {
    doc.filename = `${docId}.mp4`;
  } else if (doc.type === 2) {
    doc.filename = `${docId}.acc`;
  }
  const ref = db
    .collection("messages")
    .doc(chatId)
    .collection(chatId)
    .doc(docId);
  ref.set(doc);

  await fileRef.put(file);
  const dbURL = await fileRef.getDownloadURL();
  ref.update({ content: dbURL });
  let msg;
  if (doc.type === 1) {
    msg = "📹";
  } else if (doc.type === 2) {
    msg = "🎤";
  }
  const data = {
    msg: msg,
    chatId: chatId,
    userId: userId,
    firstMsg: firstMsg,
    lastmsgTime: doc.timestamp,
  };
  socket.emit("lastmessage", data);
};

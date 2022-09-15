import { db, auth } from './FirebaseConfig.js';
import { doc, collection, addDoc, deleteDoc } from 'firebase/firestore';

export const addBookmark = async (inputValue) => {
  const uid = auth.currentUser.uid;
  await addDoc(collection(db, 'users', uid, 'bookmarks'), {
    word: inputValue,
  });
};

export const removeBookmark = async (id) => {
  const uid = auth.currentUser.uid;
  await deleteDoc(doc(db, 'users', uid, 'bookmarks', id));
};
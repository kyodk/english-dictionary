import { db, auth } from './FirebaseConfig.js';
import { doc, collection, addDoc, deleteDoc, getDocs } from 'firebase/firestore';

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

export const firestore_getDoc = async (uid, posts, setBookmarks) => {
  const docSnap = await getDocs(
    collection(db, 'users', uid, 'bookmarks')
  );
  docSnap.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    posts.push({
      word: data.word,
      id: id,
    });
  });
  setBookmarks(posts);
};
import { useSaveContext } from '../contexts/SaveContext';
import { db, auth } from '../FirebaseConfig.js';
import {
  collection,
  doc,
  deleteDoc,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const useBookmark = () => {
  const { saved, setSaved } = useSaveContext();
  const uid = auth.currentUser.uid;

  const addBookmark = async (inputValue) => {
    setSaved(saved);
    const docRef = collection(db, 'users', uid, 'bookmarks');
    const q = query(docRef, where('word', '==', inputValue));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      await addDoc(collection(db, 'users', uid, 'bookmarks'), {
        word: inputValue,
      });
    }
  };

  const removeBookmark = async (id) => {
    await deleteDoc(doc(db, 'users', uid, 'bookmarks', id));
  };

  return {
    addBookmark,
    removeBookmark,
  };
};

export default useBookmark;

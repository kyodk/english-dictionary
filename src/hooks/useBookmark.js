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
  const { setSaved } = useSaveContext();

  const addBookmark = async (inputValue) => {
    setSaved(true);
    const uid = auth.currentUser.uid;
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
    const uid = auth.currentUser.uid;
    deleteDoc(doc(db, 'users', uid, 'bookmarks', id));
    await setSaved(false);
  };

  return {
    addBookmark,
    removeBookmark,
  };
};

export default useBookmark;

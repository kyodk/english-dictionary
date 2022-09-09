import { useState, useEffect } from 'react';
import { useInputContext } from '../App';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../FirebaseConfig.js';
import { doc, collection, addDoc, deleteDoc, getDocs } from 'firebase/firestore';

export const useAddBookmark = async () => {
  const { inputValue } = useInputContext();
  const [saved, setSaved] = useState(false);

  setSaved(true);
  const uid = auth.currentUser.uid;
  await addDoc(collection(db, 'users', uid, 'bookmarks'), {
    word: inputValue,
  });
};

export const useRemoveBookmark = async (id) => {
  const uid = auth.currentUser.uid;
  await deleteDoc(doc(db, 'users', uid, 'bookmarks', id));
};

export const useFirestore_getDoc = async () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    let posts = [];
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      const uid = user.uid;

      const firestore_getDoc = async () => {
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
      
      firestore_getDoc();
    });
  }, []);
};
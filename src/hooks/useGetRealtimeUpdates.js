import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { db } from '../FirebaseConfig.js';
import { collection, onSnapshot } from 'firebase/firestore';

const useGetRealtimeUpdates = () => {
  const { user } = useAuthContext();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!user) return;
    const uid = user.uid;
    const unsub = onSnapshot(
      collection(db, 'users', uid, 'bookmarks'),
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          results.push({
            word: data.word,
            id: id,
          });
        });
        setBookmarks(results);
      }
    );
    return () => unsub();
  }, [user]);
  return { bookmarks };
};

export default useGetRealtimeUpdates;

import { db, auth } from '../FirebaseConfig.js';
import { doc, deleteDoc } from 'firebase/firestore';
import { ListGroup } from 'react-bootstrap';
import { BsBookmarkXFill } from 'react-icons/bs';

const BookmarkListItem = ({ word, id }) => {
  const removeBookmark = async (id) => {
    const uid = auth.currentUser.uid;
    await deleteDoc(doc(db, 'users', uid, 'bookmarks', id));
  };

  return (
    <ListGroup.Item>
      <div className="d-flex align-items-center justify-content-between">
        <p className="mb-0">{word}</p>
        <BsBookmarkXFill className="fs-5" onClick={() => removeBookmark(id)} />
      </div>
    </ListGroup.Item>
  );
};

export default BookmarkListItem;

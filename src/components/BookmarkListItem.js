import { useInputContext, useSaveContext } from '../App';
import { Link } from 'react-router-dom';
import { db, auth } from '../FirebaseConfig.js';
import { doc, deleteDoc } from 'firebase/firestore';
import { ListGroup } from 'react-bootstrap';
import { BsBookmarkXFill } from 'react-icons/bs';

const BookmarkListItem = ({ word, id }) => {
  const { setInputValue } = useInputContext();
  const { setSaved } = useSaveContext();

  const removeBookmark = async (id) => {
    const uid = auth.currentUser.uid;
    await deleteDoc(doc(db, 'users', uid, 'bookmarks', id));
  };

  const linkToHome = (word) => {
    setInputValue(word);
    setSaved(true);
  };

  return (
    <ListGroup.Item>
      <div className="d-flex align-items-center justify-content-between">
        <Link
          to="/"
          onClick={() => linkToHome(word)}
          className="mb-0 link-dark"
          data-word={word}
        >
          {word}
        </Link>
        <BsBookmarkXFill className="fs-5" onClick={() => removeBookmark(id)} />
      </div>
    </ListGroup.Item>
  );
};

export default BookmarkListItem;

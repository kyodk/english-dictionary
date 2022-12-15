import { Link } from 'react-router-dom';
import { useInputContext } from '../contexts/InputContext';
import useBookmark from '../hooks/useBookmark';
import { ListGroup } from 'react-bootstrap';
import { BsBookmarkXFill } from 'react-icons/bs';

const BookmarkListItem = ({ word, id }) => {
  const { setInputValue } = useInputContext();
  const { removeBookmark } = useBookmark();

  const linkToHome = (word) => {
    setInputValue(word);
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
        <BsBookmarkXFill
          className="fs-5 cursor-pointer"
          onClick={() => removeBookmark(id)}
        />
      </div>
    </ListGroup.Item>
  );
};

export default BookmarkListItem;

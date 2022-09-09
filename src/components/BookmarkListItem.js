import { ListGroup } from 'react-bootstrap';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { removeBookmark } from '../Database.js';

const BookmarkListItem = ({ word, id }) => (
    <ListGroup.Item>
      <div className="d-flex align-items-center justify-content-between">
        <p className="mb-0">{word}</p>
        <BsFillBookmarkHeartFill onClick={() => removeBookmark(id)}/>
      </div>
    </ListGroup.Item>
  );

export default BookmarkListItem;

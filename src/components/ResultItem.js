import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useInputContext } from '../contexts/InputContext';
import useBookmark from '../hooks/useBookmark';
import useGetRealtimeUpdates from '../hooks/useGetRealtimeUpdates';
import { Row, Col } from 'react-bootstrap';
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs';
import Meaning from './Meaning';

const ResultItem = ({ response }) => {
  const { user } = useAuthContext();
  const { inputValue } = useInputContext();
  const { addBookmark } = useBookmark();
  const { bookmarks } = useGetRealtimeUpdates();
  const [bookmarked, setbookmarked] = useState(false);

  useEffect(() => {
    const bookmarked = bookmarks.some(
      (bookmark) => bookmark.word === inputValue
    );
    setbookmarked(bookmarked);
  }, [bookmarks]);

  return (
    <Row className="justify-content-center">
      <Col lg="8">
        <Row>
          <Col>
            <h2 className="mb-3">{response[0].word}</h2>
          </Col>
          {user ? (
            <Col className="fs-4 text-end">
              {bookmarked ? (
                <BsBookmarkHeartFill />
              ) : (
                <BsBookmarkHeart
                  onClick={() => addBookmark(inputValue)}
                  className="cursor-pointer"
                />
              )}
            </Col>
          ) : (
            ''
          )}
        </Row>
        <hr />
        <Meaning response={response} />
      </Col>
    </Row>
  );
};

export default ResultItem;

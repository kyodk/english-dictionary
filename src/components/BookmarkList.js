import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useSaveContext } from '../contexts/SaveContext';
import useGetRealtimeUpdates from '../hooks/useGetRealtimeUpdates';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import BookmarkListItem from './BookmarkListItem';

const BookmarkList = () => {
  const { user, loading } = useAuthContext();
  const { setSaved } = useSaveContext();
  const { bookmarks } = useGetRealtimeUpdates();

  const navigate = useNavigate();

  const backLinkClick = () => {
    setSaved(false);
  };

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            navigate('/')
          ) : (
            <Container className="pt-5">
              <Row className="justify-content-center">
                <Col lg="8">
                  <Link
                    to="/"
                    onClick={backLinkClick}
                    className="fs-4 text-black"
                  >
                    <BsArrowLeft />
                  </Link>
                  <ListGroup variant="flush" className="mt-3">
                    {bookmarks.map((bookmark) => (
                      <BookmarkListItem
                        word={bookmark.word}
                        key={bookmark.id}
                        id={bookmark.id}
                      />
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default BookmarkList;

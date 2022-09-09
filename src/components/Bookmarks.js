import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig.js';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import BookmarkListItem from './BookmarkListItem';
import { firestore_getDoc } from '../Database.js';

const Bookmarks = () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  // useEffect(() => {
  //   let posts = [];
  //   onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //     setLoading(false);
  //     const uid = user.uid;
  //     firestore_getDoc(uid, posts, setBookmarks);
  //   });
  // }, [bookmarks]);

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/`} />
          ) : (
            <Container className="pt-5">
              <Row className="justify-content-center">
                <Col lg="8">
                  <Link to="/" className="fs-4 text-black">
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

export default Bookmarks;

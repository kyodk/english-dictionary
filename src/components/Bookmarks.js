import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useSaveContext } from '../contexts/SaveContext';
import { db } from '../FirebaseConfig.js';
import { collection, onSnapshot } from 'firebase/firestore';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import BookmarkListItem from './BookmarkListItem';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { user, loading } = useAuthContext();
  const { setSaved } = useSaveContext();

  const navigate = useNavigate();

  const backLinkClick = () => {
    setSaved(false);
  };

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

export default Bookmarks;

import { useState, useEffect } from 'react';
import { useSaveContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../FirebaseConfig.js';
import { onSnapshot, collection } from 'firebase/firestore';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import BookmarkListItem from './BookmarkListItem';

const Bookmarks = () => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const { setSaved } = useSaveContext();
  const [numOfElement, setnumOfElement] = useState(false);

  const navigate = useNavigate();

  const backLinkClick = () => {
    setSaved(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

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

    const numOfElement = Object.keys(bookmarks).length === 0;
    setnumOfElement(numOfElement);

    return () => unsub();
  }, [user, bookmarks]);

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
                  {numOfElement ? (
                    <p className="py-5 text-center fs-3 fw-bold">
                      There ane no bookmarks...
                    </p>
                  ) : (
                    <ListGroup variant="flush" className="mt-3">
                      {bookmarks.map((bookmark) => (
                        <BookmarkListItem
                          word={bookmark.word}
                          key={bookmark.id}
                          id={bookmark.id}
                        />
                      ))}
                    </ListGroup>
                  )}
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

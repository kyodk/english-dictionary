import { useState, useEffect } from 'react';
import dictionaryapi from '../api/dictionaryapi';
import { useAuthContext } from '../contexts/AuthContext';
import { useInputContext } from '../contexts/InputContext';
import { useSaveContext } from '../contexts/SaveContext';
import useBookmark from '../hooks/useBookmark';
import { db } from '../FirebaseConfig.js';
import { collection, onSnapshot } from 'firebase/firestore';
import { Container, Row, Col, Badge, Placeholder } from 'react-bootstrap';
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs';

const Result = () => {
  const { user } = useAuthContext();
  const { inputValue } = useInputContext();
  const { saved } = useSaveContext();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarked, setbookmarked] = useState(false);
  const { addBookmark } = useBookmark();

  const fetchData = async (word) => {
    try {
      setLoading(true);
      const res = await dictionaryapi(`/${word}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    if (inputValue.length) {
      fetchData(inputValue);
    }

    const bookmarked = bookmarks.some(
      (bookmark) => bookmark.word === inputValue
    );
    setbookmarked(bookmarked);
  }, [inputValue, bookmarks]);

  if (loading) {
    return (
      <Row className="justify-content-center mt-5">
        <Col lg="6">
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} bg="secondary" className="p-3 rounded-3" />
          </Placeholder>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} bg="secondary" className="p-5 rounded-3" />
          </Placeholder>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} bg="secondary" className="p-3 rounded-3" />
          </Placeholder>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} bg="secondary" className="p-5 rounded-3" />
          </Placeholder>
        </Col>
      </Row>
    );
  }

  if (error) {
    return <p className="py-5 text-center fs-3 fw-bold">No results found...</p>;
  }

  return (
    <>
      {response && (
        <section>
          <Container className="py-5">
            <Row className="justify-content-center">
              <Col lg="8">
                <Row className="align-items-center">
                  <Col>
                    <h2 className="mb-3">{response[0].word}</h2>
                  </Col>
                  {user ? (
                    <Col sm="auto" className="fs-4">
                      {saved || bookmarked ? (
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
                <ol>
                  {response.map((val) =>
                    val.meanings.map((means, index) => (
                      <li key={index} className="mb-4">
                        <Badge
                          key={means.partOfSpeech}
                          bg="dark"
                          className="mt-4 mb-4 fs-6"
                        >
                          {means.partOfSpeech}
                        </Badge>
                        {means.definitions.map((def, index) => (
                          <ul key={index} className="list-unstyled mb-3">
                            <li className="fw-bold">{def.definition}</li>
                            {def.example && (
                              <li className="fw-light fst-italic">
                                {def.example}
                              </li>
                            )}
                          </ul>
                        ))}
                      </li>
                    ))
                  )}
                </ol>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default Result;

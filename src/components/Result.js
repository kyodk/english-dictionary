import { useEffect, useState } from 'react';
import { useInputContext, useSaveContext } from '../App';
import axios from 'axios';
import { db, auth } from '../FirebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs';

axios.defaults.baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

const Result = () => {
  const { inputValue } = useInputContext();
  const { saved, setSaved } = useSaveContext();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async (word) => {
    try {
      const res = await axios(`/${word}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData(inputValue);
    }
  }, [inputValue]);

  const addBookmark = async (inputValue) => {
    setSaved(!saved);
    const uid = auth.currentUser.uid;
    await addDoc(collection(db, 'users', uid, 'bookmarks'), {
      word: inputValue,
    });
  };

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
                  <Col sm="auto" className="fs-4">
                    {saved ? (
                      <BsBookmarkHeartFill />
                    ) : (
                      <BsBookmarkHeart
                        onClick={() => addBookmark(inputValue)}
                      />
                    )}
                  </Col>
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

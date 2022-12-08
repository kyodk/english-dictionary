import { useState, useEffect } from 'react';
import dictionaryapi from '../api/dictionaryapi';
import { useInputContext } from '../contexts/InputContext';
import useGetRealtimeUpdates from '../hooks/useGetRealtimeUpdates';
import { Container, Row, Col, Placeholder } from 'react-bootstrap';
import ResultItem from './ResultItem';

const Result = () => {
  const { inputValue } = useInputContext();
  const { bookmarks } = useGetRealtimeUpdates();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookmarked, setbookmarked] = useState(false);

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
            <ResultItem response={response} bookmarked={bookmarked} />
          </Container>
        </section>
      )}
    </>
  );
};

export default Result;

import { useAuthContext } from '../contexts/AuthContext';
import { useInputContext } from '../contexts/InputContext';
import { useSaveContext } from '../contexts/SaveContext';
import useBookmark from '../hooks/useBookmark';
import { Row, Col } from 'react-bootstrap';
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs';
import Meaning from './Meaning';

const ResultItem = ({ response, bookmarked }) => {
  const { user } = useAuthContext();
  const { inputValue } = useInputContext();
  const { saved } = useSaveContext();
  const { addBookmark } = useBookmark();

  return (
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
        <Meaning response={response} />
      </Col>
    </Row>
  );
};

export default ResultItem;

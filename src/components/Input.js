import { useState, useEffect, useRef } from 'react';
import { useInputContext, useSaveContext } from '../App';
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import dompurify from 'dompurify';

const Input = () => {
  const [value, setValue] = useState('');
  const { inputValue, setInputValue } = useInputContext();
  const { setSaved } = useSaveContext();

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    let htmlString = e.target.value;
    setValue(dompurify.sanitize(htmlString, { USE_PROFILES: { html: true } }));
  };

  const handleSubmit = () => {
    if (!(value === '')) {
      setInputValue(value);
      setValue('');
      setSaved(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !(value === '')) {
      setInputValue(value);
      setValue('');
      setSaved(false);
    }
  };

  return (
    <section className="bg-dark">
      <Container className="bg-dark py-5">
        <Row className="justify-content-center text-center py-5">
          <Col lg="8">
            <h1 className="text-white mb-5">Learner's dictionary</h1>
            <InputGroup size="lg" className="mb-3">
              <FormControl
                type="search"
                placeholder="Search..."
                onChange={handleInputChange}
                value={value}
                ref={searchRef}
                onKeyDown={handleInputKeyDown}
              />
              <Button variant="outline-light" onClick={handleSubmit}>
                <BsSearch />
              </Button>
            </InputGroup>
            {inputValue && (
              <p className="text-white mb-5">
                Result for : <span className="ps-1 fw-bold">{inputValue}</span>
              </p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Input;

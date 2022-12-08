import { Badge } from 'react-bootstrap';

const Meaning = ({ response }) => {
  return (
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
                  <li className="fw-light fst-italic">{def.example}</li>
                )}
              </ul>
            ))}
          </li>
        ))
      )}
    </ol>
  );
};

export default Meaning;

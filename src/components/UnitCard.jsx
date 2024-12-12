import Card from 'react-bootstrap/Card';

function UnitCard({ name, description, duration }) {
  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <div className="blockquote mb-0">
          {description ? <p>{description}</p> : <p>No description available</p>}
          <div className="blockquote-footer">{duration}</div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UnitCard;

import Card from 'react-bootstrap/Card';

function UnitCard({ name, description, duration }) {
  return (
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <div className="blockquote mb-0">
          {description ? <p>{description}</p> :''}
          <div className="blockquote-footer">{duration} day(s)</div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UnitCard;

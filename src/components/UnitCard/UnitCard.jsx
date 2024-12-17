import './unitCard.css';
function UnitCard({ unit }) {
  return (
    <div className='card-container'>
      <div className='card-header' title={unit.key}>
        <div className='heading-wrapper'>{unit.name.trim()}</div>
      </div>
      <div className='tags'>
        <span className='tag'>{unit.duration} day(s)</span>
      </div>
    </div>
  );
}

export default UnitCard;

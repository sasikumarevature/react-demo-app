import React from 'react';
import { Link } from 'react-router-dom';

const createCompetency = () => {
  return (
    <Link to='/competency'>
      <button>Back</button>
    </Link>
  );
};

export default createCompetency;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../../redux/slices/authSlice';

const Nav = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // Define the function to dispatch the token change
  const changeToken = () => {
    dispatch(setToken("new token")); // Dispatch the action to change the token
  };

  return (
    <div>
      <p>{token}</p>
      {/* Only call changeToken on button click */}
      <button onClick={changeToken}>Change Token</button>
    </div>
  );
};

export default Nav;

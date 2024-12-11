import { useEffect } from 'react';
import './App.css';
import Nav from './components/Navbar/navbar';
import { useDispatch } from 'react-redux';
import { setToken } from './redux/slices/authSlice';


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
   let token = "testToken= from initaial load";
   console.log(token)
    dispatch(setToken(token));
  }, [])

  return (
    <>
      <Nav/>
    </>
  );
}

export default App;

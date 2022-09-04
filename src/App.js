import './App.css';

import {Route, Routes} from "react-router-dom";
import NavBar from './componentes/navBar';
import Home from './Pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CheckOut from './Pages/checkOut';

function App() {
const dispatch = useDispatch()

useEffect(() => {

  return () => {
    dispatch({type:"load-from-localStorage"})
  }
}, [])

  return (
    <>
  <NavBar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="checkout" element={<CheckOut />} />

   
  </Routes>
  </>

  )
}

export default App;

import './App.css';

import { Route, Routes, useHistory, useLocation } from "react-router-dom";
import NavBar from './componentes/navBar';
import Home from './Pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CheckOut from './Pages/checkOut';
import Login from './Pages/login';
import Registrer from './Pages/registrer';
import Ordenes from './Pages/misOrders';
import { ProtectedRoute } from './componentes/protectedRouter';
import Contact from './Pages/contact';
import ForgotPassword from './Pages/forgotPassword';
import Loader from './componentes/loader';

function App() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)


  useEffect(() => {
    dispatch({ type: "load-user-localStorage" })
    dispatch({ type: "load-from-localStorage" })

  }, [])

  if (!user) {
    return <Loader />
  }



  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="checkout" element={<ProtectedRoute user={user.name}>
          <CheckOut />
        </ProtectedRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="registrer" element={<Registrer />} />

        <Route path="ordenes" element={<ProtectedRoute user={user.name}>
          <Ordenes />
        </ProtectedRoute>} />
        <Route path="contacto" element={<Contact />} />
        <Route path="forgot-password" element={<ProtectedRoute user={!user.name}>
          <ForgotPassword />
        </ProtectedRoute>} />

      </Routes>
    </>

  )
}

export default App;

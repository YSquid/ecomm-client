import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import Orders from './components/orders/Orders';
import OrderDetail from './components/orderDetail/OrderDetail';
import Header from './components/header/Header'
// import TestingNav from './components/testingNav/TestingNav';
import useToken from './useToken';

function App() {
  //token that is set by login component. Pass it to and the set token functions to all routes that need auth
  //if token is set, show route, if not route returns the login screen
  const {token, setToken} = useToken();

  

  return (
    <Router>
      <Header token={token} setToken={setToken}/>
    <Routes>
      <Route path='/' element={<Products token={token} />}></Route>
      <Route path='/login' element={token ? <Navigate replace to="/"/> : <Login token={token} setToken={setToken}/>}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/cart' element={<Cart token={token} setToken={setToken}/>}></Route>
      <Route path='/checkout' element={<Checkout />}></Route>
      <Route path='/orders' element={<Orders />}></Route>
      <Route path='/orderdetail' element={<OrderDetail />}></Route>
    </Routes>

    </Router>
  );
}

export default App;

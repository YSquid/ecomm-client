import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/header/Header';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Products from './components/products/Products';
import ProductDetail from './components/productDetail/ProductDetail';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import Orders from './components/orders/Orders';
import OrderDetail from './components/orderDetail/OrderDetail';
import Profile from './components/profile/Profile';
import TestingNav from './components/testingNav/TestingNav';

function App() {
  return (
    <Router>
      <TestingNav />
    <Routes>
      <Route path='/' element={<Products />}></Route>
      <Route path='/productdetail' element={<ProductDetail />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/checkout' element={<Checkout />}></Route>
      <Route path='/orders' element={<Orders />}></Route>
      <Route path='/orderdetail' element={<OrderDetail />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
    </Routes>

    </Router>
  );
}

export default App;

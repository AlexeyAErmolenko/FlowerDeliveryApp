import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import ShopsPage from "./pages/ShopsPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import { useSelector } from "react-redux";
import css from './App.module.css';

export default function App() {
  const cart = useSelector(s => s.cart);
  const linkCartClassName = cart.items.length > 0 ? 'css.linkCartFull': 'css.linkCartEmpty';
  return (
    <BrowserRouter>
      <div className={css.app}>
        <nav className={css.nav}>
          <h2>Flower Delivery Worldwide</h2>
          <Link to="/" className={`${css.link}`}>Shops</Link> |
          <Link to="/cart" className={`{linkCartClassName ${css.link}`}> Shopping Cart ({cart.items.length})</Link>
          <Link to="/order/" className={`${css.linkOrder} ${css.link}`}>Order</Link>
        </nav>
        <main className={css.main}>
          <Routes>
            <Route path="/" element={<ShopsPage/>} />
            <Route path="/cart" element={cart.items.length ? <CartPage/> : <Navigate to="/" />} />
            <Route path="/order/:orderId" element={<OrderPage/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

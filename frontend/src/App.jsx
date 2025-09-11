import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import ShopsPage from "./pages/ShopsPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import { useSelector } from "react-redux";

export default function App() {
  const cart = useSelector(s => s.cart);
  return (
    <BrowserRouter>
      <div style={{ display: "flex", height: "100vh" }}>
        <nav style={{ width: 220, padding: 12, borderRight: "1px solid #ddd" }}>
          <h3>Flower App</h3>
          <Link to="/">Shops</Link><br/>
          <Link to="/cart" style={{ pointerEvents: cart.items.length ? "auto" : "none", opacity: cart.items.length ? 1 : 0.5 }}>Cart ({cart.items.length})</Link><br/>
          <Link to="/order" style={{ display: "none" }}>Order</Link>
        </nav>

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ShopsPage/>} />
            <Route path="/cart" element={cart.items.length ? <CartPage/> : <Navigate to="/" />} />
            <Route path="/order/:id?" element={<OrderPage/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/slices/cartSlice";
import MapPicker from "../components/MapPicker";
import { createOrder } from "../store/slices/ordersSlice";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const cart = useSelector(s => s.cart);
  const shops = useSelector(s => s.shops.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);
  const [selectedShopId, setSelectedShopId] = useState(shops[0]?._id || null);
  const total = cart.items.reduce((s, it) => s + it.price * it.quantity, 0);

  const handleSubmit = async () => {
    const items = cart.items.map(i => ({ productId: i.productId, name: i.name, price: i.price, quantity: i.quantity }));
        const payload = {
      items, total, email, phone, deliveryAddress: address, deliveryLocation: location, shopId: selectedShopId
    };

    const res = await dispatch(createOrder(payload)).unwrap();
    dispatch(clearCart());
    navigate(`/order/${res.orderId}`);
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>Cart</h2>
      <div>
        {cart.items.map(it => (
          <div key={it.productId} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>{it.name}</div>
            <div>
              <input type="number" min="1" value={it.quantity} onChange={(e) => dispatch(updateQuantity({ productId: it.productId, quantity: Number(e.target.value) }))} style={{ width: 60 }}/>
              <button onClick={() => dispatch(removeFromCart(it.productId))}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Delivery</h3>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e => setEmail(e.target.value)} /><br/>
          <label>Phone</label><br/>
          <input value={phone} onChange={e => setPhone(e.target.value)} /><br/>
          <label>Address (or drag pin on map)</label><br/>
          <input value={address} onChange={e => setAddress(e.target.value)} /><br/>
        </div>

        <div style={{ marginTop: 8 }}>
          <MapPicker location={location} onChange={(loc) => { setLocation(loc); }} address={address} onAddressChange={setAddress} shops={shops} />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div>Total: 💲{total}</div>
        <button onClick={handleSubmit} disabled={!cart.items.length || !email || !address}>Submit Order</button>
      </div>
    </div>
  );
}

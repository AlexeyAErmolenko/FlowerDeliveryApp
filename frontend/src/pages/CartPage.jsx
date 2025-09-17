import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../store/slices/cartSlice";
import MapPicker from "../components/MapPicker";
import { createOrder } from "../store/slices/ordersSlice";
import { useNavigate } from "react-router-dom";
import css from './CardPage.module.css';

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
    console.log("🚀 ~ handleSubmit ~ res.orderId:", res.orderId)
    navigate(`/order/${res.orderId}`);
    
  };

  return (
    <div className={css.wrapCardPage}>
      <div className={css.title}>Cart</div>
      <div className={css.listProducts}>
        {cart.items.map(it => (
          <div key={it.productId} className={css.flexCardPage}>
            <div>{it.name}</div>
            <div>
              <input type="number" min="1" value={it.quantity} onChange={(e) => dispatch(updateQuantity({ productId: it.productId, quantity: Number(e.target.value) }))} className={`${css.inputCountCardPage} ${css.inputCardPage}`} />
              <button onClick={() => dispatch(removeFromCart(it.productId))}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className={css.totalCardPage}>
        <div>Total: &euro; {total}</div>        
      </div>

      <div className={css.deliveryCardPage} >
        <div className={css.titleDelivery}>Delivery</div>
        <div className={css.flex}>
          <div>
          <label>Email</label><br/>
          <input className={css.inputCardPage} value={email} onChange={e => setEmail(e.target.value)} /><br/>
          <label>Phone</label><br/>
          <input className={css.inputCardPage} value={phone} onChange={e => setPhone(e.target.value)} /><br/>
          <label>Address (or drag pin on map)</label><br/>
          <input className={css.inputCardPage} value={address} onChange={e => setAddress(e.target.value)} /><br />

          </div>
          <div className={css.mapCardPage}>
          <MapPicker location={location} onChange={(loc) => { setLocation(loc); }} address={address} onAddressChange={setAddress} shops={shops} />
          </div>
        </div>
        <div className={css.flex}>
          <button className={css.buttonSubmit} onClick={handleSubmit} disabled={!cart.items.length || !email || !address}>
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
}

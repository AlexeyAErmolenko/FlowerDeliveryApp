import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOrder } from "../store/slices/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import css from './OrderPage.module.css';

export default function OrderPage() {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const order = useSelector(s => s.orders.current);

  useEffect(() => {
    if (orderId) dispatch(fetchOrder(orderId));
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  // createdAtUTC stored in DB; convert to local string
  const created = new Date(order.createdAtUTC || order.createdAt || order.createdAtUTC);
  const localString = created.toLocaleString();
  
  return (
    <div className={css.wrapOrderPage}>
      <h2>Order details</h2>
      <div>Order ID: {order._id || order.orderId}</div>     
      <div>Date: {localString}</div>
      <div>Delivery address: {order.deliveryAddress}</div>
      <div>Shop: {order.shopId.name}</div>
      <h3>Items</h3>
      <ul>
        {order.items.map(it => <li key={it._id || it.productId}>{it.name} × {it.quantity} — 💲{it.price}</li>)}
      </ul>
      <div>Total: 💲{order.total}</div>
    </div>
  );
}

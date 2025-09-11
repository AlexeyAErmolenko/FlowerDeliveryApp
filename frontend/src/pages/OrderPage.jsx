import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOrder } from "../store/slices/ordersSlice";
import { useDispatch, useSelector } from "react-redux";

export default function OrderPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(s => s.orders.current);

  useEffect(() => {
    if (id) dispatch(fetchOrder(id));
  }, [id]);

  if (!order) return <div>Loading...</div>;

  // createdAtUTC stored in DB; convert to local string
  const created = new Date(order.createdAtUTC || order.createdAt || order.createdAtUTC);
  const localString = created.toLocaleString();

  return (
    <div style={{ padding: 12 }}>
      <h2>Order details</h2>
      <div>Order ID: {order._id || order.orderId}</div>
      <div>Date: {localString}</div>
      <div>Delivery address: {order.deliveryAddress}</div>
      <div>Shop: {order.shop?.name}</div>
      <h3>Items</h3>
      <ul>
        {order.items.map(it => <li key={it._id || it.productId}>{it.name} × {it.quantity} — 💲{it.price}</li>)}
      </ul>
      <div>Total: 💲{order.total}</div>
    </div>
  );
}

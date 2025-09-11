import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div style={{ border: "1px solid #ddd", padding: 10 }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: 150, objectFit: "cover" }} />
      <h4>{product.name}</h4>
      <div>💲{product.price}</div>
      <div>
        <button onClick={() => dispatch(addToCart({ productId: product._id, name: product.name, price: product.price, quantity: 1 }))}>Add to cart</button>
        <button style={{ marginLeft: 8 }}>{product.favorite ? "♥" : "♡"}</button>
      </div>
    </div>
  );
}

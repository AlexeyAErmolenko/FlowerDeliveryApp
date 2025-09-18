import React from "react";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import css from './ProductCard.module.css';

export default function ProductCard({ product }) {
  // console.log("🚀 ~ ProductCard ~ product:", product)
  
  const dispatch = useDispatch();

  const handleFavorite = () => {    
    dispatch(toggleFavorite(product._id));
  };

  return (
    <div className={css.wrapProductList}>
      <img className={css.photoProduct} src={product.photoURL} alt={product.name} />
      <h4 className={css.title}>{product.name}</h4>
      <h5 className={css.description}>{product.description}</h5>
      <div  className={css.price}>&#8364; {product.price}</div>
      <div className={css.buttons}>
        <button className={`${css.button} ${css.buttonAdd}`} onClick={() => dispatch(addToCart({ productId: product._id, name: product.name, price: product.price, quantity: 1 }))}>
          Add to cart
        </button>
        <button className={css.button} onClick={handleFavorite}>{product.isFavorite ? "♥" : "♡"}</button>
      </div>
    </div>
  );
}

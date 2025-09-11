import css from './SKUList.module.css';

import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "../../redux/cart/slice";

export default function SKUList() {
  const dispatch = useDispatch();
  const { selectedShop, products } = useSelector((state) => state.shop);

  return (
    <div className={css.container}>
      <ul className={css.list}>
          {products[selectedShop]?.map((product) => (
            <li key={product.id} className={css.item}>
              <div className={css.photo}>🌸</div>
              <p>{product.name}</p>
              <button onClick={() => dispatch(addToCart(product))} >
                Add to Cart
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
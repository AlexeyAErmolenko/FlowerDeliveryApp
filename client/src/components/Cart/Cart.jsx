import css from './Cart.module.css'
import { useDispatch, useSelector } from 'react-redux';

export default function Cart() { 
  const items = useSelector((state) => state.cart.items);

  return (
    <div className={css.container}>
      <h3>Shopping Cart</h3>
      {items.length === 0 && <p>Cart is empty</p>}
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
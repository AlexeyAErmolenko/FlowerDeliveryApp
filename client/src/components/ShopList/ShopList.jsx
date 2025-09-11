import css from "./ShopList.module.css";

import { useDispatch, useSelector } from "react-redux";
import { selectShop } from "../../redux/shop/slice";

export default function ShopList() {
  
  const selectedShop = useSelector((state) => state.shop.selectedShop);
  const shops = useSelector((state) => state.shop.shops);
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <h3>Shops:</h3>
      <ul className={css.list}>
        {shops.map((shop) => (
          <button
            key={shop}
            onClick={() => dispatch(selectShop(shop))}
            className={`${selectedShop === shop ? "background-color: '#d1d5db'" : ""}`}            
          >
            {shop}
          </button>
        ))}
      </ul>
    </div>
  );
}

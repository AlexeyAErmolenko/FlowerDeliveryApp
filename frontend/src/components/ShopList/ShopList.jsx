import css from "./ShopList.module.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShop } from "../../shopSlice";

import { fetchProducts } from "../../shopSlice";
import { fetchShops } from "../../shopSlice";

  

export default function ShopList() {

  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops.items);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchShops());
  }, [dispatch]);
  
  const selectedShop = useSelector((state) => state.shop.selectedShop);


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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShops } from "../store/slices/shopsSlice";
import { fetchProducts, setPage, setSort } from "../store/slices/productsSlice";
import ShopList from "../components/ShopList";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import css from './ShopPage.module.css';

export default function ShopsPage() {
  const dispatch = useDispatch();
  const shops = useSelector(s => s.shops.items);
  const productsState = useSelector(s => s.products);
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => { dispatch(fetchShops()); }, [dispatch]);

  useEffect(() => {
    if (shops.length) {
      setSelectedShop(shops[0]._id);
      dispatch(fetchProducts({ shopId: shops[0]._id, page: productsState.page, limit: productsState.limit, sort: productsState.sort, order: productsState.order }));
    }
  }, [shops]);

  useEffect(() => {
    if (selectedShop) {
      dispatch(fetchProducts({ shopId: selectedShop, page: productsState.page, limit: productsState.limit, sort: productsState.sort, order: productsState.order }));
    }
  }, [selectedShop, productsState.page, productsState.sort, productsState.order]);

  const handleSort = (sort, order) => {
    dispatch(setSort({ sort, order }));
    dispatch(setPage(1));
  };

  return (
    <div className={css.wrap}>
      <div className={css.shopList}>
        <ShopList shops={shops} selected={selectedShop} onSelect={id => setSelectedShop(id)} />
      </div>
      <div className={css.productList}>
        <div className={css.sortedList}>          
          <div>
            <button onClick={() => handleSort("price", "asc")}>Price ↑</button>
            <button onClick={() => handleSort("price", "desc")}>Price ↓</button>
            <button onClick={() => handleSort("date", "desc")}>Newest</button>
          </div>
          {/* <div>Favorites first shown automatically</div> */}
        </div>
{/* Products */}
        <div className={css.gridProductList}>
          {productsState.items.map(p => (<ProductCard key={p._id} product={p} />))}
        </div>

        <Pagination total={productsState.total} page={productsState.page} limit={productsState.limit} onPage={(pg) => dispatch(setPage(pg))}/>
      </div>
    </div>
  );
}

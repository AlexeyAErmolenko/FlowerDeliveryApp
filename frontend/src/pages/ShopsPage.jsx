import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShops } from "../store/slices/shopsSlice";
import { fetchProducts, setPage, setSort } from "../store/slices/productsSlice";
import ShopList from "../components/ShopList";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

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
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ width: "25%", borderRight: "1px solid #ddd" }}>
        <ShopList shops={shops} selected={selectedShop} onSelect={id => setSelectedShop(id)} />
      </div>
      <div style={{ flex: 1, padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <button onClick={() => handleSort("price", "asc")}>Price ↑</button>
            <button onClick={() => handleSort("price", "desc")}>Price ↓</button>
            <button onClick={() => handleSort("date", "desc")}>Newest</button>
          </div>
          <div>Favorites first shown automatically</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
          {productsState.items.map(p => (<ProductCard key={p._id} product={p} />))}
        </div>

        <Pagination total={productsState.total} page={productsState.page} limit={productsState.limit} onPage={(pg) => dispatch(setPage(pg))}/>
      </div>
    </div>
  );
}

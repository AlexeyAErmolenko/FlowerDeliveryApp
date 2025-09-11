import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { fetchShops, fetchProducts, selectShop } from "./shopSlice";
import { addToCart } from "./cartSlice";

function ShopList() {
  const dispatch = useDispatch();
  const { shops, selectedShop } = useSelector((s) => s.shop);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  return (
    <div className="p-4 border-r w-48">
      <h3>Shops:</h3>
      {shops.map((shop) => (
        <button
          key={shop._id}
          onClick={() => {
            dispatch(selectShop(shop._id));
            dispatch(fetchProducts(shop._id));
          }}
          className={`block w-full my-1 p-2 border rounded ${
            selectedShop === shop._id ? "bg-gray-300" : ""
          }`}
        >
          {shop.name}
        </button>
      ))}
    </div>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const { products } = useSelector((s) => s.shop);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {products.map((p) => (
        <div key={p.id} className="border rounded p-4">
          <p>{p.name}</p>
          <p>💲{p.price}</p>
          <button
            className="mt-2 p-2 border rounded bg-blue-100"
            onClick={() => dispatch(addToCart(p))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const { items } = useSelector((s) => s.cart);
  return (
    <div className="p-4 border-t">
      <h3>Shopping Cart</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.name} – 💲{item.price}</li>
        ))}
      </ul>
    </div>
  );
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <div className="flex h-screen">
        <ShopList />
        <div className="flex-1 flex flex-col">
          <ProductList />
          <Cart />
        </div>
      </div>
    </Provider>
  );
}

export default AppWrapper;

import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout.jsx';
import Loader from "../../components/Loader/Loader";
import { refreshUser } from '../../redux/auth/operations';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import css from './App.module.css';

const ShopPage = lazy(() => import('../../pages/ShopPage/ShopPage'));
const CartPage = lazy(() => import('../../pages/CartPage/CartPage'));
const OrderPage = lazy(() => import('../../pages/OrderPage/OrderPage'));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
      <div className={css.app}>
        <Layout>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order" element={<OrderPage />} />
            </Routes>
          </Suspense>
        </Layout>
    </div>
  );
}
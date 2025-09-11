import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout.jsx';

import css from './App.module.css';

const ShopPage = lazy(() => import('../../pages/ShopPage/ShopPage'));
const CartPage = lazy(() => import('../../pages/CartPage/CartPage'));
const OrderPage = lazy(() => import('../../pages/OrderPage/OrderPage'));

export default function App() {
  return (
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
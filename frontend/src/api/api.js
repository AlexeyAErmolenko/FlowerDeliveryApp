export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchShops() {
  const res = await fetch(`${API_BASE}/api/shops`);
  return res.json();
}

export async function fetchProducts({
  shopId,
  page = 1,
  limit = 6,
  sort = 'date',
  order = 'desc',
}) {
  const url = new URL(`${API_BASE}/api/products`);
  url.searchParams.set('shopId', shopId);
  url.searchParams.set('page', page);
  url.searchParams.set('limit', limit);
  url.searchParams.set('sort', sort);
  url.searchParams.set('order', order);
  const res = await fetch(url.toString());
  return res.json();
}

export async function createOrder(payload) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function getOrder(id) {
  const res = await fetch(`${API_BASE}/api/orders/${id}`);
  return res.json();
}

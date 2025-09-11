export const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem('flower_cart_v1') || '{}');
  } catch {
    return { items: [] };
  }
};
export const saveCart = (cart) =>
  localStorage.setItem('flower_cart_v1', JSON.stringify(cart));

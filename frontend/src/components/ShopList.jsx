import css from './ShopList.module.css';

export default function ShopList({ shops, selected, onSelect }) {
  return (
    <div className={css.wrapShopList}>
      <div className={css.title}>Shops</div>
      {shops.map(s => (
        <div key={s._id}>
          <button
            className={selected === s._id ? css.buttonSelected : css.button}
            onClick={() => onSelect(s._id)}
          >
            {s.name}
          </button>
        </div>
      ))}
    </div>
  );
}

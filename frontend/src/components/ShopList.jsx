import React from "react";
export default function ShopList({ shops, selected, onSelect }) {
  return (
    <div style={{ padding: 12 }}>
      <h4>Shops</h4>
      {shops.map(s => (
        <div key={s._id}>
          <button style={{ display: "block", width: "100%", padding: 8, background: selected === s._id ? "#eee" : "transparent" }} onClick={() => onSelect(s._id)}>
            {s.name}
          </button>
        </div>
      ))}
    </div>
  );
}

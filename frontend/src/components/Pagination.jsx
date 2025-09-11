import React from "react";
export default function Pagination({ total, page, limit, onPage }) {
  const pages = Math.ceil(total / limit);
  if (pages <= 1) return null;
  return (
    <div style={{ marginTop: 12 }}>
      {Array.from({ length: pages }).map((_, i) => {
        const p = i + 1;
        return <button key={p} onClick={() => onPage(p)} style={{ marginRight: 6, fontWeight: p === page ? "bold" : "normal" }}>{p}</button>;
      })}
    </div>
  );
}

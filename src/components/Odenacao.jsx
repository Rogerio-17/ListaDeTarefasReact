import React from "react";

export default function ordenacao({ setSort, v, setBtn }) {
  return (
    <div className="ordenacao">
      <button onClick={() => setSort("Asc")}>Ordem Asc</button>
      <button onClick={() => setSort("Desc")}>Ordem Desc</button>
    </div>
  );
}

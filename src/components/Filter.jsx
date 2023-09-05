import React from "react";

export default function filter({ filter, setFilter }) {
  return (
    <div className="filter">
      <select
        name=""
        id=""
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">Filtrar</option>
        <option value="All">Todas</option>
        <option value="Completed">Completas</option>
        <option value="Incomplete">Incompletas</option>
      </select>
    </div>
  );
}

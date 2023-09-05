import React from "react";
import Filter from "./Filter";

export default function search({search, setSearch, filter, setFilter}){
    return(
        <div className="search">
            <input type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Digite para pesquisar uma tarefa"
            />
            <Filter filter={filter} setFilter={setFilter}></Filter>
        </div>
    )
}
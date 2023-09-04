import React from "react";

export default function filter(){
    return (
        <div className="filter">
            <select name="" id="">
                <option value="">Filtrar</option>
                <option value="All">Todas</option>
                <option value="Completed">Completas</option>
                <option value="Incomplete">Incompletas</option>
            </select>
        </div>
    )
}
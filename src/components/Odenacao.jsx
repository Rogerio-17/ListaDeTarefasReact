import React from "react";

export default function ordenacao({ clique, value, setSort, campo }) {
  return (
    <div className="ordenacao">
      
      <button
        className={value === "botao1" ? "selected" : ""}
        onClick={() => { setSort("Asc"), clique("botao1");}}
      >
        Mais recentes
      </button>
      <button
        className={value === "botao2" ? "selected" : ""}
        onClick={() => { setSort("Desc"), clique("botao2");}}
      >
        Mais antigos
      </button>
      {
        campo ? (
          <div>
            <p>Nenhuma tarefa localizada</p>
          </div>
        ) : (
          <div></div>
        )
      }
    </div>
  );
}

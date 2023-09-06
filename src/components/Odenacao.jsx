import React from "react";

export default function ordenacao({ clique, value, ordenarPorDataRecentes, ordenarPorDataAntigos }) {
  return (
    <div className="ordenacao">
      <button
        className={value === "botao1" ? "selected" : ""}
        onClick={() => {
          ordenarPorDataRecentes(), clique("botao1");
        }}
      >
        Mais recentes
      </button>
      <button
        className={value === "botao2" ? "selected" : ""}
        onClick={() => {
          ordenarPorDataAntigos(), clique("botao2");
        }}
      >
        Mais antigos
      </button>
    </div>
  );
}

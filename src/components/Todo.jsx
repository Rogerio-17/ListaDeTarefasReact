import React from "react";


export default function TodoListe({ todo, remove, complete }) {
  
  return (
    <div>
      {/*----- Pega os objetos dentro da useState e percorre com map ------*/}
      <div className="todo" >
        <div className="content">
          <p style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
            {todo.text}
          </p>
          <p className="date">Data da abertura {todo.date}</p>
          <p className={todo.category} id="category">
            {todo.category}
          </p>
        </div>

        <div className="buttons">
          <button className="completar" onClick={() => complete(todo.id)}>
            Completar
          </button>
          <button className="fechar" onClick={() => remove(todo.id)}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

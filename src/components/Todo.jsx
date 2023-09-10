import React, { useState } from "react";
import check from "../img/check.png";
import remover from "../img/remover.png";
import editar from "../img/editar.png";

export default function TodoListe({ todo, remove, complete, edite }) {
  const [valor, setValor] = useState("")
  const [editeOuNao, setEditeOuNao] = useState(true)


  const pegaValor = () => {
    setValor(todo.text)
    setEditeOuNao(false)
  }
  console.log(todo.id == "")
  return (
    <div>
      {/*----- Pega os objetos dentro da useState e percorre com map ------*/}

        {
          !todo ? (
            <div className="todo">
              <p>Nenhuma tarefa encontrada</p>
            </div>
          ): (
            <div className="todo">
            <div className="content">
            <textarea style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}  className="textAreaTarefas" readOnly={editeOuNao}
            onChange={(e) => {setValor(e.target.value)}}>{todo.text}</textarea>
            {
              !editeOuNao ? (
                <div className="confirmEdite">
                  <button onClick={() => {edite(todo.id, valor), setEditeOuNao(true)}}>Confirma edição</button>
                </div>
              ) : (
                <div>
  
                </div>
              )
            }
            <p className="date">Data de abertura {todo.date}</p>
            <p className={todo.category} id="category">
              {todo.category}
            </p>
          </div>
          <div className="buttons">
            <button className="editar" onClick={() => pegaValor()}>
              <img src={editar} alt="Editar" />
            </button>
            <button className="completar" onClick={() => complete(todo.id)}>
              <img src={check} alt="Completar" />
            </button>
            <button className="remover" onClick={() => remove(todo.id)}>
              <img src={remover} alt="Remover" />
            </button>
          </div>
          </div>
          )
        }
        </div>
  );
}

import React from "react";
import { useState } from "react";

export default function FormTodo({addTodo}) {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  // Adiciona nova categoria
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!value || !category) {
      return(alert("Para criar a tarefa, preencha todos os campos"))
    }
    
    addTodo(value, category)
    setValue("")
    setCategory("")

  };

  return (
    <div>
      <h1>Criar nova tarefa</h1>

      <form action="" className="formNewTask" onSubmit={handleSubmit}>
        <textarea
          name="Adiçaõ de tarefa"
          id="task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>

        <div className="teste">
          <select
            name="Seleção de uma categoria"
            id="selectCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecione a categoria</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Estudos">Estudos</option>
          </select>
          <button type="submit">Criar tarefa</button>
        </div>
      </form>
    </div>
  );
}

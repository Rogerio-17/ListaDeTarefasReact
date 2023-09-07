import React from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 



export default function FormTodo({addTodo}) {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");

  // Adiciona nova categoria
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!value || !category) {
      return(toast.error("Por favor! Preencha todos os campos."))
    }
    
    toast.success("Tarefa criada com sucesso")
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

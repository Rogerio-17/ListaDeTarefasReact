import { useState } from "react";
import "./App.css";
import FormTodo from "./components/FormTodo";
import TodoListe from "./components/todo";
import Search from "./components/Search";
import Ordenacao from "./components/Odenacao";

function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("Asc");
  const [btn, setBtn] = useState("")

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
      date: "12/08/2023",
    },
    {
      id: 2,
      text: "Ir pra academia",
      category: "Pessoal",
      isCompleted: false,
      date: "19/08/2023",
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
      date: "30/08/2023",
    },
  ]);

  // Adiciona uma nova tarefa
  const addTodo = (text, category) => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const newTodo = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        text,
        category,
        isCompleted: false,
        date: `${dia < 10 ? "0" + dia : dia}/${
          mes < 10 ? "0" + mes : mes
        }/${ano}`,
      },
    ];

    setTodos(newTodo);
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
  };

  // Remove um tarefa
  const removeTodo = (id) => {
    const newTodos = [...todos];
    //Filtra todos os objetos de um array e pega apenas o passado por parametro
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodos(filteredTodos);
  };

  return (
    // Div principal
    <div className="app">
      <FormTodo addTodo={addTodo}></FormTodo>
      <h1>Lista de tarefas</h1>
      <Search
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      ></Search>
      <Ordenacao setSort={setSort} ></Ordenacao>
      {/*----- Div secundaria ------*/}
      <div className="todo-list">
        {todos
          .filter((todo) =>
            filter === "All" || filter === ""
              ? true
              : filter === "Completed"
              ? todo.isCompleted
              : !todo.isCompleted
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text)
          )
          .map((todo) => (
            <TodoListe
              key={todo.id}
              todo={todo}
              complete={completeTodo}
              remove={removeTodo}
            ></TodoListe>
          ))}
      </div>
    </div>
  );
}

export default App;

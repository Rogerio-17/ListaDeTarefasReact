import { useState } from "react";
import "./App.css";
import FormTodo from "./components/FormTodo";
import TodoListe from "./components/todo";
import Search from "./components/Search";
import Ordenacao from "./components/Odenacao";
import  { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

//
function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [botaoSelecionado, setBotaoSelecionado] = useState(null);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
      date: "2021-08-30",
    },
    {
      id: 2,
      text: "Ir pra academia",
      category: "Pessoal",
      isCompleted: false,
      date: "2023-09-02",
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
      date: "2022-01-09",
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
        date: `${ano}-${mes < 10 ? "0" + mes : mes}-${
          dia < 10 ? "0" + dia : dia
        }`,
      },
    ];

    setTodos(newTodo);
  };

  // Completar tarefa
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
  
  // Seleciona botão para adicionar classe de seleção
  const handleButtonClick = (botaoId) => {
    setBotaoSelecionado(botaoId);
  };

  // Ordena por mais recentes
  const ordenarPorDataRecentes = () => {
    const dadosOrdenados = [...todos].sort((a, b) => {
      const dataA = new Date(a.date);
      const dataB = new Date(b.date);
      return dataB - dataA; // Classifica em ordem decrescente
    });
    setTodos(dadosOrdenados);
  };

  // Ordena por mais antigos
  const ordenarPorDataAntigos = () => {
    const dadosOrdenados = [...todos].sort((a, b) => {
      const dataA = new Date(a.date);
      const dataB = new Date(b.date);
      return dataA - dataB; // Classifica em ordem decrescente
    });
    setTodos(dadosOrdenados);
  };

  // Retorno
  return (
    // Div principal
    <div className="app">
      {/*Componente de formulario para criação de nova tarefa*/}
      <FormTodo addTodo={addTodo}></FormTodo>
      <h1>Lista de tarefas</h1>
      {/*Componente de buscar para filtro de tarefas*/}
      <Search
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      ></Search>
      {/*Componente de ordenar tarefa*/}
      <Ordenacao
        ordenarPorDataRecentes={ordenarPorDataRecentes}
        ordenarPorDataAntigos={ordenarPorDataAntigos}
        clique={handleButtonClick}
        value={botaoSelecionado}
      ></Ordenacao>
      {/*----- Div secundaria ------*/}
      <div className="todo-list">
        {todos
          .filter((todo) =>
          //Verifica de filter é igual a All se for vai retornar tudo, 
          //se não for vai verificar se o filter é igual a iscompleted, se for
          //igual vai retornar tudo que foi completo, se não retorna todas incompletas
            filter === "All" || filter === ""
              ? true
              : filter === "Completed"
              ? todo.isCompleted
              : !todo.isCompleted
          )
          //Deixa todo texto em minusculo e verifica se o que foi digitado dentro
          //do campo é igual ao texto da tarefa
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          //Percorreo o array todos e retorna o valor para ser montado o componente
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

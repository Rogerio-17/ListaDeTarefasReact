import { useEffect, useState } from "react";
import "./App.css";
import FormTodo from "./components/FormTodo";
import TodoListe from "./components/Todo";
import Search from "./components/Search";
import Ordenacao from "./components/Odenacao";
import  { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { db } from "./firebaseConnection";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";


//
function App() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("")
  const [editando, setEditando] = useState(false)
  const [botaoSelecionado, setBotaoSelecionado] = useState(null);
  const [atualizarDados, setAtualizarDados] = useState(false);
  const [todos, setTodos] = useState([]);
  const taskCollectionRef = collection(db, "task")

  useEffect(() => {
    const getTask = async () => {
      try {
        const data = await getDocs(taskCollectionRef);
        const dadoFirebase = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTodos(dadoFirebase);
      } catch (error) {
        toast.error("Erro ao carregar dados! Recarregue a página")
      }
    };
  
    getTask();
  }, [atualizarDados])

  // Adiciona uma nova tarefa
  const addTodo = async (text, category) => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const newTodo = 
      {
        id: Math.floor(Math.random() * 1000000),
        text,
        category,
        isCompleted: false,
        date: `${ano}-${mes < 10 ? "0" + mes : mes}-${
          dia < 10 ? "0" + dia : dia
        }`,
      }
    setAtualizarDados(!atualizarDados)
    const task = await addDoc(taskCollectionRef, newTodo)
    task()
  };

  // Editar tarefa
  const editar = (id, texto) => {
    const newTodos = [...todos];
    newTodos.map((todo) => {
     const docRef = doc(taskCollectionRef, todo.id)
     const textUp = {
      text: texto
     }

      if(todo.id === id){
        updateDoc(docRef, textUp).then(() => toast.success("Tarefa editada com sucesso!")).catch(() => toast.error("Erro ao editar tarefa!"))
        setAtualizarDados(!atualizarDados)
        
      } 
    }
    );
  }

  // Completar tarefa
  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.map((todo) => {
     const docRef = doc(taskCollectionRef, todo.id)
     const isCompleted = {
      isCompleted: true
     }

      if(todo.id === id){
        updateDoc(docRef, isCompleted)
        setAtualizarDados(!atualizarDados)
      } 

    }
    );

  };

  // Remove um tarefa
  const removeTodo = async (id) => {
    const taskDoc = doc(db, 'task', id)
    await deleteDoc(taskDoc)

    toast.success("Tarefa deletada com sucesso!")
    setAtualizarDados(!atualizarDados)
  };
  
  // Seleciona botão para adicionar classe de seleção
  const handleButtonClick = (botaoId) => {
    setBotaoSelecionado(botaoId);
  };

  // Retorno
  return (
    // Div principal
    <div className="app">
      <ToastContainer></ToastContainer>
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
        clique={handleButtonClick}
        value={botaoSelecionado}
        setSort={setSort}
        
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
          .sort((a, b) => sort === "Asc" ?  b.date.localeCompare(a.date) :  a.date.localeCompare(b.date))
          //Percorreo o array todos e retorna o valor para ser montado o componente
          .map((todo) => (
            <TodoListe
              key={todo.id}
              todo={todo}
              editando={editando}
              edite={editar}
              complete={completeTodo}
              remove={removeTodo}
            ></TodoListe>
          ))
          }

          
      </div>
    </div>
  );
}

export default App;

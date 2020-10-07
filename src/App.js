import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import TodoItem from "./TodoItem";

const TodoItemsFromOutSide = [];

const App = () => {
  const [todos, setTodos] = useState(TodoItemsFromOutSide);
  const [newTodo, setNewTodo] = useState("");

  // useEffect(()=> {
  //   const newTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  //   setTodos(newTodos)
  // }, []); // render once

  // useEffect(()=> {
  //   localStorage.getItem("todos") || "[]");
  //   setTodos(newTodos)
  // }, []); // render once

  // useEffect(()=> {
  //   localStorage.getItem("todos") || "[]");
  //   setTodos(newTodos)
  // }, []); // render once
  
  const handleSubmit = (e) => {
    
    e.preventDefault(); // stops page refreshing on submit
    const newTodos = [
      ...todos,
      { id: newTodo.replace(" ", "-"), labelName: newTodo, completed: false },
    ];
    setTodos(newTodos);
    setNewTodo("");  // rest input to empty string
    // localStorage.setItem("todos", JSON.stringify(newTodos))
  };
  // click checkbox to  change state from original state to oppisite
  const updateTodo = (id) => {
    console.log("this is todos before updating", todos);
    // map through each item in current to do list
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        console.log("Yay, found the todo");
        return { ...item, completed: !item.completed };
      }
      return item;

    });
    console.log("This is the todos after updating", newTodos);
    setTodos(newTodos);
  };
  const handleTodoChange

  //renders in the dom
  return (
    // JSX
    <div className="todoapp">
      <header className="header">
        <h1>My Todo List</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="new-todo"
            placeholder="What do you need to do today?"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }}
          />
        </form>
      </header>
      <section className="main">
        <ul className="todo-list">
          {todos.map((item) => {
            return (
              <TodoItem
                key={item.id} // identifier for react to know this item only is updated instead of going through the whole list
                id={item.id}
                labelName={item.labelName}
                completed={item.completed}
                updateTodo={updateTodo}
                handleChange={updateTodo}
                // handleDelete={deleteTodo}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

/*

    Wed 7 Oct
    ---------
    save data so when refresh page it doesnt
    - - -
    use browser storage - local storage
    window.localStorage localStorage
    Google how local storage works .. Mozilla Firefox
    localStorage.setItem
    localStorage.getItem
    using localStorage and JSON
    filter 

    new hook useEffect
      - - -
      useEffect(()=> {

      })

    install react hook
    - - -


*/
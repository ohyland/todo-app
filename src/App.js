import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";
import TodoItem from "./TodoItem";

const myTodos = localStorage.getItem("todos") || [];
const App = () => {
  const [todos, setTodos] = useState(JSON.parse(myTodos));
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodos = [
      ...todos,
      { id: newTodo.replace(" ", "-"), labelName: newTodo, completed: false },
    ];
    setTodos(newTodos);
    setNewTodo("");
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const updateTodo = (id) => {
    const newTodos = todos.map((item) => {
      if (item.id == id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setTodos(newTodos);

    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
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
                key={item.id}
                id={item.id}
                labelName={item.labelName}
                completed={item.completed}
                handleChange={updateTodo}
                handleDelete={deleteTodo}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
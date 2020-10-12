import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";

// import components
import Header from "./Header";
import ToggleAll from "./ToggleAll";
import TodoList from "./TodoList";
import Footer from "./Footer";

export const ALL = "all";
export const ACTIVE = "active";
export const COMPLETED = "completed";

// APP
const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [nowShowingTodos, setNowShowingTodos] = useState([]);
  const [todoFilter, setTodoFilter] = useState(ALL);

  useEffect(() => {
    const newTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(newTodos);
    let newTodoFromStorage = localStorage.getItem("new-todo");
    if (newTodoFromStorage) {
      newTodoFromStorage = JSON.parse(newTodoFromStorage);
    } else {
      newTodoFromStorage = "";
    }

    setNewTodo(newTodoFromStorage);
  }, []);

  useEffect(() => {
    let newNowShowingTodos;

    if (todoFilter === ACTIVE) {
      newNowShowingTodos = todos.filter((todo) => !todo.completed);
    } else if (todoFilter === COMPLETED) {
      newNowShowingTodos = todos.filter((todo) => todo.completed);
    } else {
      newNowShowingTodos = todos;
    }

    setNowShowingTodos(newNowShowingTodos);
  }, [todos, todoFilter]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("new-todo", JSON.stringify(newTodo));
  }, [newTodo]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh on submit
    const newTodos = [
      // id - replace spaces in the text with "-" from the labelName
      // completed - controlles whether the item is checked
      ...todos,
      { id: newTodo.replace(" ", "-"), labelName: newTodo, completed: false },
    ];
    setTodos(newTodos);
    setNewTodo(""); // reset
  };


  // change val
  // when checkbox is cliked the id of the item is passed in
  const updateTodo = (id) => {
    // map - returns a new array: map through each item and find the item in the current todo list and change the value
    const newTodos = todos.map((item) => {
      if (item.id == id) {
        //change completed to oppisite value. true or false
        // ...item - object spread. key value pair from each item
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(newTodos); // put todo in the todo list
    // reset todos
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // check all on/off
  const toggleAll = (checked) => {
    //array to map through all todos
    // checked == true || false
    const newTodos = todos.map((todo) => {
      return { ...todo, completed: checked };
    });

    setTodos(newTodos);
  };

  const updateActiveFilter = (newFilter) => {
    setTodoFilter(newFilter);
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // rendered in the DOM
  return (
    <div className="todoapp">
      <Header
        handleSubmit={handleSubmit}
        newTodo={newTodo}
        handleChange={setNewTodo}
      />
      <section className="main">
        <ToggleAll toggleAll={toggleAll} todos={todos} />
        <TodoList
          todos={nowShowingTodos}
          handleChange={updateTodo}
          handleDelete={deleteTodo}
        />
      </section>
      <Footer
        todos={todos}
        todoFilter={todoFilter}
        handleClick={updateActiveFilter}
        handleClear={clearCompleted}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
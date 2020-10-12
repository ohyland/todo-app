import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";

// import components
import Header from "./Header";
import ToggleAll from "./ToggleAll";
import TodoList from "./TodoList";

const ALL = 'all'
const ACTIVE = 'active'
const COMPLETED = 'completed'

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
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter((todo) => !todo.completed).length}</strong>
          {todos.filter((todo) => !todo.completed).length > 1
            ? " items "
            : " item "}
          left
        </span>
        <ul className="filters">
          <li>
            <a
              className={todoFilter === ALL ? "selected" : ""}
              onClick={() => {
                setTodoFilter(ALL);
              }}
              href="#/"
            >
              All
            </a>
          </li>
          <li>
            <a
              className={todoFilter === ACTIVE ? "selected" : ""}
              onClick={() => {
                setTodoFilter(ACTIVE);
              }}
              href="#/active"
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={todoFilter === COMPLETED ? "selected" : ""}
              onClick={() => {
                setTodoFilter(COMPLETED);
              }}
              href="#/completed"
            >
              Completed
            </a>
          </li>
        </ul>
        <button className="clear-completed"
          onClick={() => {
            setTodos(todos.filter((todo) => !todo.completed));
          }}
        >Clear Completed
        </button>
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
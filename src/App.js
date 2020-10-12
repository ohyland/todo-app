import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// import components
import "./style.css";
import TodoItem from "./TodoItem";

// APP
const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

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
        <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={(e) => {
              toggleAll(e.target.checked);
            }}
            checked={!todos.some((todo) => !todo.completed)}
          />
          <label htmlFor="toggle-all" />
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

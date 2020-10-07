import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";
import TodoItem from "./TodoItem";

const myTodos = localStorage.getItem("todos") || "[]";

// APP
const App = () => {
  const [todos, setTodos] = useState(JSON.parse(myTodos));
  // [newTodo, setNewTodo] passed into the componant
  const [newTodo, setNewTodo] = useState(""); // useState - react hook to set state for componant

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh on submit
    const newTodos = [
      ...todos,
      // id - replace spaces in the text with "-" from the labelName
      // completed - controlles whether the item is checked
      { id: newTodo.replace(" ", "-"), labelName: newTodo, completed: false },
    ];
    setTodos(newTodos);
    setNewTodo(""); // reset to ""
    localStorage.setItem("todos", JSON.stringify(newTodos));
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
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // click X and delete the item
  const deleteTodo = (id) => {
    // filter - filters out anything that doesn't match the criteria
    // eg:  > const myNumbers = [1, 2 , 3, 4, 5]
    //      myNumbers.filter(num => num !== 2)
    //      > [1, 2 , 3, 4, 5]
    //      
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // rendered in the DOM
  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        {/* form to handle form submission */}
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* new todo input */}
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
                key={item.id} // update what has changed
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

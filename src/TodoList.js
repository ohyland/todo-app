import React from "react";

import PropTypes from "prop-types";

import TodoItem from "./TodoItem";

const TodoList = ({ todos, handleChange, handleDelete }) => {
  return (
    <ul className="todo-list">
      {todos.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            labelName={item.labelName}
            completed={item.completed}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      labelName: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoList;
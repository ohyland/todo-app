import React from "react";

import PropTypes from "prop-types";

import { ALL, ACTIVE, COMPLETED } from "./App";

const Footer = ({ todos, todoFilter, handleClick, handleClear }) => {
  return (
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
              handleClick(ALL);
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
              handleClick(ACTIVE);
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
              handleClick(COMPLETED);
            }}
            href="#/completed"
          >
            Completed
          </a>
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClear}>
        Clear Completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      labelName: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  todoFilter: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};

export default Footer;

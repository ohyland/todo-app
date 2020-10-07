import React from "react";

import PropTypes from "prop-types";

const TodoItem = ({ id, labelName, completed, handleChange }) => {
  return (
    <li className={completed ? "completed" : ""}>
      <div className="view">
        <input
          type="checkbox"
          id={id}
          className="toggle"
          checked={completed}
          onChange={() => handleChange(id)}
        />
        <label htmlFor={id}>{labelName}</label>
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TodoItem;

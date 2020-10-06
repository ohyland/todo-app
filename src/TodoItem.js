import React from "react";

import PropTypes from "prop-types";

export const myClassName = "todo-item";

const TodoItem = ({ id, labelName }) => {
  return (
    <div className={myClassName}>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{labelName}</label>
    </div>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string,
  labelName: PropTypes.string,
};

export default TodoItem;

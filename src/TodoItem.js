import React from "react";

import PropTypes from "prop-types";

export const myClassName = "todo-item";

const TodoItem = ({ id, labelName, completed, handleChange }) => {
  // const props = {id: "learn", labelName: "Learn"}
  // props = properties of the component
  //handleChange should handle my input chnages

  return (
    <li>
      <div className={"view"}>
        <input
          type="checkbox"
          id={id}
          className={"toggle"}
          checked={completed}
          onChange={(e) => handleChange(id)}
        />
        <label htmlFor={id}>{labelName}</label>
        {/* <button className="destroy" onClick={handleDelete}> */}
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  handleUpdates: PropTypes.func.isRequired,
};

export default TodoItem;

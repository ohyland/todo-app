import React from "react";

import PropTypes from "prop-types";

const ToggleAll = ({ toggleAll, todos }) => {
  return (
    <>
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
    </>
  );
};

ToggleAll.propTypes = {
  toggleAll: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      labelName: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
};
export default ToggleAll;
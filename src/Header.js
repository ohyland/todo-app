import React from "react";

import PropTypes from "prop-types";

const Header = ({handleSubmit, newTodo, handleChange }) => {
    return (
        <header className="header">
            <h1>Olivias Todos</h1>
            <form onSubmit={handleSubmit}>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
            />
            </form>
        </header>
    );
};

Header.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    newTodo: PropTypes.string.isRequired,
    handleChange:  PropTypes.func.isRequired,
}

export default Header;

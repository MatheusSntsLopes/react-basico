import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import './form.css';

export default function Form({ handleSubmit, handleChange, newTask }) {
  return (
    <form onSubmit={handleSubmit} action="#" className="form">
      <input type="text" onChange={handleChange} value={newTask} placeholder="Digite o nome da tarefa" />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired,
};

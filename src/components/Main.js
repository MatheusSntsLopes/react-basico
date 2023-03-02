import React, { Component } from 'react';
import './Main.css';
import Form from './Form';
import Tarefas from './Tarefas';

export default class Main extends Component {
  state = {
    newTask: '',
    tarefas: [],
    index: -1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (tarefas.indexOf(newTask) !== -1) return;

    const novasTarefas = [...tarefas];
    if (index === -1) {
      this.setState({ tarefas: [...novasTarefas, newTask], newTask: '' });
    } else {
      novasTarefas[index] = newTask;

      this.setState({ tarefas: [...novasTarefas], index: -1, newTask: '' });
    }
  };

  handleChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({ tarefas: [...novasTarefas] });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    this.setState({ index, newTask: tarefas[index] });
  };

  render() {
    const { newTask, tarefas } = this.state;
    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange} newTask={newTask} />
        <Tarefas tarefas={tarefas} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

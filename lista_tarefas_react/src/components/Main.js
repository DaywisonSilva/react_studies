import React, { Component } from 'react';
import './Main.css';

// Form
// eslint-disable-next-line import/no-duplicates
import { FaPlus } from 'react-icons/fa';

// Tarefas
// eslint-disable-next-line import/no-duplicates
import { FaEdit, FaWindowClose } from 'react-icons/fa';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    // eslint-disable-next-line react/no-unused-state
    index: -1,
    tarefas: [],
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({
      tarefas,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;
    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    console.log('As tarefas mudaram');
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let { novaTarefa } = this.state;

    if (!novaTarefa.length) return;
    const { tarefas, index } = this.state;

    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        novaTarefa: '',
        index: -1,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  }

  handleEdit = (e, index) => {
    const { tarefas } = this.state;

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      index,
      novaTarefa: tarefas[index],
    });
  }

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];

    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas],
    });
  }

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>
        <form action="#" className="form" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            value={novaTarefa}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <span>
                <FaEdit className="edit" onClick={(e) => this.handleEdit(e, index)} />
                <FaWindowClose className="delete" onClick={(e) => this.handleDelete(e, index)} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

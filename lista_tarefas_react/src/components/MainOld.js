import React, { Component } from 'react';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      novaTarefa: '',
    };

    this.inputMudou = this.inputMudou.bind(this);
  }

  inputMudou(e) {
    this.setState({
      novaTarefa: e.target.value,
    });
  }

  render() {
    const { novaTarefa } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>
        <form action="#">
          <input onChange={this.inputMudou} type="text" />
          <button type="submit">Enviar</button>
          <p>{novaTarefa}</p>
        </form>
      </div>
    );
  }
}

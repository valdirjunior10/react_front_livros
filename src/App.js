import React, { Component } from 'react';


import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputLabel from './componentes/InputLabel';
import ButtonSubmit from './componentes/ButtonSubmit';


class App extends Component {
  constructor() {
    super();
    this.state = { lista: [], nome: '', email: '', senha: '' };
    this.salvarDados = this.salvarDados.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }



  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentDidMount() {
    $.ajax({
      url: "http://localhost:8000/api/autor",
      dataType: 'json',
      success: function (resposta) {
        this.setState({ lista: resposta });
      }.bind(this)
    });
  }

  salvarDados(evento) {     
    evento.preventDefault();

    var formData = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha
    };

    $.ajax({
      url: "http://localhost:8000/api/autor/cadastrar",
      dataType: 'JSON',
      type: "POST",
      data: formData,      
      success: function (resposta) {
        this.setState({lista:resposta});
      }.bind(this),
      error: function (resposta) {
        console.log(resposta);
      }
    })
  }

  setNome(evento) {
    this.setState({ nome: evento.target.value });
  }

  setEmail(evento) {
    this.setState({ email: evento.target.value });
  }

  setSenha(evento) {
    this.setState({ senha: evento.target.value });
  }

  render() {
    return (
      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">

          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.salvarDados} method="post">
                <InputLabel id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>                                 
                <InputLabel id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>
                <InputLabel id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>
                <ButtonSubmit label="Gravar"></ButtonSubmit> 
              </form>

            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map(function (autor) {
                      return (
                        <tr key={autor.id}>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
//import Axios from 'axios';
import './Dashboard.css';

class Enunciado extends Component {


  constructor (props){
    super(props);
  
    this.state = {
    enunciadoValue:"",
    entradaValue:"",
    salidaValue:""
  };
  this.handleEnunciadoValue = this.handleEnunciadoValue.bind(this);
  this.handleEntradaValue = this.handleEntradaValue.bind(this);
  this.handleSalidaValue = this.handleSalidaValue.bind(this);
 }


  login() {
    this.props.auth.login();
  }


  handleEnunciadoValue(event){
    this.setState({enunciadoValue: event.target.value});
  }
  handleEntradaValue(event){
    this.setState({entradaValue: event.target.value});
  }
  handleSalidaValue(event){
    this.setState({salidaValue: event.target.value});
  }
  handleOnClickEnunciado(event){
    this.setState({salidaValue: event.target.value});
  }
  handleOnSendTest(event){
    this.setState({salidaValue: event.target.value});
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Panel className="container">
        {
          isAuthenticated() && (

            
            
              <div className="well">
                <h4>
                  Ingrese enunciado:
                </h4>
                <div>
                <textarea className="form-control" rows="15" id="enunciado" value={this.state.enunciadoValue} onChange={this.handleEnunciadoValue}></textarea>
                
                <button className="btn btn-success btn-margin" onClick={this.handleOnClickEnunciado} id="send-Enunciado"> Enviar enunciado </button>

                </div>
                <label>Entrada esperada</label>
                  <textarea className="form-control" rows="3" id="input" value={this.state.entradaValue} onChange={this.handleEntradaValue}></textarea>
                <label>Salida esperada</label>
                  <textarea className="form-control" rows="3" id="output" value={this.state.salidaValue} onChange={this.handleSalidaValue} ></textarea>
                
                  <button className="btn btn-success btn-margin" onClick={this.handleOnSendTest} id="send-Test"> Enviar test </button>

              </div>
            
            )
        }
        {
          !isAuthenticated() && (
            <h4 className={"text-center lead"} >
              Usted no ha ingresado al sistema. Favor {' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >
                conectarse
              </a>
              {' '}para continuar.
            </h4>
          )
        }
      </Panel>
    );
  }
}

export default Enunciado;

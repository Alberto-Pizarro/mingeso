import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
//import Axios from 'axios';

class Cursos extends Component {


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
                  Revisar Curso:
                </h4>
                <div>
                <textarea className="form-control" rows="15" id="enunciado" value={this.state.enunciadoValue} onChange={this.handleEnunciadoValue}></textarea>
                
               
              </div>
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

export default Cursos;

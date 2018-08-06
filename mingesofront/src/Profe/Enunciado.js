import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Axios from 'axios';
import './Dashboard.css';

class Enunciado extends Component {


  constructor (props){
    super(props);
  
    this.state = {
    enunciadoValue:"",
    tituloValue:"",
    salidaValue:"",
    infoValue:"",
    showInfo:"none"
  };
  this.handleEnunciadoValue = this.handleEnunciadoValue.bind(this);
  this.handleTituloValue = this.handleTituloValue.bind(this);
  this.handleSalidaValue = this.handleSalidaValue.bind(this);
 }


  login() {
    this.props.auth.login();
  }


  handleEnunciadoValue(event){
    this.setState({enunciadoValue: event.target.value});
  }
  handleTituloValue(event){
    this.setState({tituloValue: event.target.value});
  }
  handleSalidaValue(event){
    this.setState({salidaValue: event.target.value});
  }
  handleOnClickEnunciado = event =>{
    console.log("hola!");
    //this.setState({salidaValue: event.target.value});
    //añadir axios
    var self=this;

    if((this.state.enunciadoValue || this.state.tituloValue) || this.state.salidaValue ){
      this.setState({infoValue:"uno o más campos vacíos"});
    }
    else{
      this.setState({infoValue:""});
    }

    Axios.post('http://localhost:8090/exercise/new',{
      text: this.state.enunciadoValue,
      title: this.state.tituloValue,
      answer: this.state.salidaValue
      },
      {
      headers:{ 
        'Content-Type': 'application/json'
      },
      json: true
    }).then(function (response) {
        console.log("response:");
        console.log(response);
        self.setState({showInfo:"block"});
        self.setState({infoValue:"Nuevo enunciado añadido exitosamente"});
      }).catch(function (error) {
        console.log("error:");
        console.log(error);
      });

  }


  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Panel className="container">
        {
          isAuthenticated() && (

              
            
              <div className="well">
                 <div id="infoPop" style={{display:this.state.showInfo}} className="alert alert-primary" role="alert">
                  <p>{this.state.infoValue} </p>
                </div>

                <h4>Titulo del enunciado</h4>
                  <textarea className="form-control" rows="2" id="input" value={this.state.tituloValue} onChange={this.handleTituloValue} placeholder="Ej: Suma de enteros" ></textarea>
               
                <h4>
                  Ingrese enunciado:
                </h4>
                <div>
                <textarea className="form-control" rows="15" id="enunciado" value={this.state.enunciadoValue} onChange={this.handleEnunciadoValue} placeholder="Ej: Cree una función capaz de sumar dos enteros y mostrarlos por pantalla"></textarea>
                

                </div>
                 <h4>Salida esperada</h4>
                  <textarea className="form-control" rows="3" id="output" value={this.state.salidaValue} onChange={this.handleSalidaValue} placeholder="Ej: La suma es: 40 " ></textarea>
                  <button className="btn btn-success btn-margin" onClick={this.handleOnClickEnunciado} id="send-Enunciado"> Enviar enunciado </button>

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

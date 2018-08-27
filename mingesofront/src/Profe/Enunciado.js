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
    entradaValue1:"",
    entradaValue2:"",
    entradaValue3:"",
    salidaValue1:"",
    salidaValue2:"",
    salidaValue3:"",
    infoValue:"",
    showInfo:"none"
  };
  this.handleEnunciadoValue = this.handleEnunciadoValue.bind(this);
  this.handleTituloValue = this.handleTituloValue.bind(this);
  
  this.handleEntradaValue1 = this.handleEntradaValue1.bind(this);
  this.handleEntradaValue2 = this.handleEntradaValue2.bind(this);
  this.handleEntradaValue3 = this.handleEntradaValue3.bind(this);
  
  this.handleSalidaValue1 = this.handleSalidaValue1.bind(this);
  this.handleSalidaValue2 = this.handleSalidaValue2.bind(this);
  this.handleSalidaValue3 = this.handleSalidaValue3.bind(this);
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

  handleSalidaValue1(event){
    this.setState({salidaValue1: event.target.value});
  }
  handleSalidaValue2(event){
    this.setState({salidaValue2: event.target.value});
  }
  handleSalidaValue3(event){
    this.setState({salidaValue3: event.target.value});
  }

  handleEntradaValue1(event){
    this.setState({entradaValue1: event.target.value});
  }
  handleEntradaValue2(event){
    this.setState({entradaValue2: event.target.value});
  }
  handleEntradaValue3(event){
    this.setState({entradaValue3: event.target.value});
  }

  handleOnClickEnunciado = event =>{
    console.log("hola!");
    //this.setState({salidaValue1: event.target.value});
    //añadir axios
    var self=this;

    if(this.state.enunciadoValue==="" && this.state.tituloValue===""){
      if( this.state.entradaValue1==="" && this.state.entradaValue2==="" && this.state.entradaValue3===""){
        if( this.state.salidaValue1==="" && this.state.salidaValue2==="" && this.state.salidaValue3===""){
          this.setState({infoValue:"uno o más campos 'Salida' vacíos"}); 
          self.setState({showInfo:"block"});       
          return
        }
        else{
          this.setState({infoValue:"uno o más campos 'Entrada' vacíos"});
          self.setState({showInfo:"block"});
          return
        }
      }
      else{
        this.setState({infoValue:"Enunciado o título vacío"});
        self.setState({showInfo:"block"});
        return
      }
    }
    else{
      this.setState({infoValue:""});
    }
    console.log("¿?")
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = yyyy  + '-' + mm + '-' + dd;
    //document.write(today);
    //return
    console.log(today.toString);
    Axios.post('http://localhost:8090/exercise/new',{
      text: this.state.enunciadoValue,
      title: this.state.tituloValue,
      answer1: this.state.salidaValue1,
      answer2: this.state.salidaValue2,
      answer3: this.state.salidaValue3,
      param1: this.state.entradaValue1,
      param2: this.state.entradaValue2,
      param3: this.state.entradaValue3,
      published:"True",
      //exercise_initial_date: today  // no funciona y ni idea como
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
        self.setState({showInfo:"block"});
        self.setState({infoValue:"Error de conexión"});
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
                 <div id="infoPop" style={{display:this.state.showInfo}} className="alert alert-info" role="alert">
                  <p>{this.state.infoValue} </p>
                </div>

                <h4>Titulo del enunciado:</h4>
                  <textarea className="form-control" rows="2" id="input" value={this.state.tituloValue} onChange={this.handleTituloValue} placeholder="Ej: Suma de enteros" ></textarea>
               
                <h4>Ingrese enunciado:</h4>
                <div>
                <textarea className="form-control" rows="15" id="enunciado" value={this.state.enunciadoValue} onChange={this.handleEnunciadoValue} placeholder="Ej: Cree una función capaz de sumar dos enteros y mostrarlos por pantalla"></textarea>
                
                <h4>Entradas esperadas:</h4>
                  <textarea className="form-control" rows="1" id="input1" value={this.state.entradaValue1} onChange={this.handleEntradaValue1} placeholder="Ej: La suma es: 41 " ></textarea>
                  <textarea className="form-control" rows="1" id="input2" value={this.state.entradaValue2} onChange={this.handleEntradaValue2} placeholder="Ej: La suma es: 42 " ></textarea>
                  <textarea className="form-control" rows="1" id="input3" value={this.state.entradaValue3} onChange={this.handleEntradaValue3} placeholder="Ej: La suma es: 43 " ></textarea>

                </div>
                 <h4>Salidas esperadas:</h4>
                  <textarea className="form-control" rows="1" id="output1" value={this.state.salidaValue1} onChange={this.handleSalidaValue1} placeholder="Ej: La suma es: 44 " ></textarea>
                  <textarea className="form-control" rows="1" id="output2" value={this.state.salidaValue2} onChange={this.handleSalidaValue2} placeholder="Ej: La suma es: 45 " ></textarea>
                  <textarea className="form-control" rows="1" id="output3" value={this.state.salidaValue3} onChange={this.handleSalidaValue3} placeholder="Ej: La suma es: 46 " ></textarea>

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

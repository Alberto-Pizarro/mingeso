import React, { Component } from 'react';
import Axios from 'axios';
import './Dashboard.css';
import textlogo from '../Img/text-icon.png';
import gradelogo from '../Img/good-result.png';
import editlogo from '../Img/magnifying-glass.png';
import { Panel } from 'react-bootstrap';


class Dashboard extends Component {

  constructor (props){
    super(props);
  
    this.state = {
      codigoValue: "",
      inputValue:"",
      outputValue:"",
      errorValue:"",
  };

  this.handleCodigoValue = this.handleCodigoValue.bind(this);
  this.handleInputValue = this.handleInputValue.bind(this);
  this.handleOutputValue = this.handleOutputValue.bind(this);
  this.handleErrorValue = this.handleErrorValue.bind(this);
  this.handleOnClick = this.handleOnClick.bind(this);
}

handleCodigoValue(event){
  this.setState({codigoValue: event.target.value});
}
handleInputValue(event){
    this.setState({inputValue: event.target.value});
}
handleOutputValue(event){
    this.setState({outputValue: event.target.value});
}
handleErrorValue(event){
  this.setState({errorValue: event.target.value});
}

  login() {
    this.props.auth.login();
  }


  handleOnClick = event =>{
    //console.log(event)
    
    Axios.post('https://run.glot.io/languages/python/latest ',{
      tdin: this.state.inputValue,
      files:  [
      {
        name: "main.py",
        content: this.state.codeValue
      }
            ]
      },
      {
      headers:{ 
        'Authorization': 'Token 173b8b87-2bf3-4364-8936-c46ef85d7841',        
        'Postman-Token': '349ec7cd-af33-4c96-9175-1426ccf786ce',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      },
      json: true
    }).then(function (response) {
        console.log(response);

      }).catch(function (error) {
        console.log(error);
      }).then(
        //this.setState({inputValue: ''}),
        //this.setState({outputValue: ''}),
        this.setState({errorValue: ''})
      ).then(
        this.props.onClose
      );
}


goTo(route) {
  this.props.history.replace(`/${route}`)
}


  render() {
    const { isAuthenticated } = this.props.auth;
    var nombreValue = localStorage.getItem("name")
    return (
      <Panel className="container bot-panel">
        {
          isAuthenticated() && (

            
            
              <div >
                <h4 className="well">
                  Bienvenido {nombreValue} a MINGESO-APP
                </h4>
                <div className="col-md-4 mt-4 well" >
    		    <div className="card profile-card-5">
    		        <div className="card-img-block">
    		            <img className="card-img-top" height="150px" src={textlogo} alt="textlogo" onClick={this.goTo.bind(this, 'Index/Problema')}></img>
    		        </div>
                    <div className="card-body pt-0">
                    <h5 className="card-title"> Ver un enunciado </h5>
                    <p className="card-text">Buscar un nuevo problema a resolver, con enunciado, entradas esperadas y resultados esperados.</p>
                  </div>
                </div>
    		</div>

        <div className="col-md-4 mt-4 well" >
    		    <div className="card profile-card-5">
    		        <div className="card-img-block">
    		            <img className="card-img-top" height="150px" src={editlogo} alt="editlogo" onClick={this.goTo.bind(this, 'Index/Consulta')}></img>
    		        </div>
                    <div className="card-body pt-0">
                    <h5 className="card-title"> Enviar consulta </h5>
                    <p className="card-text"> ¿Dudas o preguntas respecto a un enunciado? Envíalas acá y el autor del enunciado te responderá a la brevedad. </p>
                  </div>
                </div>
    		</div>

                      
        <div className="col-md-4 mt-4 well" >
    		    <div className="card profile-card-5">
    		        <div className="card-img-block">
    		            <img className="card-img-top" height="150px" src={gradelogo} alt="gradelogo" onClick={this.goTo.bind(this, 'Index/Resultados')} ></img>
    		        </div>
                    <div className="card-body pt-0">
                    <h5 className="card-title"> Revisar desempeño </h5>
                    <p className="card-text">Comprobar desempeño personal, cantidad de problemas resueltos, logrados, calificaciones, recomendaciones, etc.</p>
                  </div>
                </div>
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

export default Dashboard;

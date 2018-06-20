import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Axios from 'axios';

class Resultados extends Component {



  state = {
    tiempo: "",
    wordings: "",
  };


  login() {
    this.props.auth.login();
  }

  fetchLista(){
    Axios.get('http://localhost:1919/student/all')
    .then(response => {
      console.log("respuesta al get");
      //console.log(this.list);
      //console.log(response);
      var userMailValue = localStorage.getItem("user_mail");
      for(var estudiante of response.data){
        //console.log(estudiante);
        if(estudiante.email===userMailValue){
          this.setState({tiempo: estudiante.total_spend_time});
          this.setState({wordings: estudiante.total_wordings});
        }
      }
    })
    .catch(function (error) {
      console.log("ErroR!!!!")
      console.log(error)
    })
  }
  
  componentDidMount(){
    console.log("did mount?")
    this.fetchLista()
  }


  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Panel className="container">
        {
          isAuthenticated() && (

            
            
            <div className="well">
            <h2>
              Desempeño
              </h2>
            <div>
            Tiempo en la plataforma: {this.state.tiempo} 
              </div>
              <div>
              Wordings: {this.state.wordings}
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

export default Resultados;

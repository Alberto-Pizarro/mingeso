import React, { Component } from 'react';
import { Panel,Table } from 'react-bootstrap';
import Axios from 'axios';
import Tabla from './../Tabla/Tabla';

class Cursos extends Component {


  

  state = {
    nombres: [],
    apellidos: [],
    tiempo: [] ,
    wordings: [] ,
    list:[],
  };


  login() {
    this.props.auth.login();
  }

  fetchLista(){
    Axios.get('http://localhost:8090/student/all')
    .then(response => {
      //var self=this;
      console.log("respuesta al get");
      //console.log(this.list);
      console.log(response);
      //var userMailValue = localStorage.getItem("user_mail");
      /*for(var estudiante of response.data){
        //console.log(estudiante);
          this.state.nombres.push(estudiante.name);
          this.state.apellidos.push(estudiante.lastName);
          this.state.tiempo.push(estudiante.total_spend_time);
          this.state.wordings.push(estudiante.total_wordings);        
      }*/
      this.setState({list: response.data});
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
            <Table bordered condensed hover>
              <Tabla list={this.state.list} />
              </Table>    
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

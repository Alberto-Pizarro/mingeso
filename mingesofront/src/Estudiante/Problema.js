import React, { Component } from 'react';
import { Panel,Tab, Tabs } from 'react-bootstrap';
//import Axios from 'axios';
import './Dashboard.css';


class Problema extends Component {




  handleOnClick = event =>{
    console.log(event)
    
}



goTo(route) {
  this.props.history.replace(`/${route}`)
}


  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Panel className="container">
        {
          isAuthenticated() && (
            <div>
            <button className="btn btn-danger btn-lg btn-right" onClick={this.goTo.bind(this, 'Index/Codigo')} id="codigo-button" > Hacer codigo </button>
            
            <div className="well">
            <Tabs defaultActiveKey={1} id="tab">
            <Tab eventKey={1} title="Python">
            <div className="list-group list-group-flush">
              <a href="#" data-toggle="tooltip" title="Problema fácil" className="list-group-item">Suma de enteros</a>
              <a href="#" data-toggle="tooltip" title="Problema normal!" className="list-group-item">Conversión de string</a>
              <a href="#" data-toggle="tooltip" title="Problema difícil!" className="list-group-item">Buscaminas</a>
            </div> 
            </Tab>
            <Tab eventKey={2} title="Java">
              Tab 2 content
            </Tab>
            <Tab eventKey={3} title="C">
              Tab 3 content
            </Tab>
          </Tabs>
          
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

export default Problema;

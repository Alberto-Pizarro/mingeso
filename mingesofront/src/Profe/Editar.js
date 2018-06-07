import React, { Component } from 'react';
import { Panel, Tab, Tabs } from 'react-bootstrap';

import './Dashboard.css';
//import Axios from 'axios';


class Editar extends Component {


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
            <Tabs defaultActiveKey={1} id="tab">
              <Tab eventKey={1} title="Python">
                  Tab 1 content
                  hola
                  soy
                  contenido
                  en 
                  python
              </Tab>
              <Tab eventKey={2} title="Java">
                Tab 2 content
              </Tab>
              <Tab eventKey={3} title="C">
                Tab 3 content
              </Tab>
            </Tabs>                         
          </div>
            
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </Panel>
    );
  }
}

export default Editar;

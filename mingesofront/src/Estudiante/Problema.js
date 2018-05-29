import React, { Component } from 'react';
import { Panel,Tab, Tabs } from 'react-bootstrap';
//import Axios from 'axios';
import './Dashboard.css';


class Problema extends Component {




  handleOnClick = event =>{
    console.log(event)
    
}



  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Panel className="container">
        {
          isAuthenticated() && (

            
            <div className="well">
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
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

export default Problema;

import React, { Component } from 'react';
import { Panel,Tab, Tabs } from 'react-bootstrap';
import Axios from 'axios';
import Listador from './../Listador/Listador'
import './Dashboard.css';


class Problema extends Component {



  state = {
    loading: true,
    list: [],
  };


fetchLista(){
  Axios.get('http://localhost:8090/exercise/all')
  .then(response => {
    console.log("respuesta al get")
    this.setState({list:response.data});
    //console.log(this.list);

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
              
            <button className="btn btn-danger btn-lg btn-top-margin btn-right-margin btn-right" onClick={this.goTo.bind(this, 'Index/Codigo')} id="codigo-button" > Hacer codigo </button>
            
            <div className="well">
            <Tabs defaultActiveKey={1} id="tab">
            <Tab eventKey={1} title="Python">
            <div className="list-group list-group-flush">
              <Listador list={this.state.list} />

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

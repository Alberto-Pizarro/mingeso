import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Axios from 'axios';
import './Dashboard.css';

class Codigo extends Component {

  constructor (props){
    super(props);
  
    this.state = {
      codigoValue: "",
      inputValue:"",
      outputValue:"",
      errorValue:""
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
    var self=this;
    console.log("codigo mandado:");
    console.log(this.state.codigoValue);
    this.setState({outputValue: ''});
    this.setState({errorValue: ''});

    Axios.post('http://localhost:1919/code',{
      code: this.state.codigoValue,
      },
      {
      headers:{ 
        'Content-Type': 'application/json'
      },
      json: true
    }).then(function (response) {
        console.log("response:");
        console.log(response.data.output);
        var str = '';
          for(var respuesta of response.data.output){
            str = str + '\n' + respuesta;
          }
        
          str = str.substring(1);
         // console.log(str);
        self.setState({outputValue: str});

        self.setState({errorValue: response.data.error[0]});
      }).catch(function (error) {
        console.log("error:");
        console.log(error);
      });
}



  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Panel className="container ">
        {
          isAuthenticated() && (

            

              <div className="well">
                <label>CODE</label>
                <div className="code-group">
                <div className="form-group">
                    <label >Seleccione lenguaje:</label>
                    <select className="form-control" id="sel1">
                      <option>Python</option>
                      <option>C</option>
                      <option>Java</option>                      
                    </select>
                  </div> 
                  <textarea className="form-control" rows="15" id="code" onChange={this.handleCodigoValue}></textarea>                
                </div>
                         
                
                <label>OUTPUT</label>
                  <textarea className="form-control" rows="5" id="output" value={this.state.outputValue} onChange={this.handleOutputValue} ></textarea>
                <label>ERROR</label>
                  <textarea className="form-control" rows="1" id="error" value={this.state.errorValue} onChange={this.handleErrorValue} ></textarea> 
                <button className="btn btn-success btn-lg" onClick={this.handleOnClick} id="send-button"> SEND </button>

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

export default Codigo;

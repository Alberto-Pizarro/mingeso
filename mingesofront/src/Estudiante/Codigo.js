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
      errorValue:"",
      showInfo:"none",
      infoValue:[] ,
      showCalification:"none",
      calificationValue:"",
      lenguajeValue:"Python"
  };

  this.handleCodigoValue = this.handleCodigoValue.bind(this);
  this.handleInputValue = this.handleInputValue.bind(this);
  this.handleOutputValue = this.handleOutputValue.bind(this);
  this.handleErrorValue = this.handleErrorValue.bind(this);
  this.handleOnClick = this.handleOnClick.bind(this);
  this.handleLenguajeValue = this.handleLenguajeValue.bind(this);
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
handleLenguajeValue(event){
  this.setState({lenguajeValue:event.target.value});
}

  login() {
    this.props.auth.login();
  }


  handleOnClick = event =>{
    var self=this;
    //console.log("codigo mandado:");
    //console.log(this.state.codigoValue);
    this.setState({outputValue: ''});
    this.setState({errorValue: ''});
    console.log(this.state.lenguajeValue);
    Axios.post('http://localhost:1515/code',{
      lang: this.state.lenguajeValue,
      code: this.state.codigoValue,
      },
      {
      headers:{ 
        'Content-Type': 'application/json'
      },
      json: true
    }).then(function (response) {
        console.log("response:");
        console.log(response);
        var str = '';
          for(var respuesta of response.data.output){
            str = str + '\n' + respuesta;
          }
        
          str = str.substring(1);
         // console.log(str);
        self.setState({outputValue: str});
        self.setState({errorValue: response.data.error[0]});
        console.log(localStorage.getItem("expected_answer")); 
        if(str===localStorage.getItem("expected_answer")){
          self.setState({calificationValue:"¡Respuesta correcta!"});
          self.setState({showCalification:"block"});
          //console.log("bien")
        }
        else{
          if(!(localStorage.getItem("expected_answer")==="")){
            self.setState({calificationValue:"¡Respuesta incorrecta!"});
            self.setState({showCalification:"block"});
            //console.log("malo")
          }

        }
      }).catch(function (error) {
        console.log("error:");
        console.log(error);
      });
      Axios.post('http://localhost:1515/checkCode',{
      lang: this.state.lenguajeValue,
      code: this.state.codigoValue,
      },
      {
      headers:{ 
        'Content-Type': 'application/json'
      },
      json: true
    }).then(function (response) {
      console.log("response al check:");
      console.log(response);
      self.setState({showInfo:"block"});
      //self.setState({infoValue:'' + response.data.body + '---' + response.data.coments + '---' + response.data.identation });      
      self.state.infoValue.push(">"+response.data.body);
      self.state.infoValue.push(">"+response.data.coments);
      self.state.infoValue.push(">"+response.data.identation);
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
                <div id="infoPop" style={{display:this.state.showInfo}} className="alert alert-info" role="alert">
                  <p>{this.state.infoValue[0]} </p>
                  <p>{this.state.infoValue[1]} </p>
                  <p>{this.state.infoValue[2]} </p>
                </div>
                <div id="warningPop" style={{display:this.state.showCalification}} className="alert alert-warning" role="alert">
                  <p>{this.state.calificationValue} </p>
                </div>
                <label>CODE</label>
                <div className="code-group">
                <div className="form-group">
                    <label >Seleccione lenguaje:</label>
                    <select onChange={this.handleLenguajeValue} className="form-control" id="sel1">
                      <option value="Python">Python</option>
                      <option value="C">C</option>
                      <option value="Java">Java</option>                      
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

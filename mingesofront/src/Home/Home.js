import React, { Component } from 'react';
import './Home.css';
import Axios from 'axios';

class Home extends Component {

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
    console.log(event)
    
    Axios.post('https://run.glot.io/languages/python/latest',{
      headers:{
        'Authorization':"Token 173b8b87-2bf3-4364-8936-c46ef85d7841",
        'Content-Type':"application/json"
      },
      stdin: this.state.inputValue,
      files: [
        {
          'name': "main.py",
          'content': this.state.codeValue
        }
      ]
    }).then(function (response) {
        console.log(response);

      }).catch(function (error) {
        console.log(error);
      }).then(
        this.setState({inputValue: ''}),
        this.setState({outputValue: ''}),
        this.setState({errorValue: ''})
      ).then(
        this.props.onClose
      );
}



  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            
              <div>
                <h4>
                  Bienvenido a MINGESO-APP
                </h4>

                <label>CODE</label>
                <div className="code-group">
                  <label className="radio-inline disabled"><input type="radio" disabled="" name="optradio"></input>Python</label>
                  <label className="radio-inline disabled"><input type="radio" disabled="" name="optradio"></input>Java</label>
                  <label className="radio-inline disabled"><input type="radio" disabled="" name="optradio"></input>C</label>
                  <textarea className="form-control" rows="15" id="code"></textarea>                
                </div>

                <label>INPUT</label>
                  <textarea className="form-control" rows="1" id="input" value={this.state.inputValue} onChange={this.handleInputValue}></textarea>
                <label>OUTPUT</label>
                  <textarea className="form-control" rows="1" id="output" value={this.state.outputValue} onChange={this.handleOutputValue} ></textarea>
                <label>ERROR</label>
                  <textarea className="form-control" rows="1" id="error" value={this.state.errorValue} onChange={this.handleErrorValue} ></textarea> 
                <button className="btn btn-success btn-lg" onClick={this.handleOnClick} id="send-button"> SEND </button>
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
      </div>
    );
  }
}

export default Home;

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



  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container ">
        {
          isAuthenticated() && (

            
            
              <div className="text-center well">
                <h4>
                  Bienvenido a MINGESO-APP
                </h4>
                Ud no debería andar intruseando :o
                <div>
                Mejor haga clic en los botones de arriba
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
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
//import Axios from 'axios';

class Resultados extends Component {


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
      <div className="container">
        {
          isAuthenticated() && (

            
            
              <div className="well">
                <h4>
                  Enviar pregunta sobre enunciado:
                </h4>
                <div>
                <textarea className="form-control" rows="15" id="enunciado" value={this.state.enunciadoValue} onChange={this.handleEnunciadoValue} placeholder={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus eu dui mattis bibendum. Donec tristique enim sit amet justo fringilla fermentum. Donec eu mauris velit. Proin lorem tortor, auctor eget felis sit amet, fringilla placerat est. Vestibulum blandit lobortis nisi et egestas. Vestibulum pretium, quam ac ullamcorper pretium, massa mauris sodales ligula, ac iaculis tortor nisl vel diam. Morbi efficitur eget dui sit amet ultricies. Curabitur convallis sapien eu ligula placerat dictum. Mauris gravida nisi ac lacinia blandit. Maecenas elit orci, elementum eu dictum et, pulvinar et nunc. Duis tristique leo at metus iaculis, quis posuere orci luctus. Curabitur pulvinar sapien ac nisl viverra sollicitudin. Proin commodo velit tellus, ut pellentesque nisl tempus non. Integer at tristique mauris. Vivamus scelerisque finibus turpis, et malesuada arcu interdum eu. \n \nNunc faucibus lacus augue, vel tincidunt enim feugiat at. Suspendisse lacus lacus, pulvinar mollis lacus non, tincidunt tristique ligula. Donec eu commodo odio. Nam libero felis, ultricies eu velit vel, porta dignissim mauris. Nulla vehicula, augue id feugiat pellentesque, erat enim dapibus nisl, et tincidunt dui velit in purus. Integer sagittis varius tristique. Proin dolor odio, porttitor vitae est eu, tempus interdum tortor. Etiam tellus metus, tempor a laoreet a, egestas id neque.  "}></textarea>
                
               
              </div>
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

export default Resultados;

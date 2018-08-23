import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
//import Axios from 'axios';

class Resultados extends Component {


  constructor (props){
    super(props);
  
    this.state = {
    consultaValue:"",
  };
  this.handleConsultaValue = this.handleConsultaValue.bind(this);
 }


  login() {
    this.props.auth.login();
  }


  handleConsultaValue(event){
    this.setState({consultaValue: event.target.value});
  }

  handleOnClick(event){
    this.setState({salidaValue: event.target.value});
  }

  handleOnClickYoutube(event){
    window.open("https://www.youtube.com/watch?v=QI8GilW7ilk&list=PLh5Gi_SEPPXOdAl06xC2_e3MjqIMcrgXV", 
    "_blank", "toolbar=no,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");  
  }


  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Panel className="container">
        {
          isAuthenticated() && (

            
            
              <div className="well">
                <h4>
                  Enviar pregunta sobre enunciado:
                </h4>
                <div>
                <textarea className="form-control" rows="15" id="enunciado" value={this.state.consultaValue} onChange={this.handleConsultaValue} placeholder={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus eu dui mattis bibendum. Donec tristique enim sit amet justo fringilla fermentum. Donec eu mauris velit. Proin lorem tortor, auctor eget felis sit amet, fringilla placerat est. Vestibulum blandit lobortis nisi et egestas. Vestibulum pretium, quam ac ullamcorper pretium, massa mauris sodales ligula, ac iaculis tortor nisl vel diam. Morbi efficitur eget dui sit amet ultricies. Curabitur convallis sapien eu ligula placerat dictum. Mauris gravida nisi ac lacinia blandit. Maecenas elit orci, elementum eu dictum et, pulvinar et nunc. Duis tristique leo at metus iaculis, quis posuere orci luctus. Curabitur pulvinar sapien ac nisl viverra sollicitudin. Proin commodo velit tellus, ut pellentesque nisl tempus non. Integer at tristique mauris. Vivamus scelerisque finibus turpis, et malesuada arcu interdum eu. \n \nNunc faucibus lacus augue, vel tincidunt enim feugiat at. Suspendisse lacus lacus, pulvinar mollis lacus non, tincidunt tristique ligula. Donec eu commodo odio. Nam libero felis, ultricies eu velit vel, porta dignissim mauris. Nulla vehicula, augue id feugiat pellentesque, erat enim dapibus nisl, et tincidunt dui velit in purus. Integer sagittis varius tristique. Proin dolor odio, porttitor vitae est eu, tempus interdum tortor. Etiam tellus metus, tempor a laoreet a, egestas id neque.  "}></textarea>
                
               
              </div>
              <button style={{margin:"5px 0 0 0"}} className="btn btn-success btn-lg" onClick={this.handleOnClick} id="send-button"> SEND </button>
              <button style={{margin:"5px 0 0 0"}} className="btn btn-danger btn-lg btn-right" onClick={this.handleOnClickYoutube} id="youtube-button" > Ir a youtube </button>

              </div>

            )
        }
        {
          !isAuthenticated() && (
            <h4 className={"text-center"} >
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

export default Resultados;

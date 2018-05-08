import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  login() {
    this.props.auth.login();
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
              <div class="code-group">
                <label class="radio-inline"><input type="radio" name="optradio"></input>Python</label>
                <textarea class="form-control" rows="15" id="code"></textarea>                
              </div>
              <label>INPUT</label>
                <textarea class="form-control" rows="1" id="input"></textarea>
              <label>OUTPUT</label>
                <textarea class="form-control" rows="1" id="output"></textarea>
              <label>ERROR</label>
                <textarea class="form-control" rows="1" id="error "></textarea> 
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

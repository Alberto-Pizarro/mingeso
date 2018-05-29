import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    //console.log(localStorage.getItem("user_mail"));
    const { isAuthenticated } = this.props.auth;
    var userMailValue = localStorage.getItem("user_mail");
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a className="title" href="#">MINGESO-APP</a>
            </Navbar.Brand>

            {
              !isAuthenticated() && (
                <div className="btn-group">

                <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.goTo.bind(this, 'home')}
              >
                Home
              </Button>
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                  </div>
                )
            }
            {
              isAuthenticated() && (
                <div className="btn-group">
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.goTo.bind(this, 'Index')}
                >
                  Inicio
                </Button>
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                  <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.goTo.bind(this, 'Dashboard')}
                >
                  Prof
                </Button>


                </div>
                )
            }
          </Navbar.Header>
          <Navbar.Link className="text-force-right"> {userMailValue} </Navbar.Link>      

        </Navbar>
      </div>
      
    );
  }
}

export default App;

import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid email profile'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        console.log(authResult.idTokenPayload);
        console.log(authResult.idTokenPayload.email);
        history.replace('/index');
      } else if (err) {
        history.replace('/index');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    console.log(authResult.expiresIn)
    let expiresAt = JSON.stringify((authResult.expiresIn * 500) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('name',authResult.idTokenPayload.name);
    localStorage.setItem('first_name',authResult.idTokenPayload.given_name)
    localStorage.setItem('user_mail',authResult.idTokenPayload.email);
    // navigate to the index route
    history.replace('/index');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('name');
    localStorage.removeItem('user_mail');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}




/*

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult.idTokenPayload.email)
        Axios.get('localhost:8090/student/validate?email='+authResult.idTokenPayload.email)
        .then(response => {
          console.log(response)
          if(response===0){
            this.setSession(authResult);
            console.log(authResult.idTokenPayload);
            console.log(authResult.idTokenPayload.email);
            history.replace('/index');
          }
        })
        .catch(function (error) {
          console.log("ErroR!!! Usuario no registrado")
          console.log(error)
          history.replace('/index');
          alert(`Error: ${err.error}. Check the console for further details.`);
        })
      } else if (err) {
        history.replace('/index');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  */
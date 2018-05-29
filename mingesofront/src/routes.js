import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import Dashboard from './Profe/Dashboard'
import Enunciado from './Profe/Enunciado'
import Editar from './Profe/Editar'
import Cursos from './Profe/Cursos'
import Index from './Estudiante/Dashboard'
import Problema from './Estudiante/Problema'
import Consulta from './Estudiante/Consulta'
import Resultados from './Estudiante/Resultados'
import Codigo from './Estudiante/Codigo'


const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/Dashboard" render={(props) => <Dashboard auth={auth} {...props} />} />
          <Route path="/Dashboard/Enunciado" render={(props) => <Enunciado auth={auth} {...props} />} />
          <Route path="/Dashboard/Edicion" render={(props) => <Editar auth={auth} {...props} />} />
          <Route path="/Dashboard/Cursos" render={(props) => <Cursos auth={auth} {...props} />} />

          <Route path="/Index" render={(props) => <Index auth={auth} {...props} />} />
          <Route path="/Index/Problema" render={(props) => <Problema auth={auth} {...props} />} />
          <Route path="/Index/Consulta" render={(props) => <Consulta auth={auth} {...props} />} />
          <Route path="/Index/Resultados" render={(props) => <Resultados auth={auth} {...props} />} />
          <Route path="/Index/Codigo" render={(props) => <Codigo auth={auth} {...props} />} />

          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}

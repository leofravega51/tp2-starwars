import React, { Component } from 'react';
import Home from './components/Home';
import AgregarPersonaje from './components/AgregarPersonaje';
import ListarPersonajes from './components/ListarPersonajes';
import BorrarPersonaje from './components/BorrarPersonaje';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/starwars" />)} />
            <Route exact path="/starwars" component={Home} />
            <Route exact path="/starwars/agregarPersonaje" component={AgregarPersonaje} />
            <Route exact path="/starwars/borrarPersonaje" component={BorrarPersonaje} />
            <Route exact path="/starwars/listarPersonajes" component={ListarPersonajes} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

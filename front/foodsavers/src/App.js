import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import RegisterFood from './components/RegisterFood'
export default class App extends Component {
  componentDidMount =()=>{
    
  }
  
  RegisterClick=()=>{
    <Switch>
          <Route exact path="/register" component={Register}/>
    </Switch>

  }
  render() {
    return (
      <div className="Appa">
      <div className="formWrapper">
        <header className="all">
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/main" exact component={Main} />
        <Route path="/registerfood" exact component={RegisterFood} />
        <Route path="/" render ={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
    </header>
    </div>
    </div>
    )
  }
}




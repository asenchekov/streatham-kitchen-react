import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import '../styles/materialize.css'
import '../styles/App.css'

import Navigation from './Navigation'
import Header from '../components/header'
import AboutUs from './About'
import Menu from '../components/menu'
import Order from './Order';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/about">
          <AboutUs />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route path="/book">
          <Header />
        </Route>
        <Route path="/">
          <Header />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

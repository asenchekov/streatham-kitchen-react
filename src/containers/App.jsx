import React, {
  useState,
  useEffect,
} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import '../styles/App.css'

import Navigation from './Navigation'
import Header from '../components/header'
import AboutUs from './About'
import Menu from '../components/menu'
import Order from './Order'
import Bookings from './Bookings'
import BookTablePopup from './bookTablePopup'


firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  appId: process.env.REACT_APP_ID,
})

const provider = new firebase.auth.GoogleAuthProvider();
// const database = firebase.database();

export default () => {
  const [user, setUser] = useState(null);
  const [bookPopup, setBookPopup] = useState({
    visible: false,
  })

  useEffect(() => firebase.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        const {
          uid,
          email,
          displayName,
          photoURL,
        } = user

        setUser({
          uid,
          email,
          displayName,
          photoURL,
        });
      }
    }), [])

  const onClick = () => {
    if(!!!user) {
      firebase.auth()
        .signInWithPopup(provider)
        .then(({ user }) => {
          const {
            uid,
            email,
            displayName,
            photoURL
          } = user

          setUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        })
        .catch((error) => {
        console.log(error)
      })
    } else {
      setBookPopup({
        ...bookPopup,
        visible: true,
      })
    }
  }

  const onSubmit = (booking) => {
    // event.preventDefault();
    console.log(booking)
    setBookPopup({
      ...bookPopup,
      visible: false,
    })
  }

  return (
    <Router>
      <Navigation loggedIn={!!user} />
      <Switch>
        <Route path="/about">
          <AboutUs styles='about' />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route path="/bookings">
          <Bookings />
        </Route>
        <Route path="/">
        {bookPopup.visible
          ? <BookTablePopup
            styles='book' {...bookPopup} onSubmit={onSubmit} />
          : <Header
              styles='main'
              loggedIn={!!user}
              firstName={user ? user.displayName.split(' ')[0] : ''}
              onClickHandler={onClick} />}
        </Route>
      </Switch>
    </Router>
  )
}

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
const database = firebase.database();

export default () => {
  const [user, setUser] = useState(null);
  const [bookPopup, setBookPopup] = useState(false)
  const [bookings, setBookingList] = useState(null)

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

  useEffect(() => {
    if (user) {
      database.ref(`users/${user.uid}`)
        .on('value', (snapshot) => {
          setBookingList(snapshot.val())
        })
    }
  }, [user])

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
      setBookPopup(true)
    }
  }

  const onSubmit = ({date, time, chairs}) => {
    const {
      uid,
      email,
      displayName,
    } = user

    database.ref(`bookings/${date}/${time}/${uid}`)
      .set({
        displayName,
        email,
        chairs,
        confirmed: false,
      })
      .then(() => console.log("Added reservation success"))
      .catch(console.log)

    database.ref(`users/${uid}/${date}T${time}`)
      .set(chairs)
      .then(() => console.log("Added reservation success"))
      .catch(console.log)
    setBookPopup(false)
  }

  const onRemoveHandler = (key) => {
    database.ref(`bookings/${key.split('T').join('/')}/${user.uid}`).remove()
      .then(() => console.log('Successfully removed', key))
      .catch(console.log)

    database.ref(`users/${user.uid}/${key}`).remove()
      .then(() => console.log('Successfully removed', key))
      .catch(console.log)
  }

  const logOut = () => {
    firebase.auth().signOut()
    setBookPopup(false)
    setUser(null)
  }

  const book = bookPopup
    ? <BookTablePopup
        styles='book'
        onSubmit={onSubmit}
        onCancel={setBookPopup}
        db={database}
        user={user.uid}
      />
    : <Header
        styles='main'
        loggedIn={!!user}
        firstName={user ? user.displayName.split(' ')[0] : ''}
        onClickHandler={onClick} />

  return (
    <Router>
      <Navigation loggedIn={!!user} logout={logOut} />
      <Switch>
        <Route path="/about">
          <AboutUs styles='about' />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
        <Route path="/bookings">
          <Bookings
            bookings={bookings}
            onRemoveHandler={onRemoveHandler} />
        </Route>
        <Route path="/">
        {book}
        </Route>
      </Switch>
    </Router>
  )
}

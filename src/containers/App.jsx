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
import '../styles/media.css'
import '../styles/keyframes.css'
import '../styles/animations.css'

import Navigation from './Navigation'
import Header from '../components/header'
import AboutUs from './About'
import Bookings from './Bookings'
import BookTablePopup from './bookTablePopup'
import AdminPage from './adminPage'


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
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(false)
  const [adminData, setAdminData] = useState({ date: null, data: null })
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

        if (email === 'asen.chekov@gmail.com') {
          setAdmin(true)
        }
      }
    }), [])

  useEffect(() => {
    if (user) {
      database.ref(`users/${user.uid}`)
        .on('value', (snapshot) => {
          setBookingList(snapshot.val())
        })
    }
  }, [user, admin])

  const adminQuery = async (date) => {
    database.ref(`bookings/${date}`)
      .on('value', (data) => setAdminData({
        data: data.val(),
        date,
      }))
  }

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

  const onRemoveHandler = (key, uid = user.uid) => {
    database.ref(`bookings/${key.split('T').join('/')}/${uid}`).remove()
      .then(() => console.log('Successfully removed', key))
      .catch(console.log)

    database.ref(`users/${uid}/${key}`).remove()
      .then(() => console.log('Successfully removed', key))
      .catch(console.log)
  }

  const logOut = () => {
    firebase.auth().signOut()
    setBookPopup(false)
    setUser(null)
    setAdmin(false)
  }

  const book = bookPopup
    ? <BookTablePopup
        styles="book"
        onSubmit={onSubmit}
        onCancel={setBookPopup}
        db={database}
        user={user.uid}
      />
    : <Header
        styles="main"
        loggedIn={!!user}
        firstName={user ? user.displayName.split(' ')[0] : ''}
        onClickHandler={onClick} />

  const adminPage = admin
    ? <Route path="/admin">
        <AdminPage
          styles="about"
          fetchData={adminQuery}
          adminData={adminData}
          onRemoveHandler={onRemoveHandler}
        />
      </Route>
    : null

  return (
    <Router>
      <Navigation
        loggedIn={!!user}
        logout={logOut}
        onBook={onClick}
        setBookPopup={setBookPopup}
        admin={admin}
      />
      <Switch>
        {adminPage}
        <Route path="/about">
          <AboutUs styles="about" />
        </Route>
        <Route path="/bookings">
          <Bookings
            styles="about"
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

import React, {
  useState,
  useEffect,
} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import BackgroundSlider from 'react-background-slider'
import M from 'materialize-css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import '../styles/app.css'
import '../styles/media.css'
import '../styles/keyframes.css'
import '../styles/animations.css'

import image1 from '../images/background1.jpg'
import image2 from '../images/background2.jpg'
import image3 from '../images/background3.jpg'
import image4 from '../images/background4.jpg'
import image5 from '../images/background5.jpg'
import image6 from '../images/background6.jpg'
import image7 from '../images/background7.jpg'
import image8 from '../images/background8.jpg'

import Navigation from './navigation'
import Header from '../components/header'
import AboutUs from '../components/about'
import Bookings from '../components/bookings'
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

  const backgrounds = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ]

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

        if (email === 'asen.chekov@gmail.com'
          || email === 'Streathamkitchen@gmail.com') {
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
      .then(() => database.ref(`users/${uid}/${date}T${time}`).set(chairs))
      .then(() => M.toast({
        html: '<span>Added reservation success!</span>',
        classes: 'rounded success-toast',
      }))
      .catch((err) => {
        M.toast({
          html: '<span>Something went wrong!</span>',
          classes: 'rounded alert-toast',
        })
        console.log(err)
      })

    setBookPopup(false)
  }

  const onRemoveHandler = (key, uid = user.uid) => {
    database.ref(`bookings/${key.split('T').join('/')}/${uid}`).remove()
      .then(() => database.ref(`users/${uid}/${key}`).remove())
      .then(() => M.toast({
        html: '<span>Removed reservation success!</span>',
        classes: 'rounded success-toast',
      }))
      .catch((err) => {
        M.toast({
          html: '<span>Something went wrong!</span>',
          classes: 'rounded alert-toast',
        })
        console.log(err)
      })
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
      <BackgroundSlider
        images={backgrounds}
        duration={6} transition={1}
      />
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
          <AboutUs />
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

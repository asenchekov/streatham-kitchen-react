import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import M from 'materialize-css'


export default ({ loggedIn, logout, onBook, setBookPopup, admin }) => {
  const [logo, setLogo] = useState()
  const [sidenav, setSideNav] = useState()

  useEffect(() => {
    M.Sidenav.init(sidenav, {
      preventScrolling: true,
    })

    if (logo) {
      logo.className += ' animation_logo'
    }
  })

  const closeSideNav = () => M.Sidenav.getInstance(sidenav).close(); 

  const bookings = loggedIn
    ? <li>
        <Link
          to="/bookings"
          onClick={() => closeSideNav()}>
            my bookings
        </Link>
      </li>
    : null

  const logoutLink = loggedIn
    ? <li>
        <Link
          to="/"
          onClick={() => {closeSideNav(); logout()}}>
            logout
        </Link>
      </li>
    : null

  const adminLink = admin
    ? <li>
        <Link
          to="/admin"
          onClick={() => closeSideNav()}>
          admin
        </Link>
      </li>
    : null

  return (
      <div className="navbar-fixed">
        
        <nav>
          <div className="nav-wrapper">

            <a
              href="#!"
              data-target="mobile-nav"
              className="sidenav-trigger">
                <i className="material-icons">menu</i>
            </a>

            <ul className="left hide-on-med-and-down">
              <li>
                <Link
                  onClick={() => {closeSideNav(); setBookPopup(false)}}
                  to="/">
                    home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => closeSideNav()}>
                    about us
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {closeSideNav(); onBook()}}
                  to="/">
                    book now
                </Link>
              </li>
            </ul>
            
            <ul className="right">
              <li>
                <img
                  ref={(logo) => setLogo(logo)}
                  className="logo"
                  src="logo192.png"
                  alt="LOGO"
                />
              </li>
            </ul>
            <ul className="right hide-on-med-and-down">
              {adminLink}
              {bookings}
              {logoutLink}
            </ul>
          </div>
        </nav>

      <ul
        className="sidenav"
        id="mobile-nav"
        ref={(sidenav) => setSideNav(sidenav)}
      >
        <li>
          <Link
            onClick={() => {closeSideNav(); setBookPopup(false)}}
            to="/">
              home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            onClick={() => closeSideNav()}>
              about us
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {closeSideNav(); onBook()}}
            to="/">
              book now
          </Link>
        </li>
        {adminLink}
        {bookings}
        {logoutLink}
      </ul>
    </div>
  )
}

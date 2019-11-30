import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

export default ({ loggedIn, logout, onBook, setBookPopup }) => {
  const [logo, setLogo] = useState()

  useEffect(() => {
    if (logo) {
      logo.className += ' animation_logo'
    }
  })

  const bookings = loggedIn
    ? <li><Link to="/bookings">MY BOOKINGS</Link></li>
    : null

  const logoutLink = loggedIn
    ? <li><Link to="/" onClick={logout}>LOG OUT</Link></li>
    : null

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper z-depth-5">
          <ul id="nav-mobile" className="left">
            <li><Link onClick={() => { setBookPopup(false) }} to="/">HOME</Link></li>
            <li><Link to="/about">ABOUT US</Link></li>
            <li><Link onClick={onBook} to="/">BOOK NOW!</Link></li>
          </ul>
          <ul id="nav-mobile" className="right">
            {bookings}
            {logoutLink}
            <li>
              <Link to="/">
                <img
                  ref={(logo) => setLogo(logo)}
                  className="z-depth-4"
                  src="logo192.png"
                  width="150px"
                  height="150px"
                  alt="LOGO"
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
